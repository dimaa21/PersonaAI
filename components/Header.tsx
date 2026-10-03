"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { SectionLink } from "@/components/SectionLink";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { primaryLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { lockBodyScroll } from "@/lib/scroll-lock";

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    return lockBodyScroll();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div
        className={`border-b border-foreground/10 px-5 sm:px-8 lg:px-10 ${
          open ? "bg-background" : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between xl:max-w-7xl">
        <Link
          href="/"
          className="font-serif text-[1.2rem] tracking-[0.18em] text-foreground"
          onClick={closeMenu}
        >
          {site.brand}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-8">
          {primaryLinks.map((link) => {
            const current = pathname === link.href;
            return (
              <SectionLink
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`relative text-[13px] transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 ${
                  current
                    ? "text-foreground after:scale-x-100"
                    : "text-foreground/75 after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </SectionLink>
            );
          })}
          <ButtonLink
            href={site.telegramUrl}
            external
            variant="outline"
            className="min-h-9 px-4"
          >
            Telegram
          </ButtonLink>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors duration-300 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id={menuId}
            aria-label="Mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease }}
            className="flex h-[calc(100dvh-3.5rem-env(safe-area-inset-top))] flex-col justify-between overflow-y-auto bg-background px-5 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 md:hidden"
          >
            <ul className="flex flex-col">
              {primaryLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 + index * 0.05, ease }}
                  className="border-b border-foreground/10"
                >
                  <SectionLink
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className="flex min-h-14 items-center font-serif text-4xl tracking-[-0.03em] text-foreground"
                  >
                    {link.label}
                  </SectionLink>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.16, ease }}
            >
              <ButtonLink href={site.telegramUrl} external className="w-full">
                Telegram
              </ButtonLink>
            </motion.div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
