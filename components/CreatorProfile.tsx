"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { CreatorChat } from "@/components/CreatorChat";
import type { Creator, CreatorPost } from "@/data/creators";
import { site } from "@/data/site";
import { lockBodyScroll } from "@/lib/scroll-lock";

type CreatorProfileProps = {
  creator: Creator | null;
  onClose: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function formatPostDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  const monthIndex = Number(month) - 1;
  const monthLabel = MONTHS[monthIndex] ?? month;
  return `${Number(day)} ${monthLabel} ${year}`;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function CreatorProfile({ creator, onClose }: CreatorProfileProps) {
  return (
    <AnimatePresence>
      {creator ? (
        <motion.div
          key={creator.id}
          className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease }}
        >
          <ProfileDialog creator={creator} onClose={onClose} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ProfileDialog({
  creator,
  onClose,
}: {
  creator: Creator;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const askRef = useRef<HTMLButtonElement>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [chatOpen, setChatOpen] = useState(false);
  const chatOpenRef = useRef(false);
  const chatWasOpen = useRef(false);
  chatOpenRef.current = chatOpen;

  useEffect(() => {
    if (chatWasOpen.current && !chatOpen) askRef.current?.focus();
    chatWasOpen.current = chatOpen;
  }, [chatOpen]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const releaseScroll = lockBodyScroll();
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (chatOpenRef.current) {
          setChatOpen(false);
          return;
        }
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ].filter((element) => element.tabIndex !== -1);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      releaseScroll();
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  const toggleLike = (postId: string) => {
    setLikedPosts((current) => ({
      ...current,
      [postId]: !current[postId],
    }));
  };

  return (
    <>
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close profile"
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 36, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.38, ease }}
        className="relative flex max-h-[calc(100dvh-env(safe-area-inset-top)-3.25rem)] w-full max-w-full flex-col overflow-hidden rounded-t-3xl border border-foreground/10 bg-background shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:max-h-[min(92dvh,840px)] md:max-w-5xl md:flex-row md:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute top-3 right-3 z-20 inline-flex size-11 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-sm transition-colors duration-300 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        <div
          className={`relative h-[32dvh] min-h-40 shrink-0 overflow-hidden bg-surface md:h-auto md:w-[44%] md:min-h-0 ${
            chatOpen ? "hidden md:block" : ""
          }`}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, ease }}
          >
            <Image
              src={creator.image}
              alt={`Portrait of ${creator.name}`}
              fill
              loading="eager"
              sizes="(min-width: 768px) 24rem, 100vw"
              className="object-cover object-[center_18%] transition-transform duration-700 motion-safe:hover:scale-[1.03]"
            />
          </motion.div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {chatOpen ? (
            <CreatorChat creator={creator} onBack={() => setChatOpen(false)} />
          ) : (
          <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-5 md:px-8 md:pt-8">
            <p className="pr-12 text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
              {creator.category}
            </p>
            <h2
              id={titleId}
              className="mt-3 font-serif text-[clamp(2.25rem,8vw,3.5rem)] leading-none tracking-[-0.03em] text-foreground uppercase"
            >
              {creator.name}
            </h2>
            <p className="mt-2 text-sm text-muted">{creator.username}</p>
            <p className="mt-5 max-w-xl font-serif text-xl leading-snug text-foreground md:text-2xl">
              {creator.bio}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              {creator.personality}
            </p>

            <h3 className="mt-8 text-[11px] font-medium tracking-[0.18em] text-foreground/70 uppercase">
              Latest Posts
            </h3>
            <ul className="mt-4 flex flex-col gap-4 pb-6">
              {creator.posts.map((post, index) => (
                <PostRow
                  key={post.id}
                  post={post}
                  index={index}
                  liked={likedPosts[post.id] ?? false}
                  onToggle={() => toggleLike(post.id)}
                />
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 flex-col gap-3 border-t border-foreground/10 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row md:px-8">
            <button
              ref={askRef}
              type="button"
              onClick={() => setChatOpen(true)}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-6 text-[11px] font-medium tracking-[0.16em] text-background uppercase transition duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
            >
              Ask {creator.name}
            </button>
            <ButtonLink
              href={site.telegramUrl}
              external
              variant="outline"
              className="w-full sm:w-auto"
            >
              Telegram
            </ButtonLink>
          </div>
          </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

function PostRow({
  post,
  index,
  liked,
  onToggle,
}: {
  post: CreatorPost;
  index: number;
  liked: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const likes = post.likes + (liked ? 1 : 0);

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease }}
      className="flex min-w-0 items-start gap-3 border-b border-foreground/10 pb-4 last:border-b-0"
    >
      <Link
        href={`/journal/${post.id}`}
        className="group/post flex min-w-0 flex-1 gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-foreground/10 bg-surface">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="80px"
            className="object-cover transition-transform duration-700 motion-safe:group-hover/post:scale-[1.04]"
          />
        </div>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm leading-snug text-foreground transition-colors duration-300 group-hover/post:text-accent">
            {post.caption}
          </span>
          <time dateTime={post.date} className="mt-1 text-xs text-muted">
            {formatPostDate(post.date)}
          </time>
        </span>
      </Link>
      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? "Unlike this post" : "Like this post"}
        onClick={onToggle}
        className={`mt-1 inline-flex min-h-11 w-fit shrink-0 items-center gap-1.5 text-xs transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-safe:active:scale-95 ${
          liked ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
      >
          <Heart
            aria-hidden="true"
            className={`size-4 ${liked ? "fill-current" : ""}`}
          />
          <span>{likes}</span>
        </button>
    </motion.li>
  );
}
