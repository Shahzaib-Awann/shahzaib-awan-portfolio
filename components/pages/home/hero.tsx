import CurvedLoop from "@/components/ui/curved-loop";
import TextType from "@/components/ui/text-type-animation";
import Image from "next/image";
import Link from "next/link";

const greetings = [
  "Hello", "Hola", "Bonjour", "你好", "नमस्ते", "مرحبا",
  "Olá", "Привет", "こんにちは", "안녕하세요", "Hallo", "Ciao",
];

const CurvedLoopText = "SHAHZAIB AWAN ✦ FULL STACK ✦ AI & ML ✦ DEVELOPER ✦";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* ShapeGrid Background (VERY subtle) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Curved Signature (BOTTOM ONLY) */}
      <div className="absolute top-0 md:top-120 xl:top-130 left-0 w-full justify-center opacity-20 pointer-events-none flex">
        <CurvedLoop
          marqueeText={CurvedLoopText}
          speed={1.5}
          curveAmount={-220}
          direction="left"
          interactive={true}
          className="text-7xl text-black fill-current"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row justify-between gap-2 relative z-10">
        <div className="max-w-3xl space-y-8">
          {/* Greeting */}
          <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
            <TextType
              text={greetings}
              typingSpeed={90}
              pauseDuration={1700}
              deletingSpeed={60}
              loop
              showCursor={true}
              className="text-lg sm:text-xl lg:text-2xl tracking-wide transition-all duration-300"
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight tracking-[-0.02em] text-[#0a0a0a] text-center md:text-left transition-all duration-300">
            Designing scalable
            <br />
            digital products with{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-semibold px-2">
                intelligent systems
              </span>
              <span className="absolute inset-0 bg-gray-400/35 -z-10 rounded-sm translate-y-1" />
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-base leading-relaxed max-w-xl text-center md:text-left transition-all duration-300">
            Full Stack Developer working across web, mobile, and desktop,
            focused on scalable architecture, performance, and intelligent
            systems. I build production-ready applications designed for
            real-world use.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center md:justify-start gap-6 pt-2 mb-10 sm:mb-0">
            <Link
              href="#contact-me"
              className="bg-black text-white hover:bg-background hover:text-black border hover:border-black px-10 py-5 text-sm rounded-none transition-all duration-300"
            >
              Get in touch
            </Link>
            <Link
              href="#"
              className="bg-transparent text-black hover:bg-black hover:text-white px-10 py-5 text-sm rounded-none transition-all duration-300"
            >
              Projects
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center items-center w-full mt-25 mb-10 md:my-0">
          {/* Image Card */}
          <div className="relative w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px] aspect-3/4 ease-out hover:rotate-0 rotate-5 transition-all duration-500">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border-2 border-dashed border-black/50">
              <Image
                src="/assets/shahzaib-awan-portfolio-hero-image.png"
                alt="profile"
                fill
                sizes="(max-width: 640px) 250px,
                       (max-width: 768px) 300px,
                       (max-width: 1024px) 350px,
                       400px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
