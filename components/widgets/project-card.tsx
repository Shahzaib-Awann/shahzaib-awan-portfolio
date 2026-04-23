"use client";

import { ProjectInterface0 } from "@/lib/definations";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Props {
    projects: ProjectInterface0[];
}

const ProjectCards = ({ projects = [] }: Props) => {
    return (
        <>
            <div className="hidden lg:grid grid-cols-3 gap-4">

                {/* Desktop Grid Layout */}
                {projects.map((project, index) => {

                    // Pattern logic for alternating layout
                    const patternIndex = index % 4;
                    const isVideo = patternIndex === 0 || patternIndex === 3;

                    // Fallback image
                    const FallbackImage =
                        project.image ||
                        "/assets/shahzaib-awan-portfolio-hero-image.png";

                    return (
                        <Link
                            key={project.id}
                            href={`/project/${project.slug}`}
                            className={`relative group w-full ${isVideo ? "col-span-2 aspect-video" : "col-span-1 h-full"
                                }`}
                        >
                            {/* Card container */}
                            <div className="w-full h-full rounded-2xl overflow-hidden border border-white/20 bg-foreground transition-all duration-500 group-hover:border-white/40">
                                {/* Project index badge */}
                                <span className="absolute z-10 top-6 left-6 text-white px-2 py-1 bg-foreground rounded-md text-xs">
                                    {(index + 1).toString().padStart(2, "0")}
                                </span>

                                {/* Project image */}
                                <div className="relative w-full h-full">
                                    <Image
                                        src={FallbackImage}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Hover overlay content */}
                                <OverlayContent project={project} />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Mobile / Tablet Layout  */}
            <div className="flex flex-col gap-6 lg:hidden">
                {projects.map((project, index) => {

                    // Alternate row direction for visual variety
                    const isReverse = index % 2 !== 0;

                    // Fallback image
                    const FallbackImage =
                        project.image ||
                        "/assets/shahzaib-awan-portfolio-hero-image.png";

                    return (
                        <Link
                            key={project.id}
                            href={`/project/${project.slug}`}
                            className={`flex flex-col sm:flex-row ${isReverse ? "sm:flex-row-reverse" : ""
                                } group rounded-2xl overflow-hidden border border-white/20 bg-foreground`}
                        >
                            {/* Image */}
                            <div className="relative w-full sm:w-1/2 h-48 sm:h-auto overflow-hidden">
                                <Image
                                    src={FallbackImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-between w-full sm:w-1/2 p-5 sm:p-6">

                                {/* Top row: index + icon */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white/70">
                                        {(index + 1).toString().padStart(2, "0")}
                                    </span>

                                    <ArrowUpRight className="size-5 text-white/70 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1" />
                                </div>

                                {/* Title + description */}
                                <div className="mt-4">
                                    <h3 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-semibold mt-6 text-white line-clamp-2 transition-all duration-300 group-hover:translate-x-2">
                                        {project.title}
                                    </h3>

                                    <p className="mt-2 text-base text-white/70 line-clamp-3">
                                        {project.shortDesc}
                                    </p>
                                </div>

                                {/* Technology tags */}
                                <ProjectTags techs={project.technologies} />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

// Overlay Content (Desktop Hover State)
const OverlayContent = ({ project }: { project: ProjectInterface0 }) => (
    <div className="flex absolute inset-0 flex-col justify-between p-6 sm:p-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-black/60 text-white">
        {/* Top-right arrow icon */}
        <div className="flex items-center justify-end">
            <ArrowUpRight className="size-6 transition-transform duration-500  group-hover:rotate-45 translate-x-1" />
        </div>

        {/* Title + description */}
        <div className="mt-0">
            <h3 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-semibold mt-6 line-clamp-2">
                {project.title}
            </h3>
            <p
                title={project.shortDesc}
                className="mt-2 text-base leading-relaxed line-clamp-2 md:line-clamp-3 lg:line-clamp-3 xl:line-clamp-5"
            >
                {project.shortDesc}
            </p>
        </div>

        {/* Technology tags */}
        <ProjectTags techs={project.technologies} />
    </div>
);

// Technologies/tags list
const ProjectTags = ({ techs }: { techs: string[] }) => {
    const visible = techs.slice(0, 3);
    const remaining = techs.length - 3;

    return (
        <div className="mt-auto flex flex-wrap items-center gap-2 overflow-hidden pt-4">
            {visible.map((tech, i) => (
                <span
                    key={i}
                    className="whitespace-nowrap rounded-full border border-white/30 px-3 py-1 text-sm text-white"
                >
                    {tech}
                </span>
            ))}

            {remaining > 0 && (
                <span className="whitespace-nowrap rounded-full border border-white/30 px-3 py-1 text-sm text-white">
                    +{remaining} more
                </span>
            )}
        </div>
    );
};

export default ProjectCards;
