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
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-accent-foreground">
      {/* Bloque superior con degradado angular estilo Stripe */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-stripe-gradient"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 100%)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-background/10 mix-blend-overlay"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 100%)" }}
        />
        <div className="relative">
          <Nav />
          <Hero />
        </div>
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
