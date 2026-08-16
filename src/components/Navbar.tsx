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
        <div className="flex items-center gap-2.5">
          <Logo height={20} surface="dark" />
          <span className="font-display text-sm font-light uppercase tracking-[0.3em] text-white sm:text-base">
            Baboria
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              <span className="text-sm font-bold text-white transition-colors duration-300 hover:text-signal-orange">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded-full bg-signal-orange px-4 py-2 text-xs font-medium text-white transition-opacity duration-300 hover:opacity-90 sm:px-5 sm:text-sm"
        >
          Get Free Consultation
        </a>
      </div>
    </nav>
  );
}
