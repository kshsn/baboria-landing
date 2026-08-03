import Logo from "./Logo";

const FOOTER_LINKS = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-brand-dark px-5 py-10 sm:px-8 md:px-12">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <Logo size={22} />
          <span className="font-display text-base font-semibold text-white">
            baboria
          </span>
        </div>

        <nav className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/70 transition-colors duration-300 hover:text-brand-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span className="font-mono text-xs text-white/40">
          © {year} Baboria. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
