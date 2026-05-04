import { BackgroundPattern } from "@/components/ui/background-pattern";
import LexicalViewer from "@/components/widgets/text-editor/LexicalViewer";
import { loadProjectBySlug } from "@/lib/actions/projects";
import { notFound } from "next/navigation";
import ProjectGallery from "./project-gallery";
import { ExternalLink, User } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProjectViewPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  // const project = await loadProjectBySlug(slug);

  const project = {
    id: "f4081cb0-365a-4cce-8caf-726b4b191ea7",
    slug: "nextbot-ai-chatbot",
    coverImage:
      "https://ik.imagekit.io/shahzaibawan/portfolio/projects/1777716213883-umar.is-a.dev_admin_FYxAkjVoz.png",
    title: "Nextbot Chatbot",
    shortSummary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda exercitationem accusamus voluptatum doloremque est dolor quaerat! Officiis neque obcaecati ut ex quas sequi suscipit laborum quasi, ab ipsa aperiam quibusdam optio? Provident, odio nam. Aspernatur quaerat laborum, ad quas nihil inventore libero magni vel ut minima alias facilis, sit deleniti?",
    fullDescription: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "h1",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "heading",
            version: 1,
            tag: "h1",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "h2",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "heading",
            version: 1,
            tag: "h2",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "h3",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "heading",
            version: 1,
            tag: "h3",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "h4",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "heading",
            version: 1,
            tag: "h4",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "h5",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "heading",
            version: 1,
            tag: "h5",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "h6",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "heading",
            version: 1,
            tag: "h6",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "paragraph",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [
              {
                detail: 0,
                format: 1,
                mode: "normal",
                style: "",
                text: "Bold",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 1,
            textStyle: "",
          },
          {
            children: [
              {
                detail: 0,
                format: 2,
                mode: "normal",
                style: "",
                text: "Italic",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 2,
            textStyle: "",
          },
          {
            children: [
              {
                detail: 0,
                format: 8,
                mode: "normal",
                style: "",
                text: "Underline",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 8,
            textStyle: "",
          },
          {
            children: [
              {
                detail: 0,
                format: 4,
                mode: "normal",
                style: "",
                text: "Strikethrough",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 4,
            textStyle: "",
          },
          {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "number1",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "listitem",
                version: 1,
                value: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "number2",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "listitem",
                version: 1,
                value: 2,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "list",
            version: 1,
            listType: "bullet",
            start: 1,
            tag: "ul",
          },
          {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "number1",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "listitem",
                version: 1,
                value: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "number2",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "listitem",
                version: 1,
                value: 2,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "list",
            version: 1,
            listType: "number",
            start: 1,
            tag: "ol",
          },
          {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "link",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 1,
                rel: "noreferrer",
                target: null,
                title: null,
                url: "https://google.com",
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [
              {
                detail: 0,
                format: 16,
                mode: "normal",
                style: "",
                text: 'console.log("Hello world");',
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 16,
            textStyle: "",
          },
          {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 16,
            textStyle: "",
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "a = 10",
                type: "text",
                version: 1,
              },
              {
                type: "linebreak",
                version: 1,
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "print(a)",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "code",
            version: 1,
          },
          {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
          {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    },
    category: "fullstack",
    githubUrl: "http://Github:3000/admin/projects/add",
    liveUrl: "http://Live-url:3000/admin/projects/add",
    isFeatured: true,
    isPublished: true,
    startDate: "2026-05-02T10:03:41.331Z",
    endDate: "2026-06-02T10:03:41.331Z",
    client: "Personal",
    teamSize: 1,
    createdAt: "2026-05-02T10:03:41.237Z",
    updatedAt: "2026-05-02T10:03:41.331Z",
    galleryImages: [
      "https://ik.imagekit.io/shahzaibawan/portfolio/projects/1777716217395-7e46c6d2798eff446b365c5246f4c9ca__JY5oiFuh.jpg",
    ],
    technologies: ["React.js", "Next.js", "Tailwind CSS"],
  };

  // console.log(project);

  if (!project) return notFound();

  return (
    <div className="relative h-full scroll-mt-10 flex flex-col justify-center items-center">
      {/* Grid Background Pattern */}
      <BackgroundPattern />

      <div className="container mx-auto flex gap-10">
         {/* LEFT CONTENT */}
    <div className="flex-2 py-25 flex flex-col gap-14">

{/* 🧊 CONTENT SURFACE WRAPPER */}
<div className="relative">

  {/* Soft blur wash behind content */}
  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl" />

  {/* actual content */}
  <div className="relative z-10 flex flex-col gap-10 p-8">

    {/* ───── HERO GALLERY ───── */}
    <div className="w-full max-w-6xl mx-auto">
      
        <ProjectGallery
          className="w-full"
          images={[
            project.coverImage,
            ...(project.galleryImages ?? []),
          ]}
        />
    </div>

    {/* ───── TITLE + SUMMARY ───── */}
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-black">
        {project.title}
      </h1>

      <div className="w-full h-[2px] bg-linear-to-l from-transparent via-black to-transparent opacity-25" />

      <p className="text-base md:text-lg text-black/70 leading-relaxed">
        {project.shortSummary}
      </p>

      <div className="w-full h-[2px] bg-linear-to-l from-transparent via-black to-transparent opacity-25" />

    {/* ───── DESCRIPTION ───── */}
    <div className="max-w-5xl">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-black">
          Description
        </h2>
      </div>

      <div className="prose prose-neutral max-w-none text-black/80">
        <LexicalViewer value={project.fullDescription} />
      </div>
    </div>

  </div>
</div>

</div>

        <div className="relative flex-1 min-w-100 h-full bg-black py-25">
          <div className="bg-transparent rounded-2xl p-6 h-fit sticky top-28 space-y-5">
            {/* ───── HEADER ───── */}
            <div className="space-y-5 group">
              <GroupHeadings heading="Overview" />

              {/* ───── MAIN INFO CARD ───── */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl space-y-6">
                {/* CLIENT */}
                <InfoItem label="Client" value={project.client} />

                {/* CATEGORY */}
                <InfoItem label="Category" value={project.category} />

                {/* TEAM */}
                <InfoItem label="Team Size" value={`${project.teamSize}`} />
              </div>
            </div>

            {(project.startDate || project.endDate) && (
              <div className="group space-y-5">
                <GroupHeadings heading="Duration" />

                {/* ───── MAIN INFO CARD ───── */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
                  {/* CLIENT */}
                  {project.startDate && (
                    <div className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <span className="text-white/75 text-sm">Start</span>
                      <span className="text-white font-medium text-sm text-right">
                        {formatDate(project.startDate)}
                      </span>
                    </div>
                  )}

                  {project.endDate && (
                    <div className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <span className="text-white/75 text-sm">End</span>
                      <span className="text-white font-medium text-sm text-right">
                        {formatDate(project.endDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {project.technologies?.length > 0 && (
              <div className="group space-y-5">
                <GroupHeadings heading="Tech&nbsp;Stack" />

                {/* ───── MAIN INFO CARD ───── */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <Link
                      href={`/projects?technology=${tech}`}
                      key={tech}
                      className="px-3 py-1.5 text-xs border border-white/20 text-white/75 rounded-full hover:bg-white hover:text-black transition-all"
                    >
                      {tech}
                    </Link>
                  ))}
                  
                </div>
              </div>
            )}

            {(project.githubUrl || project.liveUrl) && (
              <div className="group space-y-5">
                <GroupHeadings heading="Links" />

                {/* ───── MAIN INFO CARD ───── */}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="w-full flex flex-row items-center justify-center gap-2 text-center py-3 bg-white text-black text-sm font-medium rounded-none hover:opacity-90 transition"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </Link>
                )}

                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="w-full flex flex-row items-center justify-center gap-2 text-center py-3 border border-white text-white text-sm rounded-non hover:bg-white hover:text-black transition"
                  >
                    <FaGithub size={16} /> View Code
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <span className="text-white/75 text-sm">{label}</span>
      <span className="text-white font-medium text-sm text-right capitalize">
        {value == "fullstack" ? "Full Stack" : value}
      </span>
    </div>
  );
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

const GroupHeadings = ({ heading }: { heading: string }) => (
  <div className="flex items-center justify-between gap-5">
    <h3 className="text-white md:text-white text-lg sm:text-xl md:text-2xl uppercase font-semibold tracking-tight transition-all duration-300">
      {heading}
    </h3>

    <div className="flex flex-col w-full items-end justify-between gap-2 h-full">
      <div
        className={`w-1 h-px bg-white/20 group-hover:w-1/3 group-hover:bg-white/50 transition-all duration-500`}
      />
      <div className="w-10 h-px bg-white/20 group-hover:w-1/2 group-hover:bg-white/50 transition-all duration-500" />
      <div className="w-2 h-px bg-white/20 group-hover:w-1/4 group-hover:bg-white/50 transition-all duration-500" />
    </div>
  </div>
);
export default ProjectViewPage;
