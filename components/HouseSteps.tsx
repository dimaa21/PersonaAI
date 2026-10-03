import { Reveal } from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Choose a desk",
    copy: "The roster is four names. Pick the one whose subject you actually want to read.",
  },
  {
    number: "02",
    title: "Open the blog",
    copy: "Each profile keeps a short run of notes: a picture, a caption, a date, and a mark.",
  },
  {
    number: "03",
    title: "Ask them",
    copy: "The conversation stays in that voice. Or leave a note for the house, if it is for us.",
  },
] as const;

export function HouseSteps() {
  return (
    <section aria-labelledby="house-steps-title" className="px-5 py-16 sm:px-8 md:py-24 lg:px-10">
      <div className="mx-auto w-full max-w-6xl border-t border-foreground/10 pt-14 xl:max-w-7xl md:pt-16">
        <Reveal>
          <h2
            id="house-steps-title"
            className="max-w-xl font-serif text-[clamp(2.1rem,5vw,3.4rem)] leading-[0.95] tracking-[-0.035em] text-foreground"
          >
            How a visit usually goes.
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <Reveal key={step.number} as="li" delay={index * 0.06}>
              <p className="font-serif text-lg text-accent">{step.number}</p>
              <h3 className="mt-4 font-serif text-[1.75rem] leading-none tracking-[-0.03em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
