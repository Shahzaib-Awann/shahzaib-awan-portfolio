"use server";

import { and, desc, eq } from "drizzle-orm";
import { db } from "../db";
import { schemas } from "../db/schema";
import { ProjectDetailViewInterface } from "../definations";



const { projects, projectGalleryImages, projectTechnologies, technologies } = schemas;



/**
 * Fetch all projects with their associated technologies (ui cards)
 */
export const getAllProjects = async () => {
  const rows = await db
    .select({
      project: projects,
      techName: technologies.name,
    })
    .from(projects)
    .leftJoin(
      projectTechnologies,
      eq(projectTechnologies.projectId, projects.id),
    )
    .leftJoin(
      technologies,
      eq(technologies.id, projectTechnologies.technologyId),
    )
    .orderBy(desc(projects.createdAt));

  const projectMap = new Map<string, any>();

  for (let i = 0; i < rows.length; i++) {
    const { project, techName } = rows[i];
    const projectId = project.id;

    let current = projectMap.get(projectId);

    // Initialize project entry once
    if (!current) {
      current = {
        id: project.id,
        slug: project.slug,
        title: project.title,
        coverImage: project.coverImageUrl,
        shortSummary: project.shortSummary,
        category: project.category,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        technologies: [],
      };

      projectMap.set(projectId, current);
    }

    // Add unique technology names only
    if (techName && !current.technologies.includes(techName)) {
      current.technologies.push(techName);
    }
  }

  return Array.from(projectMap.values());
};


export const getProjectForEdit = async (id: string) => {
  try {
    const [baseProject] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));

    const pTechnologies = await db
      .select({ id: projectTechnologies.technologyId })
      .from(projectTechnologies)
      .where(eq(projectTechnologies.projectId, id));

    const images = await db
      .select({
        imageUrl: projectGalleryImages.imageUrl,
        fileId: projectGalleryImages.fileId,
      })
      .from(projectGalleryImages)
      .where(eq(projectGalleryImages.projectId, id));

    if (!baseProject) return null;

    const formattedProject = {
      ...baseProject,
      galleryImages: images ?? [],
      technologies: pTechnologies ?? [],
    };

    console.log("Final Project:", formattedProject);

    return formattedProject;
  } catch (e) {
    console.error("Error while fetching the project for edit: ", e);
  }
};

export const getFeaturedProjects = async () => {
  try {
    const rows = await db
    .select({
      project: projects,
      techName: technologies.name,
    })
    .from(projects)
    .leftJoin(
      projectTechnologies,
      eq(projectTechnologies.projectId, projects.id),
    )
    .leftJoin(
      technologies,
      eq(technologies.id, projectTechnologies.technologyId),
    )
    .where(and(eq(projects.isFeatured, true), eq(projects.isPublished, true)))
    .orderBy(desc(projects.createdAt))
    .limit(4)

  const projectMap = new Map<string, any>();

  for (let i = 0; i < rows.length; i++) {
    const { project, techName } = rows[i];
    const projectId = project.id;

    let current = projectMap.get(projectId);

    // Initialize project entry once
    if (!current) {
      current = {
        id: project.id,
        slug: project.slug,
        title: project.title,
        coverImage: project.coverImageUrl,
        shortSummary: project.shortSummary,
        category: project.category,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        technologies: [],
      };

      projectMap.set(projectId, current);
    }

    // Add unique technology names only
    if (techName && !current.technologies.includes(techName)) {
      current.technologies.push(techName);
    }
  }

  return Array.from(projectMap.values());
  } catch (e) {
    console.error("Error in [getProjects]: ", e)
  }
}

export const loadProjectBySlug = async (slug: string): Promise<ProjectDetailViewInterface> => {
  try {
    const [baseProject] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.slug, slug), eq(projects.isPublished, true)));

    if (!baseProject) {
      throw new Error("Project Not found");
    };

    const pTechnologies = await db
      .select({
        name: technologies.name,
      })
      .from(projectTechnologies)
      .innerJoin(
        technologies,
        eq(projectTechnologies.technologyId, technologies.id)
      )
      .where(eq(projectTechnologies.projectId, baseProject.id));

    const images = await db
      .select({
        imageUrl: projectGalleryImages.imageUrl,
      })
      .from(projectGalleryImages)
      .where(eq(projectGalleryImages.projectId, baseProject.id));

    const formattedProject = {
      id: baseProject.id,
      slug: baseProject.slug,
      coverImage: baseProject.coverImageUrl,
      title: baseProject.title,
      shortSummary: baseProject.shortSummary,
      fullDescription: baseProject.fullDescription,
      category: baseProject.category,
      githubUrl: baseProject.githubUrl,
      liveUrl: baseProject.liveUrl,
      isFeatured: baseProject.isFeatured,
      isPublished: baseProject.isPublished,
      startDate: baseProject.startDate ?? null,
      endDate: baseProject.endDate ?? null,
      client: baseProject.client ?? "Personal",
      teamSize: baseProject.teamSize ?? 1,
      createdAt: baseProject.createdAt.toISOString(),
      updatedAt: baseProject.updatedAt?.toISOString() ?? null,

      // transformed fields
      galleryImages: images.map((img) => img.imageUrl),
      technologies: pTechnologies.map((tech) => tech.name),
    };

    return formattedProject;
  } catch (e) {
    console.error("Error in [loadProjectBySlug]: ", e);
    return null;
  }
};