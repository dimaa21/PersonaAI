"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

export function PostLike({ count }: { count: number }) {
  const [liked, setLiked] = useState(false);
  const likes = count + (liked ? 1 : 0);

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? "Unlike this post" : "Like this post"}
      onClick={() => setLiked((current) => !current)}
      className={`inline-flex min-h-11 items-center gap-1.5 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-safe:active:scale-95 ${
        liked ? "text-foreground" : "text-muted hover:text-foreground"
      }`}
    >
      <Heart aria-hidden="true" className={`size-4 ${liked ? "fill-current" : ""}`} />
      <span>{likes}</span>
    </button>
  );
}
