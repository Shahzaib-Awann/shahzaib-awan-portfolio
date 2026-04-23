"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { schemas } from "../db/schema";
import { ProjectCard, ProjectInterface } from "../definations";



const { projects, projectImages, projectTechnologies, technologies } = schemas;



/**
 * Create a new project with images and technologies in a single transaction
 */
export const insertNewProject = async (data: ProjectInterface) => {
  return db.transaction(async (tx) => {
    // insert main project
    const [project] = await tx
      .insert(projects)
      .values({
        ...data,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
      })
      .returning();

    // insert images
    if (data.projectImages?.length) {
      await tx.insert(projectImages).values(
        data.projectImages.map((img) => ({
          projectId: project.id,
          url: img.imageUrl,
          fileId: img.fileId ?? null,
        })),
      );
    }

    // insert technologies
    if (data.technologies?.length) {
      await tx.insert(projectTechnologies).values(
        data.technologies.map((tech) => ({
          projectId: project.id,
          technologyId: tech.id,
        })),
      );
    }

    return {
      id: project.id,
      slug: project.slug,
    };
  });
};



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
        mainImage: project.mainImage,
        shortDescription: project.shortDescription,
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
