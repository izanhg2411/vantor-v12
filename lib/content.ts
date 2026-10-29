// ---------------------------------------------------------------------------
// VANTOR V12 — Contenido editorial
// ---------------------------------------------------------------------------
// TODO-CONTENIDO: todas las cifras y textos marcados son PROVISIONALES
// (contenido conceptual de maqueta). No son datos reales de producto.
// ---------------------------------------------------------------------------

export const brand = {
  name: "VANTOR",
  model: "V12",
  full: "VANTOR V12",
};

export const nav = [
  { id: "hero", label: "Inicio" },
  { id: "design", label: "Diseño" },
  { id: "performance", label: "Prestaciones" },
  { id: "specs", label: "Especificaciones" },
  { id: "details", label: "Detalles" },
  { id: "cta", label: "Contacto" },
];

export const hero = {
  eyebrow: "Serie limitada",
  title: "VANTOR V12",
  // TODO-CONTENIDO: eslogan provisional
  tagline: "Doce cilindros. Ninguna concesión.",
  subtitle:
    "Un gran turismo de motor central atmosférico concebido como un ejercicio de precisión: aerodinámica activa, chasis de fibra de carbono y una respuesta lineal hasta la última vuelta del cuentarrevoluciones.",
  cta: "Solicitar información",
  ctaSecondary: "Ver especificaciones",
  scrollHint: "Desplázate",
};

export const design = {
  eyebrow: "Diseño",
  title: "La forma sigue al aire",
  blocks: [
    {
      title: "Lenguaje formal",
      // TODO-CONTENIDO
      text: "Una silueta de una sola línea, tensada desde el arco delantero hasta el difusor. Sin adornos: cada superficie existe porque cumple una función térmica o aerodinámica.",
    },
    {
      title: "Aerodinámica",
      // TODO-CONTENIDO: cifras de carga aerodinámica provisionales
      text: "Suelo plano con doble túnel Venturi y alerón activo de dos posiciones. 385 kg de carga aerodinámica a 250 km/h, con un coeficiente Cx de 0,32 en modo de baja resistencia.",
    },
    {
      title: "Filosofía",
      // TODO-CONTENIDO
      text: "Ligereza antes que potencia. Cada kilogramo eliminado vale más que cada caballo añadido: de ahí el monocasco de carbono, los cristales aligerados y la ausencia deliberada de asistencias superfluas.",
    },
  ],
};

export const performance = {
  eyebrow: "Prestaciones",
  title: "Medido, no prometido",
  // TODO-CONTENIDO: todas las cifras son provisionales
  stats: [
    { value: 812, suffix: " CV", label: "Potencia máxima", decimals: 0 },
    { value: 2.8, suffix: " s", label: "0 — 100 km/h", decimals: 1 },
    { value: 348, suffix: " km/h", label: "Velocidad máxima", decimals: 0 },
    { value: 720, suffix: " Nm", label: "Par máximo", decimals: 0 },
  ],
  note:
    "Cifras ficticias de un proyecto conceptual, sin validación real.",
};

export const specs = {
  eyebrow: "Especificaciones",
  title: "Ficha técnica",
  // TODO-CONTENIDO: ficha técnica completamente provisional
  rows: [
    { label: "Motor", value: "V12 6.5 L atmosférico, 65°" },
    { label: "Potencia", value: "812 CV @ 8.500 rpm" },
    { label: "Par", value: "720 Nm @ 6.750 rpm" },
    { label: "0 — 100 km/h", value: "2,8 s" },
    { label: "Velocidad máxima", value: "348 km/h" },
    { label: "Peso en seco", value: "1.415 kg" },
    { label: "Transmisión", value: "Doble embrague, 8 relaciones" },
    { label: "Tracción", value: "Trasera, diferencial electrónico" },
    { label: "Precio", value: "Desde 485.000 €" },
    { label: "Unidades", value: "199 numeradas" },
  ],
};

export const details = {
  eyebrow: "Detalles",
  title: "Donde se decide todo",
  // TODO-CONTENIDO: descripciones provisionales
  items: [
    {
      title: "Llantas",
      text: "Forjadas en una sola pieza, 20\" delante y 21\" detrás, con radios asimétricos que canalizan el aire caliente fuera del paso de rueda.",
    },
    {
      title: "Interior",
      text: "Dos plazas, un único eje de simetría. Instrumentación digital de 12,3\" orientada al conductor y mando de marchas mecánico expuesto.",
    },
    {
      title: "Aerodinámica activa",
      text: "Alerón trasero y flaps delanteros gestionados en 120 ms según ángulo de dirección, aceleración lateral y presión de frenada.",
    },
    {
      title: "Iluminación",
      text: "Firma lumínica de matriz LED en dos trazos horizontales, con proyección adaptativa y función de curva predictiva.",
    },
    {
      title: "Escape",
      text: "Línea en titanio con válvulas continuas: de un murmullo de crucero a la resonancia plena del V12 por encima de 5.000 rpm.",
    },
    {
      title: "Materiales",
      text: "Monocasco y carrocería en fibra de carbono, aleación de aluminio en subchasis, y Alcantara de trama abierta en el habitáculo.",
    },
  ],
};

export const cta = {
  eyebrow: "Contacto",
  title: "Configura el tuyo",
  text: "Producción limitada a 199 unidades. Rellena el formulario para ver cómo funcionaría una solicitud de presentación privada.",
success: "Solicitud simulada correctamente. Es una demostración: no se ha enviado ni guardado ningún dato.",  // TODO-CONTENIDO: el envío es simulado, no hay backend conectado.
};

export const footer = {
  tagline: "VANTOR — Ingeniería aplicada al deseo.",
  columns: [
    {
      title: "Navegación",
      links: nav.map((n) => ({ label: n.label, href: `#${n.id}` })),
    },
    {
      title: "Contacto",
      // TODO-CONTENIDO: datos de contacto provisionales
      links: [
        { label: "info@vantor.example", href: "mailto:info@vantor.example" },
        { label: "+34 900 000 000", href: "tel:+34900000000" },
        { label: "Bilbao — España", href: "#cta" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Aviso legal", href: "#" },
        { label: "Política de privacidad", href: "#" },
        { label: "Cookies", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 VANTOR. Todos los derechos reservados. Proyecto conceptual.",
};
