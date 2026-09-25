import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { Gallery } from "./sections/Gallery";
import { Guarantee } from "./sections/Guarantee";
import { Hero } from "./sections/Hero";
import { LanguageProvider } from "./LanguageContext";
import { Navbar } from "./sections/Navbar";
import { Roadmap } from "./sections/Roadmap";
import { Services } from "./sections/Services";
import { Testimonials } from "./sections/Testimonials";
import { AmbientLights } from "./components/AmbientLights";

function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <div className="relative min-h-[100dvh] overflow-hidden bg-[linear-gradient(180deg,oklch(0.96_0.02_260),oklch(0.99_0.005_260)_50%,oklch(0.995_0.003_260))]">
          <AmbientLights />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,oklch(0.78_0.1_75/0.18),transparent)]"
            aria-hidden
          />
          <Navbar />
          <Hero />
        </div>
        <main className="relative overflow-hidden">
          <AmbientLights className="opacity-80" />
          <div className="relative">
            <Services />
            <Roadmap />
            <Guarantee />
            <Gallery />
            <About />
            <Testimonials />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
