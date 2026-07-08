import Hero from "@/components/Hero";
import About from "@/components/About";
import PortfolioGrid from "@/components/PortfolioGrid";
import Projects from "@/components/Projects";
import ServicesSection from "@/components/ServicesSection";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import InstagramFeed from "@/components/InstagramFeed";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <PortfolioGrid />
      <Projects />
      <ServicesSection />
      <WhyChoose />
      <Testimonials />
      <InstagramFeed />
      <Contact />
    </>
  );
}
