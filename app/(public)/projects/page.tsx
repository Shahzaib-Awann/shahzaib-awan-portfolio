import ProjectsFilter from "@/components/pages/projects/filters";
import { BackgroundPattern } from "@/components/ui/background-pattern";
import Link from "next/link";

const ProjectsPage = () => {
  return (
    <div
      id="projects"
      className="relative h-full scroll-mt-10 py-25 overflow-hidden flex justify-center items-center"
    >
      {/* Grid Background Pattern */}
      <BackgroundPattern />

      {/* Main container */}
      <div className="container mx-auto px-6 pt-25 relative z-10 space-y-20">
        {/* Left side (heading + subheading) */}
        <div className="flex flex-col items-center gap-5">
          <Link
            href="#projects"
            className="text-3xl sm:text-4xl md:text-8xl uppercase font-bold tracking-tight text-foreground  transition-all duration-300"
          >
            Projects
          </Link>

          <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-3xl text-center">
            Explore a curated selection of my professional projects,
            highlighting the skills, creativity, and impact behind each
            accomplishment.
          </p>
        </div>

        {/* Filter component */}
        <ProjectsFilter />

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Project cards will be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
