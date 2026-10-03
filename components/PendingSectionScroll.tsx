"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { clearHash, forgetSection, peekSection, scrollToId } from "@/lib/section-scroll";

export function PendingSectionScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hashed = window.location.hash.replace(/^#/, "");
    const id = peekSection() || hashed;
    if (!id) return;

    let frame = 0;
    let attempts = 0;

    const tick = () => {
      attempts += 1;
      if (scrollToId(id)) {
        forgetSection();
        clearHash();
        return;
      }
      if (attempts < 30) frame = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
