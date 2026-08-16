import { useState } from "react";
import { ChevronRight, Mail, MapPin } from "lucide-react";

export default function SectionContact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    const subject = `New inquiry from ${name}`;
    const body = `${message}\n\nFrom: ${name} (${email})`;
    window.location.href = `mailto:info@baboria.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-navy-deep px-5 py-24 sm:px-8 md:px-12"
    >
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-signal-orange">
            / Get In Touch
          </span>
          <h2 className="font-display mt-3 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
            Let's build what's next.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70 sm:text-base">
            Tell us what you're trying to build — software, automation, or
            carrier billing — and we'll get back to you within one business day.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="mailto:info@baboria.com"
              className="flex items-center gap-2 text-sm text-white/80 transition-colors duration-300 hover:text-signal-orange"
            >
              <Mail size={16} />
              info@baboria.com
            </a>
            <span className="flex items-center gap-2 text-sm text-white/60">
              <MapPin size={16} />
              Dubai, UAE
            </span>
          </div>
        </div>

        <form
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
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-signal-orange focus:outline-none"
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
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-signal-orange focus:outline-none"
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
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-signal-orange focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-signal-orange px-5 py-2.5 text-xs font-medium text-white transition-opacity duration-300 hover:opacity-90 sm:text-sm"
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
