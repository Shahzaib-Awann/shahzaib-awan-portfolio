"use server";

import { and, countDistinct, desc, eq, ilike, or, SQL } from "drizzle-orm";
import { db } from "../db";
import { schemas } from "../db/schema";
import { Categories, ProjectCard, ProjectDetailViewInterface, ProjectsResponse } from "../definations";



const { projects, projectGalleryImages, projectTechnologies, technologies } = schemas;


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

// For fetch the featured projects for main landing page project section
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

// For /project/[slug] page 
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


/**
 * Fetch all projects with their associated technologies (ui cards)
 */
export const getAllProjects = async ({
  search = "",
  category = "",
  technology = "",
  page = 1,
  pageSize = 20,
  mode = "public",
  sortBy = "latest",
}: {
  search?: string;
  category?: string;
  technology?: string;
  page?: number;
  pageSize?: number;
  mode?: "public" | "admin";
  sortBy?: "latest" | "oldest";
}): Promise<ProjectsResponse<ProjectCard[]>> => {
  const conditions: SQL[] = [];

  // Build search condition
  if (search.trim()) {
    const searchCondition = or(
      ilike(projects.title, `%${search}%`),
      ilike(projects.shortSummary, `%${search}%`),
      ilike(projects.slug, `%${search}%`)
    );
  
    if (searchCondition) {
      conditions.push(searchCondition);
    }
  }

  // Filter by category (validated)
  const allowedCategories = ["frontend", "backend", "fullstack"] as const;

  if (category && allowedCategories.includes(category as Categories)) {
    conditions.push(eq(projects.category, category as Categories));
  }

  // Restrict unpublished projects in public mode
  if (mode === "public") {
    conditions.push(eq(projects.isPublished, true));
  }

  // Filter by technology name
  if (technology.trim()) {
    conditions.push(eq(technologies.name, technology));
  }

  const whereClause = conditions.length ? and(...conditions) : undefined;

  // Count total matching records for pagination
  const [{ count }] = await db
    .select({ count: countDistinct(projects.id) })
    .from(projects)
    .leftJoin(
      projectTechnologies,
      eq(projectTechnologies.projectId, projects.id)
    )
    .leftJoin(
      technologies,
      eq(technologies.id, projectTechnologies.technologyId)
    )
    .where(whereClause);

  const totalItems = Number(count || 0);
  const totalPages = Math.ceil(totalItems / pageSize);

  // Define sorting order
  const orderByClause =
    sortBy === "oldest"
      ? projects.createdAt
      : desc(projects.createdAt);

  const offset = (page - 1) * pageSize;

  // Fetch paginated project data with joined technologies
  const rows = await db
    .select({
      project: projects,
      techName: technologies.name,
    })
    .from(projects)
    .leftJoin(
      projectTechnologies,
      eq(projectTechnologies.projectId, projects.id)
    )
    .leftJoin(
      technologies,
      eq(technologies.id, projectTechnologies.technologyId)
    )
    .where(whereClause)
    .orderBy(orderByClause)
    .limit(pageSize)
    .offset(offset);

  // Group projects and aggregate technologies
  const projectMap = new Map<string, ProjectCard>();

  for (const row of rows) {
    const project = row.project;
    const techName = row.techName;

    let existing = projectMap.get(project.id);

    if (!existing) {
      existing = {
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

      projectMap.set(project.id, existing);
    }

    // Avoid duplicate technologies
    if (techName && !existing.technologies.includes(techName)) {
      existing.technologies.push(techName);
    }
  }

  // Return structured response
  return {
    success: true,
    data: Array.from(projectMap.values()),
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages,
    },
    filters: {
      search,
      category,
      technology,
      sortBy,
    },
  };
};