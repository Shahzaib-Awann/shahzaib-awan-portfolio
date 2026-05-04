// app/admin/projects/page.tsx
import Link from "next/link";
import ProjectsShowcaseGrid from "@/components/pages/projects/showcase-grid";
import { getAllProjects } from "@/lib/actions/projects";
import ProjectsFilter from "@/components/pages/projects/filters";
import ProjectsPagination from "@/components/pages/projects/paginations";

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
    mode: "admin",
    sortBy: sort,
  });

  // Handle API failure state
  if (!projects.success) {
    return <div>Something went wrong while loading projects.</div>;
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>

        <Link
          href="/admin/projects/add"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition"
        >
          + Add Project
        </Link>
      </div>

      {/* Filter component */}
      <ProjectsFilter initialQuery={{ search, category, technology }} />

      {/* Empty State */}
      {projects.pagination.totalItems > 0 ? (
        <ProjectsShowcaseGrid projects={projects.data} mode="admin" />
      ) : (
        <div className="text-center text-muted-foreground py-20">
          No projects found.
        </div>
      )}

      <ProjectsPagination
        currentPage={projects.pagination.page}
        totalPages={projects.pagination.totalPages}
        pageSize={projects.pagination.pageSize}
      />
    </div>
  );
};

export default ProjectsPage;
