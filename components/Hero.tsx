"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import alexPortrait from "@/public/images/creators/alex.webp";
import miaPortrait from "@/public/images/creators/mia.webp";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-10 sm:px-8 lg:justify-center lg:px-10 lg:pt-28 lg:pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 42% at 82% 16%, rgba(212,196,168,0.09), transparent 62%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col gap-6 lg:grid lg:flex-none lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10 xl:max-w-7xl">
        <div className="relative order-1 min-h-64 flex-1 lg:order-2 lg:h-[32rem] lg:min-h-0 lg:flex-none xl:h-[36rem]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="group absolute top-3 right-0 bottom-0 w-[72%] overflow-hidden rounded-2xl border border-foreground/10 bg-surface lg:top-0"
          >
            <Image
              src={miaPortrait}
              alt="Portrait of Mia"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 28rem, 70vw"
              className="object-cover object-[center_20%] transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
            />
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="group absolute bottom-0 left-0 h-[62%] w-[48%] overflow-hidden rounded-2xl border border-foreground/10 bg-surface shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
          >
            <Image
              src={alexPortrait}
              alt="Portrait of Alex"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 18rem, 48vw"
              className="object-cover object-[center_18%] transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
            />
          </motion.div>
        </div>

        <div className="order-2 max-w-xl lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase"
          >
            AI Creator Platform
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease }}
            className="mt-5 font-serif text-[clamp(2.6rem,10.5vw,5.4rem)] leading-[0.9] tracking-[-0.035em] text-foreground uppercase"
          >
            <span className="block">Meet the</span>
            <span className="block">next generation</span>
            <span className="block">of creators.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-muted sm:text-base"
          >
            {site.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="#creators" className="w-full sm:w-auto">
              Explore Creators
            </ButtonLink>
            <ButtonLink
              href={site.telegramUrl}
              external
              variant="outline"
              className="w-full sm:w-auto"
            >
              Join on Telegram
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
