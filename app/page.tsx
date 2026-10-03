import { CreatorGrid } from "@/components/CreatorGrid";
import { CutStrip } from "@/components/CutStrip";
import { Hero } from "@/components/Hero";
import { HouseIndex } from "@/components/HouseIndex";
import { HouseQuestions } from "@/components/HouseQuestions";
import { HouseSteps } from "@/components/HouseSteps";
import { LatestNotes } from "@/components/LatestNotes";
import { RosterStats } from "@/components/RosterStats";
import { TelegramCTA } from "@/components/TelegramCTA";
import { creators } from "@/data/creators";

export default function Home() {
  return (
    <main>
      <Hero />
      <HouseIndex creators={creators} />
      <RosterStats creators={creators} />
      <CreatorGrid creators={creators} />
      <CutStrip creators={creators} />
      <HouseSteps />
      <HouseQuestions />
      <LatestNotes creators={creators} />
      <TelegramCTA />
    </main>
  );
}
