import Link from "next/link";
import { SectionLink } from "@/components/SectionLink";
import { legalLinks, primaryLinks } from "@/data/navigation";
import { site } from "@/data/site";

const linkClass =
  "inline-flex min-h-11 items-center text-sm text-foreground/80 transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <div className="flex flex-col gap-8 sm:grid sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-start sm:gap-x-12">
          <div>
            <p className="font-serif text-[2rem] leading-none tracking-[0.14em] text-foreground">
              {site.brand}
            </p>
            <p className="mt-3 text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
              Explore
            </p>
            <ul className="mt-1 flex flex-wrap gap-x-5 sm:flex-col sm:gap-x-0">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <SectionLink href={link.href} className={linkClass}>
                    {link.label}
                  </SectionLink>
                </li>
              ))}
              <li>
                <a
                  href={site.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Telegram
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
              House
            </p>
            <ul className="mt-1 flex flex-wrap gap-x-5 sm:flex-col sm:gap-x-0">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-8 border-t border-foreground/10 pt-5 text-xs text-muted sm:mt-12">
          © {site.copyrightYear} {site.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
