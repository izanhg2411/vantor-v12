import { brand, footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-[#050505]/95 px-6 py-16 backdrop-blur-sm md:px-10">
      <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-4">
        <div>
          <span className="text-sm tracking-[0.5em] text-neutral-100">
            {brand.name}
          </span>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-neutral-500">
            {footer.tagline}
          </p>
        </div>

        {footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-neutral-500">
              {col.title}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-neutral-400 transition-colors hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-[1500px] border-t border-white/8 pt-6">
               <p className="text-[10px] tracking-[0.15em] text-neutral-600">
          {footer.copyright}
        </p>
        <p className="mt-2 text-[10px] tracking-[0.15em] text-neutral-600">
          Modelo 3D generado con Tripo AI.
        </p>
      </div>
    </footer>
  );
}
