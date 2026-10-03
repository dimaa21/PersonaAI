import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
};

export function PageIntro({ eyebrow, title, lede, children }: PageIntroProps) {
  return (
    <main className="px-5 pt-28 pb-20 sm:px-8 lg:px-10 lg:pt-36 lg:pb-28">
      <article className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <Reveal immediate>
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.6rem,8vw,5rem)] leading-[0.9] tracking-[-0.035em] text-foreground uppercase">
            {title}
          </h1>
          {lede ? (
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              {lede}
            </p>
          ) : null}
        </Reveal>
        <div className="mt-14 max-w-3xl">{children}</div>
      </article>
    </main>
  );
}
