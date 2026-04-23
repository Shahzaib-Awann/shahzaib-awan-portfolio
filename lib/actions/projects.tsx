"use server";

import { db } from "../db";
import { schemas } from "../db/schema";
import { ProjectInterface } from "../definations";

const { projects, projectImages, projectTechnologies } = schemas;

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
        }))
      );
    }

    // insert technologies
    if (data.technologies?.length) {
      await tx.insert(projectTechnologies).values(
        data.technologies.map((tech) => ({
          projectId: project.id,
          technologyId: tech.id,
        }))
      );
    }

    return {
      id: project.id,
      slug: project.slug,
    };
  });
};