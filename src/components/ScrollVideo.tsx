import { useEffect, useRef, useState } from "react";
import { HERO_POSTER_LOCAL, HERO_VIDEO_URL } from "../lib/constants";

const MAX_FRAMES = 20;
const MIN_FRAMES = 12;
const FRAMES_PER_SECOND = 2;
const FRAME_MAX_WIDTH = 960;
const LERP_FACTOR = 0.18;
const FADE_MS = 600;
const READY_SAFETY_TIMEOUT_MS = 15000;

/**
 * Full-viewport, scroll-scrubbed video background.
 *
 * Layers (bottom -> top): poster <img>, <video>, <canvas>.
 * Scroll position drives a smoothed progress value (0-1) that is mapped to
 * either two cached decoded frames -- alpha-blended between them so a
 * modest frame count still reads as continuous motion -- or a direct video
 * seek (fallback), drawn with object-cover math. Motion is scroll-driven
 * only -- the video never autoplays / loops on its own.
 *
 * Frame extraction seeks the SAME visible <video> element (no second,
 * offscreen <video> loading the identical URL) -- two <video> elements
 * range-seeking one cached URL concurrently triggers a deterministic
 * Chromium bug (net::ERR_CACHE_OPERATION_NOT_SUPPORTED) that fails every
 * load. Reusing one element sidesteps that entirely. The poster stays up
 * (not the raw video) until extraction concludes one way or the other, so
 * nobody ever sees the visible video jumping between seek positions while
 * extraction is in progress -- it crossfades straight to the smooth
 * blended-canvas path, or to the raw-video fallback only if extraction
 * failed (by which point the video is done being seeked around).
 *
 * Frame count is kept deliberately low: each frame costs one real network
 * seek against the remote video, and over a real (non-localhost) connection
 * that adds up fast. A small `loading` indicator surfaces while extraction
 * is in flight so the wait doesn't read as broken.
 */
