import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terms",
  description: "How to read VIORA: fictional personalities, editorial content, and an external Telegram.",
};

const sections = [
  {
    title: "The personalities",
    body: "Alex, Noah, Mia, and Sofia are fictional digital characters. Their names, portraits, biographies, and posts are created for VIORA. They do not represent real people, and a resemblance to anyone living is unintended.",
  },
  {
    title: "The content",
    body: "Posts are editorial. They are not news, financial, medical, fitness, or professional advice, and they are not an offer to buy or sell anything. You may read and share links to the site. You may not copy the portraits, copy, or branding and present them as your own.",
  },
  {
    title: "Telegram",
    body: "Links to Telegram leave VIORA. Conversation there is governed by Telegram, not by these terms. The site can change or be taken down without notice.",
  },
] as const;

export default function TermsPage() {
  return (
    <PageIntro
      eyebrow="Terms"
      title="How to read VIORA."
      lede="The house is a publication of digital personalities. These notes say what that means."
    >
      <div className="flex flex-col">
        {sections.map((section, index) => (
          <Reveal
            key={section.title}
            as="section"
            delay={index * 0.06}
            className="group border-t border-foreground/10 py-8 transition-colors duration-300 hover:border-accent/50"
          >
            <h2 className="font-serif text-3xl tracking-[-0.03em] text-foreground transition-colors duration-300 group-hover:text-accent">
              {section.title}
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
              {section.body}
            </p>
          </Reveal>
        ))}
      </div>
    </PageIntro>
  );
}