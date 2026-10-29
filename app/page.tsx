import Scene from "@/components/canvas/Scene";
import Navbar from "@/components/ui/Navbar";
import ScrollDriver from "@/components/ui/ScrollDriver";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import DebugGate from "@/components/ui/DebugGate";
import Hero from "@/components/sections/Hero";
import Design from "@/components/sections/Design";
import Performance from "@/components/sections/Performance";
import Specs from "@/components/sections/Specs";
import Details from "@/components/sections/Details";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";

// ---------------------------------------------------------------------------
// Composición principal: Canvas fijo (z-0) + secciones HTML por encima (z-10).
// Toda la lógica vive en sus componentes; aquí solo se ordena la página.
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      <Scene />
      <ScrollDriver />
      <LoadingOverlay />
      <Navbar />
      <DebugGate />

      <main className="relative z-10">
        <Hero />
        <Design />
        <Performance />
        <Specs />
        <Details />
        <Cta />
      </main>

      <Footer />
    </>
  );
}
