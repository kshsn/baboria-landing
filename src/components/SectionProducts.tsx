import { ChevronRight } from "lucide-react";

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
  return (
    <section id="products" className="relative bg-navy-deep px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-lg">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-signal-orange">
            / Our Products
          </span>
          <h2 className="font-display mt-3 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
            Built to run,
            <br />
            not just to demo.
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Three products, one team: automation, software, and the carrier
            billing rails that connect them to revenue.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-deep/85 shadow-2xl"
            >
              <div className="relative h-56 w-full overflow-hidden sm:h-60">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
                <span className="absolute top-4 left-4 font-sans text-xs font-semibold tracking-[0.15em] text-signal-orange">
                  {product.index}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-signal-orange/80">
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
                  className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-medium text-white transition-colors duration-300 hover:text-signal-orange"
                >
                  Learn more
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
