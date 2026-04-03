"use client";

import LogoLoop from "@/components/ui/infinite-logo-slider";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import Link from "next/link";

// Array of technology logos for the slider
const imageLogos = [
  { src: "/icons/javascript.png", alt: "JavaScript" },
  { src: "/icons/typescript.png", alt: "TypeScript" },
  { src: "/icons/tailwind-css.png", alt: "Tailwind CSS" },
  { src: "/icons/react-native.png", alt: "React Native" },
  { src: "/icons/nodejs.png", alt: "Node Js" },
  { src: "/icons/php.png", alt: "Php" },
  { src: "/icons/python.png", alt: "Python" },
  { src: "/icons/mysql.png", alt: "Mysql" },
  { src: "/icons/postgresql.png", alt: "Postgresql" },
  { src: "/icons/supabase.png", alt: "Supabase" },
  { src: "/icons/git-logo.png", alt: "Git" },
];

const AboutSection = () => {

  // Hook to detect mobile devices
  const { isMobile } = useIsMobile();

  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center overflow-hidden bg-black py-20">

      {/* Container for heading, logo loop, and about content */}
      <div className="container flex flex-col gap-10 px-5">

        {/* Section heading */}
        <h1 className="text-white font-semibold text-center font-poppins-500 text-lg md:text-xl uppercase">
          Technical Expertise
        </h1>

        {/* Infinite logo slider for technologies */}
        <LogoLoop
          logos={imageLogos}
          speed={50}
          direction="left"
          logoHeight={isMobile ? 60 : 80}
          gap={70}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#000"
          ariaLabel="Technology Stack"
        />

        {/* About me content */}
        <div className="flex flex-col md:flex-row gap-2 text-white mt-10">

          {/* Vertical "About Me" link */}
          <div className="w-full flex-1 flex flex-row items-start justify-center lg:justify-start">
            <Link
              href="#about"
              className="text-white md:text-white/75 uppercase tracking-[0.15em] text-3xl pb-5 md:pb-0 md:text-6xl md:rotate-180 font-semibold md:[writing-mode:vertical-rl]"
            >
              About Me
            </Link>
          </div>

          {/* About description and stats */}
          <div className="flex flex-col gap-10 flex-3 text-base sm:text-lg lg:text-xl xl:text-2xl">

            {/* Paragraphs describing experience */}
            <p className="flex flex-col gap-5 text-center md:text-left px-5">
              <span>
                I began my journey in web development by mastering the fundamentals of HTML, CSS, and JavaScript, and gradually progressed into full stack development. I have built real-world applications with a strong focus on scalability, performance, and clean, maintainable architecture.
              </span>

              <span>
                As I advanced, I expanded into cross-platform development across web, mobile, and desktop environments, strengthening my understanding of system design and application architecture. I have also developed a growing expertise in AI/ML, integrating intelligent features and data-driven solutions into modern applications.
              </span>

              <span>
                Currently, I focus on designing and developing scalable digital products that are performant, reliable, and production-ready. I continuously refine my skills through hands-on projects, exploring modern technologies, and solving real-world problems with efficient and structured solutions.
              </span>
            </p>

            {/* Experience statistics */}
            <div className="flex flex-row justify-evenly gap-6 pt-10 text-sm sm:text-base text-white border-t border-white/20">
              <div>
                <p className="font-poppins-700 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white text-center">2+</p>
                <p className="text-center pt-1">Years Experience</p>
              </div>
              <div>
                <p className="font-poppins-700 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white text-center">6+</p>
                <p className="text-center pt-1">Projects</p>
              </div>
              <div>
                <p className="font-poppins-700 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white text-center">10+</p>
                <p className="text-center pt-1">Technologies</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;