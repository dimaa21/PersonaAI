import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Press, partnerships, and everything else starts with VIORA on Telegram.",
};

export default function ContactPage() {
  return (
    <PageIntro
      eyebrow="Contact"
      title="The house replies on Telegram."
      lede="Press, partnerships, and general notes can go through the form at the bottom of the page, or straight to Telegram."
    >
      <Reveal className="border-t border-foreground/10 py-8">
        <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
          Telegram
        </p>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
          {site.telegramUrl.replace("https://", "")}
        </p>
        <div className="mt-8">
          <ButtonLink href={site.telegramUrl} external>
            Join on Telegram
          </ButtonLink>
        </div>
      </Reveal>
    </PageIntro>
  );
}
