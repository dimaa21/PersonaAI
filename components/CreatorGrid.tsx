"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { CreatorCard } from "@/components/CreatorCard";
import { CreatorProfile } from "@/components/CreatorProfile";
import type { Creator } from "@/data/creators";

type CreatorGridProps = {
  creators: Creator[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function CreatorGrid({ creators }: CreatorGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeCreator = creators.find((creator) => creator.id === activeId) ?? null;
  const closeProfile = useCallback(() => setActiveId(null), []);

  return (
    <section id="creators" className="px-5 py-20 sm:px-8 md:py-28 lg:px-10 lg:py-32">
      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.65, ease }}
          className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <h2 className="font-serif text-[clamp(2.1rem,6vw,3.75rem)] leading-[0.92] tracking-[-0.035em] text-foreground uppercase">
            <span className="block">Meet the</span>
            <span className="block">creators</span>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted md:pb-1 md:text-right">
            The October roster. We stop at four.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-8 md:gap-y-20 lg:gap-x-14">
          {creators.map((creator, index) => (
            <li
              key={creator.id}
              className={index % 2 === 1 ? "min-w-0 lg:mt-24" : "min-w-0"}
            >
              <CreatorCard
                creator={creator}
                index={index}
                onViewProfile={setActiveId}
              />
            </li>
          ))}
        </ul>
      </div>
      <CreatorProfile creator={activeCreator} onClose={closeProfile} />
    </section>
  );
}
