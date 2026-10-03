import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostLike } from "@/components/PostLike";
import { Reveal } from "@/components/Reveal";
import { SectionLink } from "@/components/SectionLink";
import { creators, findPost } from "@/data/creators";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function generateStaticParams() {
  return creators.flatMap((creator) => creator.posts.map((post) => ({ id: post.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const found = findPost(id);
  if (!found) return { title: "Note" };
  return {
    title: found.post.caption,
    description: found.post.lede,
  };
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findPost(id);
  if (!found) notFound();

  const { creator, post } = found;
  const others = creator.posts.filter((item) => item.id !== post.id);

  return (
    <main className="px-5 pt-28 pb-20 sm:px-8 lg:px-10 lg:pt-36 lg:pb-28">
      <article className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <Reveal immediate>
          <p className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
            <Link
              href="/journal"
              className="transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Journal
            </Link>
            <span aria-hidden="true"> · </span>
            <SectionLink
              href={`/#creator-${creator.id}`}
              className="text-accent transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {creator.name}
            </SectionLink>
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.1rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.035em] text-foreground">
            {post.caption}
          </h1>
          <p className="mt-5 text-sm text-muted">
            <time dateTime={post.date}>{dateFormat.format(new Date(`${post.date}T00:00:00`))}</time>
            <span> · {creator.username}</span>
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal delay={0.06}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-foreground/10 bg-surface">
              <Image
                src={post.image}
                alt=""
                fill
                preload
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
              {creator.category}
            </p>
            <p className="mt-5 font-serif text-[clamp(1.45rem,2.4vw,1.9rem)] leading-[1.25] tracking-[-0.03em] text-foreground">
              {post.lede}
            </p>
            <div className="mt-8 flex max-w-xl flex-col gap-5 text-[15px] leading-relaxed text-muted sm:text-base">
              {post.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 border-t border-foreground/10 pt-4">
              <PostLike count={post.likes} />
            </div>
          </Reveal>
        </div>

        {others.length > 0 ? (
          <section aria-labelledby="more-notes" className="mt-16 border-t border-foreground/10 pt-10">
            <h2
              id="more-notes"
              className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase"
            >
              More from {creator.name}
            </h2>
            <ul className="mt-6 grid gap-8 sm:grid-cols-2">
              {others.map((item) => (
                <li key={item.id}>
                  <Link href={`/journal/${item.id}`} className="group block max-w-md">
                    <p className="text-xs text-muted">
                      {dateFormat.format(new Date(`${item.date}T00:00:00`))}
                    </p>
                    <p className="mt-2 font-serif text-[1.45rem] leading-[1.15] tracking-[-0.03em] text-foreground transition-colors duration-300 group-hover:text-accent">
                      {item.caption}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
}
