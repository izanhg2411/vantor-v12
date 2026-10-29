"use client";

import { useEffect, useState } from "react";
import { nav, brand } from "@/lib/content";
import { useSceneStore } from "@/lib/store";

export default function Navbar() {
  const activeSection = useSceneStore((s) => s.activeSection);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-white/5 bg-[#050505]/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-10"
      >
        <a
          href="#hero"
          className="text-sm font-medium tracking-[0.5em] text-neutral-100"
        >
          {brand.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.slice(1).map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`text-[11px] tracking-[0.22em] uppercase transition-colors ${
                  activeSection === item.id
                    ? "text-[var(--accent)]"
                    : "text-neutral-400 hover:text-neutral-100"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          className="hidden border border-white/20 px-5 py-2 text-[11px] tracking-[0.22em] uppercase text-neutral-200 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:inline-block"
        >
          Contacto
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-5 bg-neutral-200 transition-transform ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-neutral-200 transition-transform ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-white/5 px-6 pb-6 pt-2 md:hidden">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-xs tracking-[0.25em] uppercase text-neutral-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
