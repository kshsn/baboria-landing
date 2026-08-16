import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import GlassBadge from "./GlassBadge";

const SERVICES = [
  "SOFTWARE DEVELOPMENT",
  "AI WORKFORCE AUTOMATION",
  "TELECOM SERVICES (DCB)",
];

const CHANNELS = [
  { index: "01", label: "AI Automation", className: "bg-signal-orange text-white" },
  { index: "02", label: "Software", className: "bg-navy-light text-navy-deep" },
  { index: "03", label: "Telecom", className: "bg-baboria-navy text-white" },
];

export default function SectionOne() {
  return (
    <section className="flex min-h-screen min-h-[100svh] flex-col justify-between px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16">
      {/* top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service}
              delay={150 + i * 120}
              className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white/90 drop-shadow-md"
            >
              <span className="text-signal-orange">/</span> {service}
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={300}
          className="max-w-xs text-lg leading-relaxed text-white drop-shadow-md sm:text-right sm:text-xl"
        >
          We build AI-driven software and connectivity infrastructure, from
          first idea to full launch.
        </Reveal>
      </div>

      {/* bottom row */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal delay={150} className="mb-5">
              <GlassBadge>Trusted by 100+ Growing Brands</GlassBadge>
            </Reveal>

            <Reveal
              delay={280}
              as="h1"
              className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl"
            >
              One signal.
              <br />
              Three channels.
            </Reveal>
          </div>

          <Reveal delay={420}>
            <div className="flex flex-col gap-1.5 rounded-xl bg-white/15 p-4 backdrop-blur-md">
              <span className="text-sm font-medium text-white">Talk to us</span>
              <a
                href="#contact"
                className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-signal-orange px-4 py-2 text-xs font-medium text-white transition-opacity duration-300 hover:opacity-90"
              >
                Book 15-mins call
                <ChevronRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={520}
          className="grid grid-cols-3 overflow-hidden rounded-xl border border-white/15"
        >
          {CHANNELS.map((channel) => (
            <div key={channel.index} className={`px-4 py-3 sm:px-6 sm:py-4 ${channel.className}`}>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">
                CH.{channel.index}
              </span>
              <p className="mt-0.5 text-sm font-semibold sm:text-base">
                {channel.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
