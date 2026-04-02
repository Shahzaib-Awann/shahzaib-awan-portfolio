
import Header from "@/components/layouts/header";
import HeroSection from "@/components/pages/home/hero";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <HeroSection />
    </div>
  );
}
