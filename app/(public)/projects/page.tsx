import ProjectsFilter from "@/components/pages/projects/filters";
import ProjectsPagination from "@/components/pages/projects/paginations";
import ProjectsShowcaseGrid from "@/components/pages/projects/showcase-grid";
import { BackgroundPattern } from "@/components/ui/background-pattern";
import Link from "next/link";

type SearchParams = {
  page?: string;
  pageSize?: string;
  search?: string;
  category?: string;
  technology?: string;
};

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;

  const search = params.search || "";
  const category = params.category || "";
  const technology = params.technology || "";
  const page = Number(params.page || 1);
  const pageSize = Number(params.pageSize || 20);

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
        <ProjectsFilter initialQuery={{ search, category, technology }} />

        <ProjectsShowcaseGrid />

        <ProjectsPagination
        currentPage={page}
        totalPages={10} // from API
        pageSize={pageSize}
        totalItems={400} // from API
      />
        
      </div>
    </div>
  );
};

export default ProjectsPage;
