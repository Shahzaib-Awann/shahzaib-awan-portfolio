
import Header from "@/components/layouts/header";
import AboutSection from "@/components/pages/home/about";
import HeroSection from "@/components/pages/home/hero";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 relative">
      <Header />
      <HeroSection />
      <AboutSection />
    </div>
  );
}
