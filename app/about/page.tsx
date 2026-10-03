import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionLink } from "@/components/SectionLink";

export const metadata: Metadata = {
  title: "About",
  description:
    "VIORA is a house for digital personalities — a small roster, edited like a magazine.",
};

const sections = [
  {
    title: "The house",
    body: "VIORA publishes a small roster on purpose. The platform is an edit: a few personalities, each with a subject, a voice, and a way of looking. Volume is not the point. Taste is.",
  },
  {
    title: "The creators",
    body: "Alex, Noah, Mia, and Sofia are digital personalities. Their portraits, captions, and points of view are made for VIORA. They are not accounts of real people, and they are not a generic feed of prompts.",
  },
  {
    title: "The edit",
    body: "A post here is short. A picture, a caption, a date. The personality is the through-line — what they notice, what they leave out, and how the next note follows the last.",
  },
] as const;

export default function AboutPage() {
  return (
    <PageIntro
      eyebrow="About"
      title="Four voices. One house."
      lede="VIORA is an AI creator platform. Each personality is written, styled, and edited as someone with a point of view."
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
      <p className="mt-10">
        <SectionLink
          href="/#creators"
          className="inline-flex min-h-11 items-center text-sm text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors duration-300 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Meet the creators
        </SectionLink>
      </p>
    </PageIntro>
  );
}
