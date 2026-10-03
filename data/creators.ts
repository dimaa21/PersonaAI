import type { StaticImageData } from "next/image";
import alexPortrait from "@/public/images/creators/alex.webp";
import miaPortrait from "@/public/images/creators/mia.webp";
import noahPortrait from "@/public/images/creators/noah.webp";
import sofiaPortrait from "@/public/images/creators/sofia.webp";
import alexPost1 from "@/public/images/creators/posts/alex-1.webp";
import alexPost2 from "@/public/images/creators/posts/alex-2.webp";
import alexPost3 from "@/public/images/creators/posts/alex-3.webp";
import miaPost1 from "@/public/images/creators/posts/mia-1.webp";
import miaPost2 from "@/public/images/creators/posts/mia-2.webp";
import miaPost3 from "@/public/images/creators/posts/mia-3.webp";
import noahPost1 from "@/public/images/creators/posts/noah-1.webp";
import noahPost2 from "@/public/images/creators/posts/noah-2.webp";
import noahPost3 from "@/public/images/creators/posts/noah-3.webp";
import sofiaPost1 from "@/public/images/creators/posts/sofia-1.webp";
import sofiaPost2 from "@/public/images/creators/posts/sofia-2.webp";
import sofiaPost3 from "@/public/images/creators/posts/sofia-3.webp";

export interface CreatorPost {
  id: string;
  caption: string;
  lede: string;
  body: string[];
  image: StaticImageData;
  date: string;
  likes: number;
}

export interface Creator {
  id: string;
  name: string;
  username: string;
  category: string;
  description: string;
  bio: string;
  personality: string;
  image: StaticImageData;
  posts: CreatorPost[];
}