export default function ScrollVideo() {
  const posterRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const progressTargetRef = useRef(0);
  const progressSmoothedRef = useRef(0);
  const rafIdRef = useRef(0);

  const framesRef = useRef<ImageBitmap[]>([]);
  const framesReadyRef = useRef(false);
  const lastSeekTimeRef = useRef(-1);
  const extractionDoneRef = useRef(false);

  const [loading, setLoading] = useState(true);

  // --- scroll -> target progress -------------------------------------
  useEffect(() => {
    function updateProgress() {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = scrollHeight - viewportHeight;
      const raw = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      progressTargetRef.current = Math.min(1, Math.max(0, raw));
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // --- frame-cache extraction (preferred smooth path) -----------------
  useEffect(() => {
    let cancelled = false;
    const safetyTimer = window.setTimeout(
      () => setLoading(false),
      READY_SAFETY_TIMEOUT_MS,
    );

    async function waitFor<K extends keyof HTMLElementEventMap>(
      el: HTMLElement,
      event: K,
    ) {
      await new Promise<void>((resolve) => {
        const handler = () => {
          el.removeEventListener(event, handler);
          resolve();
        };
        el.addEventListener(event, handler);
      });
    }

    async function extractFrames() {
      const video = videoRef.current;
      if (!video) return;

      if (video.readyState < 1) {
        await Promise.race([
          waitFor(video, "loadedmetadata"),
          waitFor(video, "error").then(() => {
            throw new Error("hero video failed to load");
          }),
        ]);
      }
      if (cancelled) return;

      const duration = video.duration;
      if (!duration || Number.isNaN(duration) || !Number.isFinite(duration)) {
        return;
      }

      const frameCount = Math.min(
        MAX_FRAMES,
        Math.max(MIN_FRAMES, Math.floor(duration * FRAMES_PER_SECOND)),
      );

      const sourceWidth = video.videoWidth || FRAME_MAX_WIDTH;
      const sourceHeight =
        video.videoHeight || Math.round(FRAME_MAX_WIDTH * 0.5625);
      const scale = Math.min(1, FRAME_MAX_WIDTH / sourceWidth);
      const width = Math.round(sourceWidth * scale);
      const height = Math.round(sourceHeight * scale);

      const extractCanvas = document.createElement("canvas");
      extractCanvas.width = width;
      extractCanvas.height = height;
      const ctx = extractCanvas.getContext("2d");
      if (!ctx) return;

      const frames: ImageBitmap[] = [];
      const seekableDuration = Math.max(0, duration - 0.05);
      const originalTime = video.currentTime;

      for (let i = 0; i < frameCount; i++) {
        if (cancelled) return;
        const t =
          frameCount > 1 ? (i / (frameCount - 1)) * seekableDuration : 0;

        await new Promise<void>((resolve) => {
          const handler = () => {
            video.removeEventListener("seeked", handler);
            resolve();
          };
          video.addEventListener("seeked", handler);
          video.currentTime = t;
        });
        if (cancelled) return;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(video, 0, 0, width, height);
        const bitmap = await createImageBitmap(extractCanvas);
        frames.push(bitmap);
      }

      if (cancelled || frames.length === 0) return;

      framesRef.current = frames;
      framesReadyRef.current = true;
      video.currentTime = originalTime;

      // Frames ready: fade the canvas in, fade the raw video + poster out.
      if (posterRef.current) posterRef.current.style.opacity = "0";
      if (videoRef.current) videoRef.current.style.opacity = "0";
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }

    extractFrames()
      .catch(() => {
        // Extraction failed (e.g. network) -- fall back to the raw
        // <video> seek path.
      })
      .finally(() => {
        window.clearTimeout(safetyTimer);
        extractionDoneRef.current = true;
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimer);
    };
  }, []);

  // --- poster -> video crossfade, fallback path only ------------------
  // Only kicks in once extraction has concluded (succeeded or failed) so
  // it never fights the extraction loop over the video's currentTime.
  useEffect(() => {
    const video = videoRef.current;
    const poster = posterRef.current;
    if (!video) return;

    function reveal() {
      if (framesReadyRef.current) return;
      if (poster) poster.style.opacity = "0";
      if (video) video.style.opacity = "1";
    }

    function tryReveal() {
      if (!extractionDoneRef.current) {
        window.setTimeout(tryReveal, 100);
        return;
      }
      reveal();
    }

    tryReveal();
  }, []);

  // --- render loop: lerp progress, draw blended frames or seek fallback -
  useEffect(() => {
    function drawFrame(
      ctx: CanvasRenderingContext2D,
      source: CanvasImageSource,
      sourceWidth: number,
      sourceHeight: number,
      canvasWidth: number,
      canvasHeight: number,
      alpha: number,
    ) {
      const scale = Math.max(
        canvasWidth / sourceWidth,
        canvasHeight / sourceHeight,
      );
      const drawWidth = sourceWidth * scale;
      const drawHeight = sourceHeight * scale;
      const dx = (canvasWidth - drawWidth) / 2;
      const dy = (canvasHeight - drawHeight) / 2;
      ctx.globalAlpha = alpha;
      ctx.drawImage(source, dx, dy, drawWidth, drawHeight);
      ctx.globalAlpha = 1;
    }

    function tick() {
      // A single bad frame must never permanently kill the loop -- always
      // reschedule the next tick even if this one throws.
      try {
        progressSmoothedRef.current +=
          (progressTargetRef.current - progressSmoothedRef.current) *
          LERP_FACTOR;
        const progress = progressSmoothedRef.current;

        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (canvas) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const rect = canvas.getBoundingClientRect();
          const targetWidth = Math.max(1, Math.round(rect.width * dpr));
          const targetHeight = Math.max(1, Math.round(rect.height * dpr));
          if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
          }

          if (framesReadyRef.current && framesRef.current.length > 0) {
            const frames = framesRef.current;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              const floatIndex = progress * (frames.length - 1);
              const lowerIndex = Math.max(
                0,
                Math.min(frames.length - 1, Math.floor(floatIndex)),
              );
              const upperIndex = Math.min(frames.length - 1, lowerIndex + 1);
              const blend = floatIndex - lowerIndex;

              const lowerFrame = frames[lowerIndex];
              const upperFrame = frames[upperIndex];

              ctx.clearRect(0, 0, canvas.width, canvas.height);
              if (lowerFrame) {
                drawFrame(
                  ctx,
                  lowerFrame,
                  lowerFrame.width,
                  lowerFrame.height,
                  canvas.width,
                  canvas.height,
                  1,
                );
              }
              if (upperFrame && upperFrame !== lowerFrame && blend > 0.001) {
                drawFrame(
                  ctx,
                  upperFrame,
                  upperFrame.width,
                  upperFrame.height,
                  canvas.width,
                  canvas.height,
                  blend,
                );
              }
            }
          } else if (
            extractionDoneRef.current &&
            video &&
            video.duration &&
            Number.isFinite(video.duration)
          ) {
            // Fallback (extraction failed): scrub the visible <video>
            // directly. Gated on extractionDoneRef so this never fights
            // the extraction loop over the same element's currentTime.
            const targetTime = progress * Math.max(0, video.duration - 0.05);
            if (Math.abs(targetTime - lastSeekTimeRef.current) > 0.04) {
              video.currentTime = targetTime;
              lastSeekTimeRef.current = targetTime;
            }
          }
        }
      } catch {
        // Swallow and keep animating -- a transient draw/seek error should
        // never leave the background permanently frozen.
      } finally {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    }

    rafIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-brand-dark pointer-events-none">
      <img
        ref={posterRef}
        src={HERO_POSTER_LOCAL}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-100"
        style={{ transition: `opacity ${FADE_MS}ms ease` }}
      />
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-0"
        style={{ transition: `opacity ${FADE_MS}ms ease` }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-0"
        style={{ transition: `opacity ${FADE_MS}ms ease` }}
      />
      {/* Dark scrim: the source footage is a pale blue-grey, not dark --
          without this, white text has no reliable contrast against it. */}
      <div className="absolute inset-0 bg-brand-dark/6" />

      {/* Small, non-blocking loading indicator -- the rest of the page
          stays visible/interactive while the hero background finishes. */}
      <div
        className={`absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-brand-dark/70 px-3 py-1.5 backdrop-blur-md transition-opacity duration-500 sm:bottom-8 sm:left-8 ${
          loading ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-brand-orange" />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
          Loading visuals
        </span>
      </div>
    </div>
  );
}
