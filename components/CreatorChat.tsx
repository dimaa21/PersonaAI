"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import type { Creator } from "@/data/creators";
import { openingLine } from "@/lib/creator-voice";

type Turn = {
  role: "user" | "assistant";
  content: string;
};

type CreatorChatProps = {
  creator: Creator;
  onBack: () => void;
};

export function CreatorChat({ creator, onBack }: CreatorChatProps) {
  const reduce = useReducedMotion();
  const inputId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Turn[]>([
    { role: "assistant", content: openingLine(creator.id) },
  ]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, sending, error]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || sending) return;

    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setDraft("");
    setError("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creatorId: creator.id, messages: next }),
      });
      const payload = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || typeof payload.reply !== "string") {
        throw new Error(payload.error || "No reply");
      }
      setMessages((current) => [...current, { role: "assistant", content: payload.reply as string }]);
    } catch {
      setError("That didn't send. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center gap-2 border-b border-foreground/10 px-3 py-3 pr-16 md:px-6 md:pr-16">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors duration-300 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
          <span className="sr-only">Back to {creator.name}'s profile</span>
        </button>
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
            Ask {creator.name}
          </p>
          <p className="truncate text-sm text-muted">{creator.username}</p>
        </div>
      </div>

      <div
        aria-live="polite"
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-5 py-5 md:px-8"
      >
        {messages.map((message, index) => (
          <motion.p
            key={`${message.role}-${index}`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              message.role === "user"
                ? "ml-auto bg-foreground text-background"
                : "mr-auto border border-foreground/10 bg-surface text-foreground"
            }`}
          >
            {message.content}
          </motion.p>
        ))}
        {sending ? (
          <p className="mr-auto text-sm text-muted motion-safe:animate-pulse">
            {creator.name} is writing…
          </p>
        ) : null}
        {error ? <p className="text-sm text-muted">{error}</p> : null}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="flex shrink-0 items-end gap-2 border-t border-foreground/10 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-8"
      >
        <label htmlFor={inputId} className="sr-only">
          Message {creator.name}
        </label>
        <textarea
          ref={inputRef}
          id={inputId}
          rows={2}
          value={draft}
          placeholder={`Message ${creator.name}`}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          className="min-h-12 flex-1 resize-none rounded-2xl border border-foreground/15 bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted/70 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        <button
          type="submit"
          disabled={sending || draft.trim().length === 0}
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send aria-hidden="true" className="size-4" />
          <span className="sr-only">Send</span>
        </button>
      </form>
    </div>
  );
}
