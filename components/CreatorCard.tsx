"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { PointerEvent } from "react";
import type { Creator } from "@/data/creators";

type CreatorCardProps = {
  creator: Creator;
  index: number;
  onViewProfile: (creatorId: string) => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

function tiltPortrait(event: PointerEvent<HTMLButtonElement>, reduce: boolean) {
  const node = event.currentTarget;
  if (reduce) return;
  const rect = node.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  node.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 10}deg) rotateX(${(0.5 - y) * 8}deg)`;
  node.style.setProperty("--sheen-x", `${x * 100}%`);
  node.style.setProperty("--sheen-y", `${y * 100}%`);
}

export function CreatorCard({ creator, index, onViewProfile }: CreatorCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      id={`creator-${creator.id}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.18), ease }}
      className="group flex min-w-0 flex-col"
    >
      <button
        type="button"
        onClick={() => onViewProfile(creator.id)}
        aria-label={`View ${creator.name}'s profile`}
        onPointerMove={(event) => tiltPortrait(event, Boolean(reduce))}
        onPointerLeave={(event) => {
          event.currentTarget.style.transform = "";
        }}
        className="relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-surface text-left transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-safe:group-hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
      >
        <Image
          src={creator.image}
          alt=""
          fill
          loading="eager"
          sizes="(min-width: 1024px) 34rem, (min-width: 768px) 46vw, 100vw"
          className="object-cover object-[center_18%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--sheen-x, 50%) var(--sheen-y, 30%), rgba(243,239,230,0.28), transparent 42%)",
          }}
        />
      </button>

      <div className="flex flex-col gap-3 pt-4">
        <p className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
          {creator.category}
        </p>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-[2rem] leading-none tracking-[-0.03em] text-foreground">
            {creator.name}
          </h3>
          <p className="shrink-0 text-sm text-muted">{creator.username}</p>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          {creator.description}
        </p>
        <button
          type="button"
          onClick={() => onViewProfile(creator.id)}
          className="mt-1 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-foreground px-6 text-[11px] font-medium tracking-[0.16em] text-background uppercase transition duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0"
        >
          View blog
        </button>
      </div>
    </motion.article>
  );
}
