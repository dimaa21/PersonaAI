"use client";

import { FormEvent, useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-foreground/15 bg-surface px-4 py-3 text-base text-foreground transition-colors duration-300 placeholder:text-muted/70 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

type Status = "idle" | "sending" | "sent" | "activate" | "error";

export function ContactBand() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("_honey") ?? "")) {
      form.reset();
      setStatus("sent");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${site.contactEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _subject: "VIORA — new message",
          _template: "table",
          _captcha: "false",
        }),
      });
      const payload = (await response.json()) as { success?: boolean | string; message?: string };
      const accepted = payload.success === true || payload.success === "true";
      if (!response.ok || !accepted) {
        if (payload.message?.toLowerCase().includes("activation")) {
          setStatus("activate");
          return;
        }
        throw new Error(payload.message || "Request failed");
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section aria-labelledby="write-title" className="px-5 pt-4 pb-16 sm:px-8 lg:px-10 lg:pb-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 border-t border-foreground/10 pt-16 lg:grid-cols-2 lg:items-start lg:gap-16 lg:pt-20 xl:max-w-7xl">
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
            The house
          </p>
          <h2
            id="write-title"
            className="mt-4 font-serif text-[clamp(2.1rem,5vw,3.5rem)] leading-[0.92] tracking-[-0.035em] text-foreground uppercase"
          >
            <span className="block">Write to</span>
            <span className="block">the house.</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
            {site.description} Press, partnerships, and ordinary notes can land here.
          </p>

          <div className="mt-8 border-t border-foreground/10 pt-8">
            <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
              Telegram
            </p>
            <p className="mt-3 text-[15px] text-muted sm:text-base">
              {site.telegramUrl.replace("https://", "")}
            </p>
            <div className="mt-6">
              <ButtonLink href={site.telegramUrl} external>
                Join on Telegram
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div>
            <label htmlFor="contact-name" className="text-[11px] font-medium tracking-[0.18em] text-foreground/80 uppercase">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="text-[11px] font-medium tracking-[0.18em] text-foreground/80 uppercase">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="text-[11px] font-medium tracking-[0.18em] text-foreground/80 uppercase">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              placeholder="What should the house know?"
              className={`${fieldClass} resize-y`}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-foreground px-6 text-[11px] font-medium tracking-[0.16em] text-background uppercase transition duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-wait disabled:opacity-60 motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0"
            >
              {status === "sending" ? "Sending" : "Send message"}
            </button>
            <p role="status" className="min-h-6 text-sm text-muted">
              {status === "sent" ? "Message sent. The house has it." : null}
              {status === "activate"
                ? "FormSubmit sent a confirmation email. Open it once, then send again."
                : null}
              {status === "error" ? "The message did not go through. Try again, or use Telegram." : null}
            </p>
          </div>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
