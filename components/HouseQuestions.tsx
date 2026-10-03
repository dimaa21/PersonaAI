"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const questions = [
  {
    id: "people",
    question: "Are the creators real people?",
    answer:
      "No. Alex, Noah, Mia, and Sofia are written personalities. The portraits, captions, and voices are made for VIORA. They are not accounts of anyone you could meet.",
  },
  {
    id: "ask",
    question: "What happens when I ask one of them?",
    answer:
      "The profile opens a short conversation in that creator’s voice. It stays on the page. The house does not keep a transcript after you close it.",
  },
  {
    id: "telegram",
    question: "Is Telegram a different feed?",
    answer:
      "Telegram is the public room for the house. The site is the edit: four blogs, the journal, and a way to write to us directly.",
  },
  {
    id: "write",
    question: "Who reads a message to the house?",
    answer:
      "The form goes to the desk that runs VIORA. Use it for press, a partnership, or an ordinary note. It is not a message to a creator.",
  },
] as const;

export function HouseQuestions() {
  const [openId, setOpenId] = useState<string | null>(questions[0].id);

  return (
    <section aria-labelledby="house-questions-title" className="px-5 pb-16 sm:px-8 md:pb-24 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 border-t border-foreground/10 pt-14 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:pt-16 xl:max-w-7xl">
        <Reveal>
          <h2
            id="house-questions-title"
            className="font-serif text-[clamp(2.1rem,5vw,3.4rem)] leading-[0.95] tracking-[-0.035em] text-foreground"
          >
            Questions the house actually gets.
          </h2>
        </Reveal>
        <div>
          {questions.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id} className="border-b border-foreground/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`${item.id}-answer`}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-[15px] text-foreground transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.question}
                    <span aria-hidden="true" className="font-serif text-xl text-accent">
                      {open ? "–" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={`${item.id}-answer`}
                  role="region"
                  aria-hidden={!open}
                  inert={!open}
                  className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
