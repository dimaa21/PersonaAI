import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionLink } from "@/components/SectionLink";
import { creators } from "@/data/creators";

export const metadata: Metadata = {
  title: "Journal",
  description: "Recent notes from the VIORA roster, in the order they were made.",
};

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const notes = creators
  .flatMap((creator) =>
    creator.posts.map((post) => ({
      ...post,
      creatorId: creator.id,
      creatorName: creator.name,
    })),
  )
  .sort((a, b) => b.date.localeCompare(a.date));

export default function JournalPage() {
  return (
    <PageIntro
      eyebrow="Journal"
      title="Notes from the roster."
      lede="Recent posts from the house, kept in the order they were made."
    >
      <ol className="border-b border-foreground/10">
        {notes.map((note) => (
          <Reveal
            key={note.id}
            as="li"
            className="group border-t border-foreground/10 py-7 transition-colors duration-300 hover:border-accent/50"
          >
            <p className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
              {dateFormat.format(new Date(`${note.date}T00:00:00`))}
              <span className="text-muted"> · {note.creatorName}</span>
            </p>
            <Link
              href={`/journal/${note.id}`}
              className="mt-3 block font-serif text-[clamp(1.6rem,3vw,2.15rem)] leading-[1.05] tracking-[-0.03em] text-foreground transition-colors duration-300 group-hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {note.caption}
            </Link>
            <SectionLink
              href={`/#creator-${note.creatorId}`}
              className="mt-4 inline-flex min-h-11 items-center text-sm text-foreground/75 underline decoration-foreground/20 underline-offset-4 transition-colors duration-300 hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View {note.creatorName}
            </SectionLink>
          </Reveal>
        ))}
      </ol>
    </PageIntro>
  );
}
