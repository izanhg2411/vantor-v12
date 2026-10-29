import type { Metadata } from "next";
import "./globals.css";

// NOTE: intentionally not using next/font/google here — this sandbox has no
// network access to fonts.googleapis.com at build time. System font stack,
// defined in globals.css.

export const metadata: Metadata = {
  metadataBase: new URL("https://vantor.example"),
  title: "VANTOR V12 — Superdeportivo V12 atmosférico de serie limitada",
  description:
    "VANTOR V12: 812 CV atmosféricos, 0-100 km/h en 2,8 s y monocasco de fibra de carbono. 199 unidades numeradas. Descubre el diseño, las prestaciones y la ficha técnica.",
  keywords: [
    "VANTOR",
    "VANTOR V12",
    "superdeportivo",
    "V12 atmosférico",
    "serie limitada",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "VANTOR",
    title: "VANTOR V12 — Doce cilindros. Ninguna concesión.",
    description:
      "Superdeportivo de motor central atmosférico. 812 CV, 348 km/h, 199 unidades numeradas.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "VANTOR V12",
    description:
      "Superdeportivo de motor central atmosférico. 812 CV, 348 km/h, 199 unidades numeradas.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="antialiased">
      <body className="bg-background text-neutral-200">{children}</body>
    </html>
  );
}
