import Reveal from "@/components/ui/Reveal";
import { specs } from "@/lib/content";

export default function Specs() {
  return (
    <section id="specs" className="section">
      <div
        className="veil-right pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1500px]">
        <div className="ml-auto w-full max-w-2xl">
          <Reveal>
            <p className="eyebrow">{specs.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-light tracking-[-0.02em] text-white">
              {specs.title}
            </h2>
          </Reveal>

          <dl className="mt-12">
            {specs.rows.map((row, i) => (
              <Reveal key={row.label} delay={Math.min(i * 45, 360)}>
                <div className="flex items-baseline justify-between gap-6 border-b border-white/8 py-4">
                  <dt className="text-[10px] tracking-[0.28em] uppercase text-neutral-500">
                    {row.label}
                  </dt>
                  <dd className="text-right text-sm font-light text-neutral-100 md:text-base">
                    {row.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
