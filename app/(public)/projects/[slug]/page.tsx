import { BackgroundPattern } from "@/components/ui/background-pattern";
import LexicalViewer from "@/components/widgets/text-editor/LexicalViewer";
import { loadProjectBySlug } from "@/lib/actions/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProjectGallery from "./project-gallery";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProjectViewPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const project = await loadProjectBySlug(slug);

  console.log(project);

  if (!project) return notFound();

  return (
    <div className="relative h-full scroll-mt-10 overflow-hidden flex flex-col justify-center items-center">
      <div className="relative w-full h-full py-25 space-y-10">
        {/* Grid Background Pattern */}
        <BackgroundPattern />

        {/* Top (heading + subheading) */}
        <div className="container mx-auto px-6 pt-25 relative z-10 flex flex-col items-center gap-5">
          <h1 className="text-3xl sm:text-4xl md:text-8xl uppercase font-bold tracking-tight text-foreground text-center transition-all duration-300">
            {project.title}
          </h1>

          <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-3xl text-center">
            {project.shortSummary}
          </p>
        </div>

        <div className="bg-black py-25 z-10">
          <div className="relative w-full mx-auto h-auto aspect-video rounded-2xl max-w-6xl">
            <ProjectGallery
              className="max-w-6xl"
              images={[project.coverImage, ...(project.galleryImages ?? [])]}
            />
          </div>
        </div>

        <div className="w-full">
          {/* Main container */}
          <div className="container mx-auto px-6 relative z-10 space-y-20">
            {/* Header section (title + description) */}
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-10">
              {/* Left side (heading + subheading) */}
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-3xl sm:text-4xl md:text-6xl uppercase font-semibold tracking-tight text-foreground  transition-all duration-300">
                  Description
                </h2>

                <p className="mt-4 text-lg lg:text-xl text-muted-foreground">
                  Simple ideas, powerful execution
                </p>
              </div>

              {/* Right side description */}
              <p className="text-muted-foreground text-center max-w-md md:text-right leading-relaxed">
                Turning ideas into scalable, high-performance digital
                experiences with precision and purpose.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-5 shadow border border-black/5">
              {/* Services grid */}
              <LexicalViewer value={project.fullDescription} />
            </div>
          </div>
        </div>

        <div className="bg-black py-25">
          <div className="container mx-auto px-6">
            {/* Header section (title + description) */}
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-10">
              {/* Left side (heading + subheading) */}
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-3xl sm:text-4xl md:text-6xl text-white uppercase font-semibold tracking-tight  transition-all duration-300">
                  Gallery
                </h2>

                <p className="mt-4 text-lg lg:text-xl text-white/75">
                  Simple ideas, powerful execution
                </p>
              </div>

              {/* Right side description */}
              <p className="text-muted-foreground text-center text-white/50 max-w-md md:text-right leading-relaxed">
                Turning ideas into scalable, high-performance digital
                experiences with precision and purpose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectViewPage;
