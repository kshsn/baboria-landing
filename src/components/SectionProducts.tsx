import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    index: "01",
    title: "Baboria Agents",
    tag: "AI Workforce Automation",
    body: "AI agents that plug into your existing tools and take repetitive work off your team's plate — provisioned in days, not months.",
    image: "/products/agents.jpg",
  },
  {
    index: "02",
    title: "Baboria Studio",
    tag: "Software Development",
    body: "From first sketch to production release: custom software built and shipped by one team, from MVP to enterprise scale.",
    image: "/products/studio.jpg",
  },
  {
    index: "03",
    title: "Baboria Pay",
    tag: "Telecom Services (DCB)",
    body: "Direct carrier billing and connectivity infrastructure that turns a phone number into a payment method, anywhere your carriers reach.",
    image: "/products/pay.jpg",
  },
];

export default function SectionProducts() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative h-screen min-h-[100svh] overflow-hidden bg-brand-dark/40"
    >
      <div
        ref={trackRef}
        className="flex h-full items-center gap-8 pl-[6vw] will-change-transform sm:gap-10"
      >
        {/* intro panel -- travels with the cards as the first "slide" */}
        <div className="w-[80vw] shrink-0 sm:w-[380px]">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-orange drop-shadow-md">
            / Our Products
          </span>
          <h2 className="font-display mt-3 text-4xl font-semibold leading-[1.05] text-white drop-shadow-lg sm:text-5xl">
            Built to run,
            <br />
            not just to demo.
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70 drop-shadow-md">
            Three products, one team: automation, software, and the carrier
            billing rails that connect them to revenue.
          </p>
        </div>

        {PRODUCTS.map((product) => (
          <div
            key={product.title}
            className="flex w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-dark/85 shadow-2xl backdrop-blur-sm sm:w-[400px]"
          >
            <div className="relative h-56 w-full overflow-hidden sm:h-60">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/10 to-transparent" />
              <span className="absolute top-4 left-4 font-mono text-xs tracking-[0.15em] text-brand-orange drop-shadow-md">
                {product.index}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-brand-orange/80">
                {product.tag}
              </span>
              <h3 className="font-display text-2xl font-semibold text-white">
                {product.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                {product.body}
              </p>
              <button
                type="button"
                className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-medium text-white transition-colors duration-300 hover:text-brand-orange"
              >
                Learn more
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
        <div className="w-[6vw] shrink-0" aria-hidden="true" />
      </div>
    </section>
  );
}
