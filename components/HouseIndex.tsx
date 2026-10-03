"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import type { Creator } from "@/data/creators";
import { scrollToId } from "@/lib/section-scroll";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

function formatPostDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  const monthLabel = MONTHS[Number(month) - 1] ?? month;
  return `${Number(day)} ${monthLabel} ${year}`;
}

export function HouseIndex({ creators }: { creators: Creator[] }) {
  const [activeId, setActiveId] = useState(creators[0]?.id ?? "");
  const active = creators.find((creator) => creator.id === activeId) ?? creators[0];
  const latest = active?.posts[0];

  return (
    <section aria-labelledby="house-index-title" className="px-5 sm:px-8 lg:px-10">
      <div className="relative mx-auto w-full max-w-6xl border-y border-foreground/10 py-14 md:py-20 xl:max-w-7xl">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute top-6 right-0 font-serif text-[clamp(5rem,14vw,9rem)] leading-none text-foreground/[0.045]"
        >
          04
        </p>

        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
            <p>Issue 04</p>
            <p>October 2026</p>
            <p>Edited in Kyiv</p>
          </div>
          <h2
            id="house-index-title"
            className="mt-8 max-w-3xl font-serif text-[clamp(1.75rem,4vw,2.7rem)] leading-[1.12] tracking-[-0.03em] text-foreground"
          >
            Four desks. A post runs only if it sounds like the person who wrote it.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            This month Alex is on what a model changes after it ships, Noah is out before the city wakes, Mia cut a coat down to the seam, and Sofia stopped at ten quiet minutes.
          </p>
        </Reveal>

        <div className="mt-12 grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:gap-16">
          <ol>
            {creators.map((creator, index) => {
              const selected = creator.id === active?.id;
              return (
                <li key={creator.id} className="border-t border-foreground/10 last:border-b">
                  <button
                    type="button"
                    aria-pressed={selected}
                    onMouseEnter={() => setActiveId(creator.id)}
                    onFocus={() => setActiveId(creator.id)}
                    onClick={() => {
                      if (creator.id !== activeId) {
                        setActiveId(creator.id);
                        return;
                      }
                      scrollToId(`creator-${creator.id}`);
                    }}
                    className={`flex w-full items-baseline gap-4 py-4 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background ${
                      selected ? "text-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    <span className="w-8 shrink-0 font-serif text-lg text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[clamp(1.7rem,3vw,2.35rem)] leading-none tracking-[-0.03em]">
                      {creator.name}
                    </span>
                    <span className="ml-auto hidden text-right text-sm sm:block">{creator.category}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          {active && latest ? (
            <div className="flex min-h-48 flex-col justify-between border-foreground/10 lg:min-h-64 lg:border-l lg:pl-10">
              <p className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
                {active.name} · latest note
              </p>
              <blockquote className="mt-4 font-serif text-[clamp(1.55rem,3vw,2.15rem)] leading-[1.15] tracking-[-0.03em] text-foreground">
                “{latest.caption}”
              </blockquote>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-muted">{formatPostDate(latest.date)}</p>
                <button
                  type="button"
                  onClick={() => scrollToId(`creator-${active.id}`)}
                  className="inline-flex min-h-11 items-center text-sm text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors duration-300 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Open the blog
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
