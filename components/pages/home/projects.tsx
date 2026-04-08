import ProjectCards from "@/components/widgets/project-card";
import { projects } from "@/lib/dummyData";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ProjectsSection = () => {
    return (
        <section
            id="projects"
            className="relative flex flex-col items-center overflow-hidden bg-black py-25"
        >
            {/* Main Section */}
            <div className="container flex flex-col gap-10 px-5">
                {/* Header section (title + description) */}
                <div className="flex flex-col md:flex-row items-center md:justify-between gap-10">
                    {/* Left side (heading + subheading) */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link
                            href="#projects"
                            className="text-white md:text-white  text-3xl sm:text-4xl md:text-6xl uppercase font-semibold tracking-tight transition-all duration-300"
                        >
                            Featured Projects
                        </Link>

                        <p className="mt-4 text-lg lg:text-xl text-white/75 text-center md:text-left">
                            Ideas explored through design and code
                        </p>
                    </div>

                    {/* Right side description */}
                    <p className="text-white/75 text-center max-w-md md:text-right leading-relaxed">
                        A selection of work driven by curiosity, shaped through iteration,
                        and built with a focus on clarity, performance, and meaningful user
                        experiences.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="flex w-full">
                    {/* Left decorative pattern */}
                    <PatternDivider />

                    {/* Project cards container */}
                    <div className="w-full max-w-6xl">
                        <ProjectCards projects={projects} />
                    </div>

                    {/* Right decorative pattern */}
                    <PatternDivider />
                </div>

                <div className="flex mt-5 flex-row justify-center">
                    <p className="group relative inline-block">
                        <Link
                            href="/projects"
                            className="text-white flex flex-row gap-1 items-center"
                        >
                            View All Projects
                            <ArrowUpRight className="size-5 transition-transform duration-500  group-hover:rotate-45 translate-x-1" />
                        </Link>

                        {/* Animated underline */}
                        <span className="absolute left-0 -bottom-2 h-0.5 w-full bg-white transform scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </p>
                </div>
            </div>
        </section>
    );
};

// Decorative side pattern
const PatternDivider = () => (
    <div
        className="flex-1 m-5 rounded-lg row-span-5 row-start-1 border-x border-x-(--pattern-fg)
                    bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] 
                    bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden
                    dark:[--pattern-fg:var(--color-white)]/50"
    />
);

export default ProjectsSection;
