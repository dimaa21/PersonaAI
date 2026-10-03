"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  as?: "div" | "li" | "section";
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
};

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  immediate = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as;

  if (reduce) return <Tag className={className}>{children}</Tag>;

  const MotionTag = as === "li" ? motion.li : as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "0px 0px -8% 0px" },
          })}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </MotionTag>
  );
}
