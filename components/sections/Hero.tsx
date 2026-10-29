import Reveal from "@/components/ui/Reveal";
import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section id="hero" className="section items-end md:items-center">
      <div className="veil pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1500px]">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow">{hero.eyebrow}</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-[clamp(2.75rem,9vw,7rem)] leading-[0.92] font-light tracking-[-0.03em] text-white">
              VANTOR
              <span className="block text-neutral-400">V12</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-lg font-light tracking-tight text-neutral-200 md:text-xl">
              {hero.tagline}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-400">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="border border-[var(--accent)] bg-[var(--accent-soft)] px-7 py-3 text-[11px] tracking-[0.25em] uppercase text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#050505]"
              >
                {hero.cta}
              </a>
              <a
                href="#specs"
                className="border border-white/15 px-7 py-3 text-[11px] tracking-[0.25em] uppercase text-neutral-300 transition-colors hover:border-white/50 hover:text-white"
              >
                {hero.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="pointer-events-none mt-16 flex items-center gap-3 md:absolute md:right-0 md:bottom-0 md:mt-0">
          <span className="text-[10px] tracking-[0.35em] uppercase text-neutral-500">
            {hero.scrollHint}
          </span>
          <span className="scroll-hint block h-8 w-px bg-gradient-to-b from-[var(--accent)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
