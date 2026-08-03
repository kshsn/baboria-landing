import { Reveal } from "./Reveal";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/15">
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-12">
        <Reveal delay={0} className="flex items-center gap-2">
          <Logo size={26} />
          <span className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
            baboria
          </span>
        </Reveal>

        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {NAV_LINKS.map((link, i) => (
            <Reveal
              key={link.label}
              as="a"
              href={link.href}
              delay={100 + i * 100}
            >
              <span className="text-sm font-bold text-white transition-colors duration-300 hover:text-brand-orange">
                {link.label}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-brand-orange to-brand-pink px-4 py-2 text-xs font-medium text-white transition-opacity duration-300 hover:opacity-90 sm:px-5 sm:text-sm"
          >
            Get Free Consultation
          </a>
        </Reveal>
      </div>
    </nav>
  );
}
