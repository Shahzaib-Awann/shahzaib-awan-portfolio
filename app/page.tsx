
import Header from "@/components/layouts/header";
import AboutSection from "@/components/pages/home/about";
import HeroSection from "@/components/pages/home/hero";
import ProjectsSection from "@/components/pages/home/projects";
import ServicesSection from "@/components/pages/home/services";
import TmpLayout from "@/components/pages/home/tmp";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 relative">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TmpLayout />
    </div>
  );
}
