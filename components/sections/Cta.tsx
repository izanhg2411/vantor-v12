"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import { cta } from "@/lib/content";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Cta() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (key: keyof typeof values) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = (): Errors => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Introduce tu nombre.";
    if (!EMAIL_RE.test(values.email.trim()))
      next.email = "Introduce un email válido.";
    if (values.message.trim().length < 10)
      next.message = "Cuéntanos algo más (mínimo 10 caracteres).";
    return next;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // TODO-CONTENIDO: envío simulado, no hay endpoint real conectado.
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 900);
  };

  const field =
    "w-full border-b border-white/15 bg-transparent py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-600 focus:border-[var(--accent)]";

  return (
    <section id="cta" className="section">
      <div
        className="veil-bottom pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-[1500px] gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="max-w-md">
          <Reveal>
            <p className="eyebrow">{cta.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-light tracking-[-0.02em] text-white">
              {cta.title}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-sm leading-relaxed text-neutral-400">
              {cta.text}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          {status === "sent" ? (
            <p
              role="status"
              className="border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-6 py-8 text-sm text-neutral-100"
            >
              {cta.success}
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
              <div>
                <label
                  htmlFor="name"
                  className="text-[10px] tracking-[0.3em] uppercase text-neutral-500"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={set("name")}
                  aria-invalid={!!errors.name}
                  className={field}
                  placeholder="Nombre y apellidos"
                />
                {errors.name && (
                  <p className="mt-2 text-[11px] text-[var(--accent)]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-[10px] tracking-[0.3em] uppercase text-neutral-500"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  className={field}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-[11px] text-[var(--accent)]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-[10px] tracking-[0.3em] uppercase text-neutral-500"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={set("message")}
                  aria-invalid={!!errors.message}
                  className={`${field} resize-none`}
                  placeholder="Configuración de interés, plazos, concesionario…"
                />
                {errors.message && (
                  <p className="mt-2 text-[11px] text-[var(--accent)]">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="self-start border border-[var(--accent)] px-8 py-3 text-[11px] tracking-[0.25em] uppercase text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#050505] disabled:opacity-50"
              >
                               {status === "sending" ? "Enviando…" : "Enviar solicitud"}
              </button>

              <p className="text-[11px] leading-relaxed text-neutral-600">
                Proyecto conceptual: este formulario es una demostración y no
                envía ni guarda ningún dato.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