export const creators: Creator[] = [
  {
    id: "alex",
    name: "Alex",
    username: "@alexviora",
    category: "AI / Technology / Business",
    description: "Signals, systems, and the business of what comes next.",
    bio: "Always curious about what comes next. I explore AI, startups, technology and the people building the future.",
    personality: "Precise and analytical. He would rather be exact than loud.",
    image: alexPortrait,
    posts: [
      {
        id: "alex-1",
        caption: "What actually changes when a model ships.",
        lede: "The demo is not the product. The week after the release is.",
        body: [
          "A model that ships changes three things, and only three: what a person can do without asking, what a team stops checking by hand, and which old workflow quietly dies. Everything else is a launch post.",
          "I keep a short list from the last few releases I actually used. The useful ones did not feel smarter. They removed a step I had stopped noticing. The disappointing ones added a panel and left the step where it was.",
          "If you want to know whether it mattered, look at the calendar a month later. Fewer meetings about the task, or the same meetings with a new tab open. That is the whole measurement.",
        ],
        image: alexPost1,
        date: "2026-09-28",
        likes: 128,
      },
      {
        id: "alex-2",
        caption: "The quiet part of building in public.",
        lede: "The feed gets the finished sentence. The work is the draft you do not post.",
        body: [
          "Building in public is usually a highlight reel with the timestamps removed. The useful part is the opposite: the week the thing did not work, and the note you write so you do not repeat it.",
          "I publish less than I used to. Not from secrecy. A half-true update costs more attention than it returns. If the sentence is not exact, it waits.",
          "The quiet part is a folder of unfinished notes and one rule. One public line a week, and only if it would still be true on Friday.",
        ],
        image: alexPost2,
        date: "2026-09-19",
        likes: 86,
      },
      {
        id: "alex-3",
        caption: "A note on attention, and what it costs.",
        lede: "Attention is the only inventory that does not restock on Monday.",
        body: [
          "Every tool that asks for a glance is bidding on the same hour. I stopped treating that as a personal failing and started treating it as a budget. There is a number of deep hours in a day. After that, the work gets thinner, and I pretend it has not.",
          "The cost is not the notification. It is the return. Ten minutes to come back to the sentence I was in. I measured it once, badly, and the number was rude enough that I closed three tabs for good.",
          "What I keep is narrow on purpose. A model, a page, a person I am actually answering. The rest can wait until the hour I already decided to spend on it.",
        ],
        image: alexPost3,
        date: "2026-09-04",
        likes: 154,
      },
    ],
  },
  {
    id: "noah",
    name: "Noah",
    username: "@noahviora",
    category: "Travel / Fitness / Adventure",
    description: "Distance, training, and the discipline of the open road.",
    bio: "I go where the day is longer. Miles, coastlines, and the kind of training that does not care about the forecast.",
    personality: "Direct and physical. Most at ease when the plan meets the weather.",
    image: noahPortrait,
    posts: [
      {
        id: "noah-1",
        caption: "Dawn miles before the city wakes.",
        lede: "The first four miles are the only ones that belong to me.",
        body: [
          "The city is still off. A few lights in kitchens, a bus with nobody waiting, and the sound of my own pace. I do not listen to anything. The point of being out this early is that nothing is talking.",
          "By mile four the legs have stopped negotiating. That is the mile I came for. The rest of the run is just not wasting it.",
          "I am back before the cafes unlock. Shoes by the door, coffee, and the day can start. The same route at nine feels like traffic.",
        ],
        image: noahPost1,
        date: "2026-09-26",
        likes: 203,
      },
      {
        id: "noah-2",
        caption: "A ridge, a weather window, a plan.",
        lede: "The mountain does not care that the forecast improved overnight.",
        body: [
          "We had six hours of clear between two fronts. That is not a mood. That is a timetable. Pack the night before, leave while it is still stupidly early, and turn around when the window says so, not when the view gets good.",
          "The ridge was exactly as long as the map. Wind from the left, a short scramble where the path gives up, and then the line we had circled in pencil. We did not stay for a second coffee at the top.",
          "Coming down in the first rain is the part people crop out. It is also the part that tells you whether the plan was real.",
        ],
        image: noahPost2,
        date: "2026-09-12",
        likes: 97,
      },
      {
        id: "noah-3",
        caption: "Training when the day does not cooperate.",
        lede: "The session still happens. It just gets smaller and uglier.",
        body: [
          "Rain on the window, a late train, a knee that filed a complaint. None of that cancels the work. It changes the dose. Forty minutes instead of seventy. Hills instead of the long loop. Something that still counts.",
          "I used to skip the bad days and call it listening to my body. Mostly it was listening to the part of me that wanted the couch. The body is fine with a shorter session. It is not fine with a week of none.",
          "The rule is dull: show up, do the version of the day that fits, write down what I actually did. The log does not care about the weather either.",
        ],
        image: noahPost3,
        date: "2026-08-30",
        likes: 141,
      },
    ],
  },
  {
    id: "mia",
    name: "Mia",
    username: "@miaviora",
    category: "Fashion / Lifestyle",
    description: "Silhouette, taste, and the edit behind the look.",
    bio: "Style is an edit. I care about proportion, cloth, and the few pieces that make everything else quieter.",
    personality: "Exacting taste. She edits a look until nothing extra remains.",
    image: miaPortrait,
    posts: [
      {
        id: "mia-1",
        caption: "The coat that edits everything else.",
        lede: "One good coat makes the rest of the outfit behave.",
        body: [
          "I have been wearing the same black coat for three weeks. Not because I lack options. Once the shoulder and the length are right, the sweater underneath can be almost anything and the picture still holds.",
          "The edit is in what I stopped adding. No second necklace. No bag that argues with the lapel. The coat is the sentence. Everything else is punctuation.",
          "People ask where it is from, which is the wrong question. The right one is whether it ends where the leg wants it to end. This one does. I am keeping it until it does not.",
        ],
        image: miaPost1,
        date: "2026-10-01",
        likes: 246,
      },
      {
        id: "mia-2",
        caption: "Proportion, then color. In that order.",
        lede: "Color is the last decision, and the easiest one to hide behind.",
        body: [
          "A look fails in the first ten seconds for a structural reason. The jacket is too short for the skirt, or the trouser is too full for the shoe, or the shoulder is doing a job the waist did not agree to. Dye will not fix that.",
          "I start with the body, not a palette. Hem, shoulder, rise. When those three agree, the color can be quiet. Navy, black, a bone shirt. If they do not agree, a brighter color only announces the mistake.",
          "The order is the whole method. Proportion, then cloth, then color. I have watched people reverse it for years. The outfits are loud. The silhouette is still lost.",
        ],
        image: miaPost2,
        date: "2026-09-18",
        likes: 118,
      },
      {
        id: "mia-3",
        caption: "A uniform for days with no occasion.",
        lede: "The days with nowhere to be are the ones that show whether you actually like your clothes.",
        body: [
          "A uniform is not a costume. It is the set of pieces I reach for when nobody is going to photograph the outfit and I still want to feel finished. Trousers that sit properly. A knit that is not trying. A shoe I can walk in without announcing that I can.",
          "I built it by removing. The interesting jacket stayed in the wardrobe, because interesting is work. What remained is boring in a photograph and correct on a Tuesday.",
          "If you need an occasion to get dressed, the wardrobe is performing. I would rather it just work.",
        ],
        image: miaPost3,
        date: "2026-09-02",
        likes: 173,
      },
    ],
  },
  {
    id: "sofia",
    name: "Sofia",
    username: "@sofiaviora",
    category: "Beauty / Lifestyle",
    description: "Ritual, light, and a quieter kind of polish.",
    bio: "Beauty, kept simple. Light, texture, and the small rituals that make a day feel finished.",
    personality: "Calm and luminous. Polish, for her, is a daily practice.",
    image: sofiaPortrait,
    posts: [
      {
        id: "sofia-1",
        caption: "Light, water, ten quiet minutes.",
        lede: "The morning does not need a routine. It needs ten minutes that are not for anyone else.",
        body: [
          "Water first, before coffee, before the phone. Then the window, if there is one. I do not meditate. I stand there long enough that my eyes adjust and the day has a start that I chose.",
          "Ten minutes is the whole practice. Longer than that and it becomes a project, with a playlist and a claim. Shorter, and I am already in the messages, answering a morning I did not mean to have.",
          "The light does the rest. On a grey day it is still light. I am not trying to glow. I am trying not to begin already behind.",
        ],
        image: sofiaPost1,
        date: "2026-09-29",
        likes: 189,
      },
      {
        id: "sofia-2",
        caption: "Skin looks like skin. That is the point.",
        lede: "The finish I want is the one you cannot name from across the table.",
        body: [
          "I stopped chasing a surface that reads as done. Skin has texture. Covering all of it makes a face look like a decision instead of a person. What I keep is thin: moisture, a little color where I am actually pale, and nothing that has to be photographed under a ring light to make sense.",
          "People call this effortless, which is inaccurate. It takes restraint, which is effort of a quieter kind. The products that promise a new face are asking me to disagree with the one I have.",
          "If someone notices the skin, I have gone too far. They should notice that I look like I slept, even when I did not.",
        ],
        image: sofiaPost2,
        date: "2026-09-15",
        likes: 132,
      },
      {
        id: "sofia-3",
        caption: "The evening edit, pared back.",
        lede: "Night is when I take things off, not when I add a second look.",
        body: [
          "The evening edit is a subtraction. The day cream goes. Anything with a shine goes. What stays is clean skin, a little oil if the air is dry, and the same small earring I wore at noon.",
          "I used to rebuild my face after seven, as if the dark required a different person. It only required less. The rooms I actually like are not lit for a full face anyway.",
          "Pared back is not unfinished. It is the version that can sit at a table for two hours and still look like the person who arrived.",
        ],
        image: sofiaPost3,
        date: "2026-08-28",
        likes: 94,
      },
    ],
  },
];

export function findPost(id: string) {
  for (const creator of creators) {
    const post = creator.posts.find((item) => item.id === id);
    if (post) return { creator, post };
  }
  return null;
}
