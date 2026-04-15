"use client";

import { ExternalLink, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";


const ProjectsShowcaseGrid = () => {

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
      {Array(1)
        .fill(null)
        .map((_, index) => {
          // Mock data (replace with real data later)
          const image = "https://placehold.co/600x400.png";
          const category = "Full-Stack";
          const title = `Title - ${index+1}`;
          const techStack = ["nextjs", "reactjs", "book", "hooks"];

          const slug = `/projects/${index}`

          // Check if current card is expanded
          const isExpanded = expandedIndexes.includes(index);

          // Show full or partial tech stack
          const visibleTech = isExpanded
            ? techStack
            : techStack.slice(0, 3);

          // Count remaining hidden tech items
          const remaining = Math.max(techStack.length - 3, 0);

          return (
            <div
              key={index}
              className="bg-card hover:bg-card-hover group border border-black/10 hover:border-black/40 rounded-2xl overflow-hidden transition-all duration-300 shadow hover:shadow-md hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative w-full overflow-hidden aspect-video">
                
                {/* Project Image */}
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />


                {/* Project Index Badge */}
                <span className="absolute top-5 left-5 bg-black text-white text-sm px-2 py-1 rounded-md z-10">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                {/* Category Badge */}
                <span className="absolute top-5 right-5 bg-black text-white text-sm px-2 py-1 rounded-md z-10">
                  {category}
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
                  <Link
                    href="#"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    title="View on Github"
                    className="p-3 rounded border border-black/20 bg-black/75 hover:bg-black transition"
                  >
                    <FaGithub className="size-5 text-white" />
                  </Link>

                  {/* Live Preview Link */}
                  <Link
                    href="#"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    title="View Live Demo"
                    className="p-3 rounded border border-black/20 bg-black/75 hover:bg-black transition"
                  >
                    <ExternalLink className="size-5 text-white" />
                  </Link>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5 sm:p-6 space-y-5">
                
                {/* Project Title */}
                <Link href={slug} className="space-y-5 block">
                <h3 title={title} className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-semibold text-foreground line-clamp-2">
                  {title}
                </h3>

                {/* Project Description */}
                <p className="text-muted-foreground text-base leading-relaxed line-clamp-5 sm:line-clamp-3 md:line-clamp-5">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error cupiditate, nesciunt deserunt corporis, enim quibusdam consectetur itaque omnis corrupti minus non labore voluptatibus sit voluptas cumque, repellat qui asperiores soluta magnam numquam ipsam officiis repellendus ea aliquam! Rem consectetur ipsum nisi illum minus aspernatur dolore et sed! Quasi, unde necessitatibus.
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

export default ProjectsShowcaseGrid;