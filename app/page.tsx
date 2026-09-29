import { CalculatorClient } from "@/components/calculator-client";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HppGuide } from "@/components/hpp-guide";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 dark:border-zinc-800 dark:from-emerald-950/40 dark:to-zinc-950 bg-gradient-to-b">
        <Hero />
        <CalculatorClient />
        <HppGuide />
      </main>
      <Footer />
    </>
  );
}
