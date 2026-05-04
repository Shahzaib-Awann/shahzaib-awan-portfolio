import ProjectsFilter from "@/components/pages/projects/filters";
import GithubContributionsStats from "@/components/pages/projects/github-contributions";
import ProjectsPagination from "@/components/pages/projects/paginations";
import ProjectsShowcaseGrid from "@/components/pages/projects/showcase-grid";
import { BackgroundPattern } from "@/components/ui/background-pattern";
import { getAllProjects } from "@/lib/actions/projects";
import { db } from "@/lib/db";
import Link from "next/link";
import { technologies as technologiesSchema } from '@/lib/db/schema';


type SearchParams = {
  page?: string;
  pageSize?: string;
  search?: string;
  category?: string;
  technology?: string;
  sort?: "latest" | "oldest";
};

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  // Resolve incoming query parameters
  const params = await searchParams;

  // Normalize and assign default values for query params
  const search = params.search ?? "";
  const category = params.category ?? "";
  const technology = params.technology ?? "";
  const page = Number(params.page ?? 1);
  const pageSize = Number(params.pageSize ?? 20);
  const sort = params.sort ?? "latest";

  // Fetch projects from server with filters and pagination
  const projects = await getAllProjects({
    search,
    category,
    technology,
    page,
    pageSize,
    mode: "public",
    sortBy: sort,
  });

  const technologies = await db.select().from(technologiesSchema);



  console.log(technologies);

  // Handle API failure state
  if (!projects.success) {
    return <div>Something went wrong while loading projects.</div>;
  }

  return (
    <div
      id="projects"
      className="relative h-full scroll-mt-10 overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="relative w-full h-full py-25">
        {/* Grid Background Pattern */}
        <BackgroundPattern />

        {/* Main container */}
        <div className="container mx-auto px-6 pt-25 relative z-10 space-y-20 ">
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
          <ProjectsFilter technologies={technologies} initialQuery={{ search, category, technology }} />

          <ProjectsShowcaseGrid projects={projects.data} mode="public" />

          <ProjectsPagination
            currentPage={projects.pagination.page}
            totalPages={projects.pagination.totalPages}
            pageSize={projects.pagination.pageSize}
          />
        </div>
      </div>

      <GithubContributionsStats />
    </div>
  );
};

export default ProjectsPage;
