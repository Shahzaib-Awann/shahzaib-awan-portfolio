import AboutSection from "@/components/pages/home/about";
import ContactMeSection from "@/components/pages/home/contact-me";
import HeroSection from "@/components/pages/home/hero";
import ProjectsSection from "@/components/pages/home/projects";
import ServicesSection from "@/components/pages/home/services";
import TestimonialsSection from "@/components/pages/home/testimonials";

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1 relative">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactMeSection />
    </div>
  );
}
