import { ChevronRight } from "lucide-react";
import GlassBadge from "./GlassBadge";

const CAPABILITIES = [
  {
    index: "01",
    title: "Software Development",
    body: "Custom software built for your workflow, from first MVP to enterprise scale.",
  },
  {
    index: "02",
    title: "AI Workforce Automation",
    body: "AI agents that plug into how your team already works and take repetitive tasks off their plate.",
  },
  {
    index: "03",
    title: "Telecom Services (DCB)",
    body: "Carrier billing and connectivity infrastructure for seamless mobile transactions.",
  },
];

export default function SectionTwo() {
  return (
    <section className="flex min-h-screen min-h-[100svh] flex-col justify-between bg-navy-deep px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16">
      {/* top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div>
          <GlassBadge>Insight On Demand</GlassBadge>
        </div>

        <div className="max-w-sm text-lg leading-relaxed text-white sm:text-right sm:text-xl">
          Our AI doesn't just respond — it interprets, sharpens, and delivers
          the signal you need.
        </div>
      </div>

      {/* bottom area */}
      <div className="flex flex-1 flex-col justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-xl">
          <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Learn to see
            <br />
            brilliantly.
          </h2>

          <p className="mt-6 max-w-md text-sm text-white/80 sm:text-base leading-relaxed">
            From the first sketch to the final launch, Baboria turns raw intent
            into decisions your team can act on — quietly, precisely, at speed.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-signal-orange px-5 py-2.5 text-xs font-medium text-white transition-opacity duration-300 hover:opacity-90 sm:text-sm"
            >
              Run the demo
              <ChevronRight size={14} />
            </button>
            <a
              href="#contact"
              className="rounded-full border border-signal-orange/40 bg-white/10 px-5 py-2.5 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:border-signal-orange hover:text-signal-orange sm:text-sm"
            >
              Free consultation
            </a>
          </div>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6">
          {CAPABILITIES.map((item, i) => (
            <div
              key={item.index}
              className={`group flex gap-5 py-5 ${
                i < CAPABILITIES.length - 1 ? "border-b border-white/15" : ""
              }`}
            >
              <span className="font-sans text-[11px] font-semibold tracking-[0.15em] text-signal-orange/80">
                {item.index}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-white sm:text-lg">
                    {item.title}
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-signal-orange"
                  />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
