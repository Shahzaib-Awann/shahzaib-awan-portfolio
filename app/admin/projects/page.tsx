// app/admin/projects/page.tsx
import Link from "next/link";
import ProjectsShowcaseGrid from "@/components/pages/projects/showcase-grid";
import { getAllProjects } from "@/lib/actions/projects";

const ProjectsPage = async () => {
  const projects = await getAllProjects();

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

      {/* Empty State */}
      {projects.length === 0 ? (
        <div className="text-center text-muted-foreground py-20">
          No projects found.
        </div>
      ) : (
        <ProjectsShowcaseGrid projects={projects} mode="admin" />
      )}
    </div>
  );
};

export default ProjectsPage;