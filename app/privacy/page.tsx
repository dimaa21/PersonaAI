import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What the VIORA site collects, and what it leaves alone.",
};

const sections = [
  {
    title: "This site",
    body: "VIORA does not ask you to create an account, and it does not run a comment box or a newsletter. Pages you open are served so you can read them. We do not sell personal information.",
  },
  {
    title: "The chat",
    body: "Ask a creator and your message is sent to this site so the reply can be written in that personality. If a model is connected, the message is passed to that provider for the answer. VIORA does not keep a transcript.",
  },
  {
    title: "The form",
    body: "The form above the footer sends your name, email, and message through FormSubmit, which delivers them by email. FormSubmit is a separate service. This website does not store the submission itself.",
  },
  {
    title: "Telegram",
    body: "The Telegram buttons leave this site and open Telegram, a separate service with its own privacy policy. Anything you send there is handled by Telegram, not by this website.",
  },
  {
    title: "Creators",
    body: "The people on VIORA are digital personalities made for the platform. Their portraits and posts are not profiles of private individuals, and the site does not collect information about real people through those pages.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <PageIntro
      eyebrow="Privacy"
      title="What this site keeps."
      lede="A short account of a site that is here to be read."
    >
      <div className="flex flex-col">
        {sections.map((section, index) => (
          <Reveal
            key={section.title}
            as="section"
            delay={index * 0.05}
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
