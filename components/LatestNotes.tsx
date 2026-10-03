import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { Creator } from "@/data/creators";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function LatestNotes({ creators }: { creators: Creator[] }) {
  const notes = creators
    .flatMap((creator) =>
      creator.posts.map((post) => ({
        ...post,
        creatorId: creator.id,
        creatorName: creator.name,
      })),
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section aria-labelledby="latest-notes-title" className="px-5 py-16 sm:px-8 md:py-24 lg:px-10">
      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="latest-notes-title"
              className="font-serif text-[clamp(2.1rem,6vw,3.75rem)] leading-[0.92] tracking-[-0.035em] text-foreground uppercase"
            >
              <span className="block">From the</span>
              <span className="block">journal</span>
            </h2>
            <Link
              href="/journal"
              className="inline-flex min-h-11 items-center text-sm text-foreground/75 underline decoration-foreground/20 underline-offset-4 transition-colors duration-300 hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              All notes
            </Link>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {notes.map((note, index) => (
            <Reveal key={note.id} as="li" delay={index * 0.06}>
              <Link href={`/journal/${note.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-foreground/10 bg-surface">
                  <Image
                    src={note.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 22rem, 100vw"
                    className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-4 text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                  {note.creatorName}
                  <span className="text-muted">
                    {" "}
                    · {dateFormat.format(new Date(`${note.date}T00:00:00`))}
                  </span>
                </p>
                <p className="mt-2 font-serif text-[1.45rem] leading-[1.15] tracking-[-0.03em] text-foreground transition-colors duration-300 group-hover:text-accent">
                  {note.caption}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
