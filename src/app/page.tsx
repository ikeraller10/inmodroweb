import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { Navbar } from "@/components/navbar";
import { SmoothScroll } from "@/components/smooth-scroll";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Profiles } from "@/components/sections/profiles";
import { Benefits } from "@/components/sections/benefits";
import { Boost } from "@/components/sections/boost";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQs } from "@/components/sections/faqs";
import { CTAFinal } from "@/components/sections/cta-final";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden w-full min-h-screen">
      <SmoothScroll />
      <Navbar />
      <section id="solucion">
        <CinematicHero />
      </section>
      <HowItWorks />
      <Profiles />
      <Benefits />
      <Boost />
      <Testimonials />
      <FAQs />
      <CTAFinal />
      <Footer />
    </main>
  );
}
