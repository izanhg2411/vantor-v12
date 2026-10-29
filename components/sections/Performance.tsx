import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import { performance } from "@/lib/content";

export default function Performance() {
  return (
    <section id="performance" className="section">
      <div
        className="veil-bottom pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1500px]">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow">{performance.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-light tracking-[-0.02em] text-white">
              {performance.title}
            </h2>
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {performance.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 110}>
              <div>
                <dt className="text-[10px] tracking-[0.3em] uppercase text-neutral-500">
                  {stat.label}
                </dt>
                <dd className="mt-3 text-[clamp(2rem,5.5vw,3.25rem)] leading-none font-light text-white">
                  <CountUp
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix=""
                  />
                  <span className="ml-1 text-base text-neutral-500">
                    {stat.suffix.trim()}
                  </span>
                </dd>
                <div className="rule mt-5" />
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={200}>
          <p className="mt-10 max-w-lg text-[11px] leading-relaxed text-neutral-600">
            {performance.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
