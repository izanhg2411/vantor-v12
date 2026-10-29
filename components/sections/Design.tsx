import Reveal from "@/components/ui/Reveal";
import { design } from "@/lib/content";

export default function Design() {
  return (
    <section id="design" className="section">
      <div
        className="veil-right pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1500px]">
        <div className="ml-auto max-w-xl">
          <Reveal>
            <p className="eyebrow">{design.eyebrow}</p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-light tracking-[-0.02em] text-white">
              {design.title}
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col gap-10">
            {design.blocks.map((block, i) => (
              <Reveal key={block.title} delay={120 + i * 90}>
                <div>
                  <div className="rule mb-5 w-full" />
                  <h3 className="text-[11px] tracking-[0.3em] uppercase text-neutral-300">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {block.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
