"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function TelegramCTA() {
  return (
    <section id="telegram" className="px-5 pb-20 sm:px-8 md:pb-28 lg:px-10 lg:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.65, ease }}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--lx", `${event.clientX - rect.left}px`);
          event.currentTarget.style.setProperty("--ly", `${event.clientY - rect.top}px`);
        }}
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-foreground/10 px-6 py-12 transition-colors duration-500 hover:border-foreground/25 sm:px-10 md:px-14 md:py-16 xl:max-w-7xl"
        style={{
          background:
            "radial-gradient(480px circle at var(--lx, 50%) var(--ly, 0%), rgba(212,196,168,0.28), transparent 58%), #141413",
        }}
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
              Telegram
            </p>
            <h2 className="mt-4 font-serif text-[clamp(1.85rem,7.2vw,4.25rem)] leading-[0.94] tracking-[-0.035em] text-foreground uppercase">
              <span className="block">Ready to meet</span>
              <span className="block">your next</span>
              <span className="block">digital creator?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              Explore the full experience and connect with VIORA on Telegram.
            </p>
          </div>
          <ButtonLink href={site.telegramUrl} external className="w-full sm:w-auto">
            Join VIORA on Telegram
          </ButtonLink>
        </div>
      </motion.div>
    </section>
  );
}
