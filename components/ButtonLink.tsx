"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { clearHash, rememberSection, scrollToId, sectionId, sectionPath } from "@/lib/section-scroll";

type ButtonLinkVariant = "solid" | "outline";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonLinkVariant;
  external?: boolean;
  className?: string;
};

const variants: Record<ButtonLinkVariant, string> = {
  solid: "bg-foreground text-background hover:bg-accent",
  outline:
    "border border-foreground/20 text-foreground hover:border-foreground/45 hover:bg-foreground/[0.04]",
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: ButtonLinkProps) {
  const pathname = usePathname();
  const id = external ? "" : sectionId(href);
  const path = id ? sectionPath(href.startsWith("#") ? `/${href}` : href) : href;

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!id) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    if (pathname === path && scrollToId(id)) {
      event.preventDefault();
      clearHash();
      return;
    }
    rememberSection(id);
  };

  return (
    <a
      href={id ? path : href}
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-center text-[11px] font-medium tracking-[0.16em] uppercase transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 ${variants[variant]} ${className}`}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
