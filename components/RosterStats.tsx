import type { Creator } from "@/data/creators";

const numberFormat = new Intl.NumberFormat("en-GB");

export function RosterStats({ creators }: { creators: Creator[] }) {
  const notes = creators.reduce((count, creator) => count + creator.posts.length, 0);
  const marks = creators.reduce(
    (count, creator) => count + creator.posts.reduce((sum, post) => sum + post.likes, 0),
    0,
  );

  const figures = [
    { value: String(creators.length).padStart(2, "0"), label: "Creators on the roster" },
    { value: String(notes).padStart(2, "0"), label: "Notes in the journal" },
    { value: numberFormat.format(marks), label: "Marks left on those notes" },
    { value: "04", label: "Subjects, then the edit stops" },
  ];

  return (
    <section aria-label="Roster figures" className="px-5 sm:px-8 lg:px-10">
      <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-8 py-12 md:grid-cols-4 md:py-14 xl:max-w-7xl">
        {figures.map((figure) => (
          <div key={figure.label} className="min-w-0 border-t border-foreground/10 pt-4">
            <dt className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
              {figure.label}
            </dt>
            <dd className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.25rem)] leading-none tracking-[-0.04em] text-foreground">
              {figure.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
