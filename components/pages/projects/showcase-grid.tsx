"use client";

import { ProjectCard } from "@/lib/definations";
import { ExternalLink, Eye, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";

const ProjectsShowcaseGrid = ({ projects = [], mode = 'public' }: { projects: ProjectCard[]; mode?: 'admin' | 'public' }) => {

  // Tracks which cards have expanded tech stacks
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  /**
   * Toggle expand/collapse for tech stack
   */
  const toggleExpand = useCallback((index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // collapse
        : [...prev, index] // expand
    );
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 space-y-10 items-start">
      {projects?.map((project, index) => {

          const slug = `/projects/${project.slug}`
          const editProjectLink = `/admin/projects/edit/${project.id}`

          // Check if current card is expanded
          const isExpanded = expandedIndexes.includes(index);

          // Show full or partial tech stack
          const visibleTech = isExpanded
            ? project.technologies
            : project.technologies.slice(0, 3);

          // Count remaining hidden tech items
          const remaining = Math.max(project.technologies.length - 3, 0);

          return (
            <div
              key={index}
              className="bg-card hover:bg-card-hover group border border-black/10 hover:border-black/40 rounded-2xl overflow-hidden transition-all duration-300 shadow hover:shadow-md hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative w-full overflow-hidden aspect-video">
                
                {/* Project Image */}
                <Image
                  src={safeImage(project.mainImage)}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />


                {/* Project Index Badge */}
                <span className="absolute top-5 left-5 bg-black text-white text-sm px-2 py-1 rounded-md z-10">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                {/* Category Badge */}
                <span className="absolute top-5 right-5 bg-black text-white text-sm px-2 py-1 rounded-md z-10">
                  {project.category}
                </span>

                {/* Hover Action Buttons */}
                <div className="absolute z-10 bottom-5 right-5 opacity-0 translate-y-20 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex gap-2">
                  
                  {/* View Link */}
                  <Link
                    href={slug}
                    title="View Project Details"
                    className="p-3 rounded border border-black/20 bg-black/75 hover:bg-black transition"
                  >
                    <Eye className="size-5 text-white" />
                  </Link>
                  
                  {/* GitHub Link */}
                  {project.githubUrl &&
                    <Link
                    href={project.githubUrl}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    title="View on Github"
                    className="p-3 rounded border border-black/20 bg-black/75 hover:bg-black transition"
                  >
                    <FaGithub className="size-5 text-white" />
                  </Link>
                  }

                  {/* Live Preview Link */}
                  {project.liveUrl &&
                    <Link
                    href={project.liveUrl}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    title="View Live Demo"
                    className="p-3 rounded border border-black/20 bg-black/75 hover:bg-black transition"
                    >
                    <ExternalLink className="size-5 text-white" />
                  </Link>
                  }

                  {mode === 'admin' && 
                  <Link
                  href={editProjectLink}
                  onClick={(e) => e.stopPropagation()}
                  title="Edit This Project"
                  className="p-3 rounded border border-black/20 bg-black/75 hover:bg-black transition"
                >
                  <Pencil className="size-5 text-white" />
                </Link>
                  }
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5 sm:p-6 space-y-5">
                
                {/* Project Title */}
                <Link href={slug} className="space-y-5 block">
                <h3 title={project.title} className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-semibold text-foreground line-clamp-2">
                  {project.title || 'N/A'}
                </h3>

                {/* Project Description */}
                <p title={project.shortDescription} className="text-muted-foreground text-base leading-relaxed line-clamp-5 sm:line-clamp-3 md:line-clamp-5">
                  {project.shortDescription || 'N/A'}
                </p>
                </Link>

                {/* Tech Stack Section */}
                <div className="flex flex-wrap items-center gap-2 border-t border-black/25 pt-5 mt-5">
                  
                  {/* Visible Tech Tags */}
                  {visibleTech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="whitespace-nowrap rounded-full border border-black/40 px-3 py-1 text-xs text-black"
                    >
                      {tech}
                    </span>
                  ))}

                  {/* Expand / Collapse Button */}
                  {remaining > 0 && (
                    <button
                      onClick={() => {
                        toggleExpand(index);
                      }}
                      className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs transition ${
                        isExpanded
                          ? "border-black text-black hover:bg-black hover:text-white"
                          : "border-black bg-black text-white hover:bg-black/80"
                      }`}
                    >
                      {isExpanded ? "show less" : `+${remaining} more`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

const safeImage = (src?: string | null) => {
  if (!src || src === "") {
    return "https://placehold.co/600x400.png";
  }

  if (src.startsWith("http")) return src;

  return "https://placehold.co/600x400.png";
};

export default ProjectsShowcaseGrid;