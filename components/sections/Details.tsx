import Reveal from "@/components/ui/Reveal";
import { details } from "@/lib/content";

export default function Details() {
  return (
    <section id="details" className="section">
      <div
        className="veil-bottom pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1500px]">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow">{details.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-light tracking-[-0.02em] text-white">
              {details.title}
            </h2>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {details.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80}>
              <div className="rule mb-4" />
              <h3 className="text-[11px] tracking-[0.3em] uppercase text-neutral-200">
                <span className="mr-3 text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">
                {item.text}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
