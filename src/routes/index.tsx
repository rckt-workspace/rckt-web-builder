import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import Nav from "@/components/rckt/Nav";
import Hero from "@/components/rckt/Hero";
import Problem from "@/components/rckt/Problem";
import Pillars from "@/components/rckt/Pillars";
import GrowthOS from "@/components/rckt/GrowthOS";
import Services from "@/components/rckt/Services";
import Verticals from "@/components/rckt/Verticals";
import WhyRckt from "@/components/rckt/WhyRckt";
import NextSteps from "@/components/rckt/NextSteps";
import Footer from "@/components/rckt/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="liquid-bg min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-accent-foreground">
      {/* Hero: malla viva sobre slate oscuro, con la nav en glass flotante. */}
      <div className="relative overflow-hidden bg-stripe-mesh text-white [clip-path:polygon(0_0,100%_0,100%_92%,0_100%)] pb-24">
        <div className="sticky top-0 z-40 glass-nav">
          <Nav />
        </div>
        <Hero />
      </div>
      <main>
        <Problem />
        <Pillars />
        <GrowthOS />
        <Services />
        <Verticals />
        <WhyRckt />
        <NextSteps />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
