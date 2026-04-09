import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BackgroundPattern } from "../ui/background-pattern";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background text-black overflow-hidden pt-25">
      
      {/* Grid Background Pattern */}
      <BackgroundPattern />

      {/* Main container */}
      <div className="relative z-10 container mx-auto px-6 py-15 flex flex-col gap-28">
        {/* Top section */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
          {/* Background word for decorative effect */}
          <div className="absolute -top-20 left-0 -z-10 leading-none pointer-events-none select-none">
            <h1 className="text-7xl sm:text-9xl lg:text-[210px] font-extrabold uppercase text-background">
              CREATE
            </h1>
            <h1 className="absolute top-0 left-0 text-7xl sm:text-9xl lg:text-[210px] font-extrabold uppercase text-black/10">
              CREATE
            </h1>
          </div>

          {/* Left content - call to action */}
          <div className="space-y-6 order-2 lg:order-1 text-center lg:text-left lg:pt-30 2xl:pt-0">
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">
              Ready for your next project?
            </p>

            <Link
              href="mailto:shahzaibawan1357@gmail.com"
              className="text-5xl md:text-7xl font-semibold leading-none tracking-tight"
            >
              Let&apos;s{" "}
              <span className="text-black/75 italic">build together</span>
            </Link>
          </div>

          {/* Right content - headline and project button */}
          <div className="flex flex-col gap-8 lg:items-start md:col-span-1 order-1 lg:order-2">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-semibold leading-none tracking-tight text-black/50 text-right">
              <span className="block">Seamless</span>
              <span className="block">Solutions.</span>
            </h2>

            <Link
              href="/#contact-me"
              className="bg-black rounded-none w-fit mx-auto lg:mr-0 group flex flex-row gap-2 text-white hover:bg-background hover:text-black border hover:border-black px-10 py-5 text-sm transition-all duration-300"
            >
              Start a Project
              <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45 translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Bottom section - copyright and privacy */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 text-xs md:text-sm text-black/75">
          <p>&copy; {currentYear} Shahzaib Awan. All rights reserved.</p>

          <p className="group relative inline-block">
            <Link
              href="/privacy-policy"
              className="flex flex-row gap-1 items-center"
            >
              Privacy Policy
            </Link>

            {/* Animated underline on hover */}
            <span className="absolute left-0 -bottom-2 h-0.5 w-full bg-gray-600 transform scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;