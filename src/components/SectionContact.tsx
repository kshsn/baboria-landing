import { useEffect, useRef, useState } from "react";
import { ChevronRight, Mail, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionContact() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-brand-dark/70 px-5 py-24 sm:px-8 md:px-12"
    >
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span
            data-reveal
            className="font-mono text-xs uppercase tracking-[0.15em] text-brand-orange drop-shadow-md"
          >
            / Get In Touch
          </span>
          <h2
            data-reveal
            className="font-display mt-3 text-4xl font-semibold leading-[1.05] text-white drop-shadow-lg sm:text-5xl"
          >
            Let's build what's next.
          </h2>
          <p
            data-reveal
            className="mt-4 max-w-sm text-sm leading-relaxed text-white/70 drop-shadow-md sm:text-base"
          >
            Tell us what you're trying to build — software, automation, or
            carrier billing — and we'll get back to you within one business day.
          </p>

          <div data-reveal className="mt-8 flex flex-col gap-3">
            <a
              href="mailto:hello@baboria.com"
              className="flex items-center gap-2 text-sm text-white/80 transition-colors duration-300 hover:text-brand-orange"
            >
              <Mail size={16} />
              hello@baboria.com
            </a>
            <span className="flex items-center gap-2 text-sm text-white/60">
              <MapPin size={16} />
              Dubai, UAE
            </span>
          </div>
        </div>

        <form
          data-reveal
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-8"
        >
          {submitted ? (
            <p className="text-sm text-white/80">
              Thanks — we'll be in touch soon.
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-medium text-white/70"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-medium text-white/70"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-medium text-white/70"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your project"
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-brand-orange focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink px-5 py-2.5 text-xs font-medium text-white transition-opacity duration-300 hover:opacity-90 sm:text-sm"
              >
                Send message
                <ChevronRight size={14} />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
