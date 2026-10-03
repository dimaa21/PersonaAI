"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode, Ref } from "react";
import { clearHash, rememberSection, scrollToId, sectionId, sectionPath } from "@/lib/section-scroll";

type SectionLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  "aria-current"?: "page" | undefined;
  ref?: Ref<HTMLAnchorElement>;
};

export function SectionLink({
  href,
  className,
  children,
  onClick,
  ref,
  ...aria
}: SectionLinkProps) {
  const pathname = usePathname();
  const id = sectionId(href);
  const path = sectionPath(href);

  return (
    <Link
      ref={ref}
      href={path}
      scroll={id ? false : undefined}
      aria-current={aria["aria-current"]}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (!id || event.defaultPrevented) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
          return;
        }

        if (pathname === path && scrollToId(id)) {
          event.preventDefault();
          clearHash();
          return;
        }

        rememberSection(id);
      }}
    >
      {children}
    </Link>
  );
}
