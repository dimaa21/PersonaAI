"use client";

import { useRef, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Creator } from "@/data/creators";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

export function CutStrip({ creators }: { creators: Creator[] }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const drag = useRef({ active: false, x: 0, left: 0, moved: false });

  const frames = creators
    .flatMap((creator) =>
      creator.posts.map((post) => ({
        id: post.id,
        caption: post.caption,
        image: post.image,
        name: creator.name,
        date: post.date,
      })),
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  const ticker = frames.map((frame) => `${frame.name} — ${frame.caption}`);

  function trackSpot(event: PointerEvent<HTMLElement>) {
    const node = sectionRef.current;
    if (!node || reduce) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  function tilt(event: PointerEvent<HTMLAnchorElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 9}deg) translateY(-10px)`;
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cut-title"
      onPointerMove={trackSpot}
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div aria-hidden="true" className="viora-spot pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10 xl:max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="cut-title"
            className="font-serif text-[clamp(2.1rem,6vw,3.75rem)] leading-[0.92] tracking-[-0.035em] text-foreground uppercase"
          >
            <span className="block">The cut</span>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted sm:text-right">
            Twelve frames from the house. Drag the strip, or follow one into the note.
          </p>
        </div>
      </div>

      <div className="relative mt-8 overflow-hidden border-y border-foreground/10 py-3">
        <p aria-hidden="true" className="viora-marquee flex w-max gap-10 text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
          {[...ticker, ...ticker].map((line, index) => (
            <span key={`${line}-${index}`} className="shrink-0">
              {line}
            </span>
          ))}
        </p>
      </div>

      <div
        className="viora-strip relative mt-8 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 active:cursor-grabbing sm:px-8 lg:px-10"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          drag.current = {
            active: true,
            x: event.clientX,
            left: event.currentTarget.scrollLeft,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          if (!drag.current.active) return;
          const dx = event.clientX - drag.current.x;
          if (Math.abs(dx) <= 6) return;
          drag.current.moved = true;
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.setPointerCapture(event.pointerId);
          }
          event.currentTarget.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={() => {
          drag.current.active = false;
        }}
        onClickCapture={(event) => {
          if (!drag.current.moved) return;
          event.preventDefault();
          event.stopPropagation();
          drag.current.moved = false;
        }}
      >
        {frames.map((frame, index) => (
          <Link
            key={frame.id}
            href={`/journal/${frame.id}`}
            onPointerMove={tilt}
            onPointerLeave={(event) => {
              event.currentTarget.style.transform = "";
            }}
            className={`group/frame relative w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-foreground/10 bg-surface transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-72 ${
              index % 2 === 0 ? "motion-safe:-rotate-2" : "motion-safe:rotate-2"
            }`}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={frame.image}
                alt=""
                fill
                sizes="18rem"
                className="object-cover transition-transform duration-700 motion-safe:group-hover/frame:scale-[1.06]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4">
                <span className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                  {frame.name}
                  <span className="text-foreground/70">
                    {" "}
                    · {dateFormat.format(new Date(`${frame.date}T00:00:00`))}
                  </span>
                </span>
                <span className="font-serif text-xl leading-[1.15] tracking-[-0.03em] text-foreground">
                  {frame.caption}
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
