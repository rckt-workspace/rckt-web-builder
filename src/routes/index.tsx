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
      <Nav />
      <main>
        <Hero />
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
