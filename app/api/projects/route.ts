import { NextRequest, NextResponse } from "next/server";
import { projectJsonSchema } from "@/lib/zod/schema";
import { uploadFile, deleteFile } from "@/lib/actions/upload-imagekit";
import { db } from "@/lib/db";
import {
  projects,
  projectGalleryImages,
  projectTechnologies,
} from "@/lib/db/schema";
import { and, eq, inArray } from "drizzle-orm";

const imageUploadPath = "/portfolio/projects";

export async function POST(req: NextRequest) {
  let mainFileId: string | null = null;
  const uploadedFileIds: string[] = [];

  try {
    const formData = await req.formData();

    // =========================
    // 1. Extract form data
    // =========================
    const jsonData = formData.get("data");
    const coverImage = formData.get("coverImage");
    const galleryImages = formData.getAll("galleryImages");

    // =========================
    // 2. Validate JSON payload
    // =========================
    if (typeof jsonData !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const parsed = projectJsonSchema.safeParse(JSON.parse(jsonData));

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 422 },
      );
    }

    const data = parsed.data;

    // =========================
    // 3. Validate cover image
    // =========================
    if (!(coverImage instanceof File) || coverImage.size === 0) {
      return NextResponse.json(
        { error: "Main image is required" },
        { status: 400 },
      );
    }

    // =========================
    // 4. Upload cover image
    // =========================
    const mainUpload = await uploadFile(coverImage, imageUploadPath);

    if (!mainUpload?.url || !mainUpload?.fileId) {
      throw new Error("Main image upload failed");
    }

    mainFileId = mainUpload.fileId;

    // =========================
    // 5. Upload gallery images
    // =========================
    const uploadedImages = await Promise.all(
      galleryImages.map(async (file) => {
        if (!(file instanceof File) || file.size === 0) return null;

        const upload = await uploadFile(file, imageUploadPath);

        if (upload?.fileId) {
          uploadedFileIds.push(upload.fileId);
        }

        return {
          imageUrl: upload.url!,
          fileId: upload.fileId ?? null,
        };
      }),
    );

    const cleanImages = uploadedImages.filter(
      (img): img is { imageUrl: string; fileId: string | null } => img !== null,
    );

    // =========================
    // 6. DB Transaction
    // =========================
    const result = await db.transaction(async (tx) => {
      // ---- Insert Project ----
      const [project] = await tx
        .insert(projects)
        .values({
          slug: data.slug,
          title: data.title,
          shortSummary: data.shortSummary,
          fullDescription: data.fullDescription ?? "",

          category: data.category,

          githubUrl: data.githubUrl ?? null,
          liveUrl: data.liveUrl ?? null,

          isFeatured: data.isFeatured,
          isPublished: data.isPublished,

          startDate: data.startDate || null,
          endDate: data.endDate || null,

          client: data.client,
          teamSize: data.teamSize,

          coverImageUrl: mainUpload.url!,
          coverImageFileId: mainFileId,
        })
        .returning();

      // ---- Insert Gallery Images ----
      if (cleanImages.length) {
        await tx.insert(projectGalleryImages).values(
          cleanImages.map((img) => ({
            projectId: project.id,
            imageUrl: img.imageUrl,
            fileId: img.fileId,
          })),
        );
      }

      // ---- Insert Technologies ----
      if (data.technologies.length) {
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

    // =========================
    // 7. Success response
    // =========================
    return NextResponse.json(
      {
        message: "Project created",
        data: result,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("[PROJECT_CREATE]", error);

    // =========================
    // rollback uploads
    // =========================
    try {
      if (mainFileId) await deleteFile(mainFileId);

      if (uploadedFileIds.length) {
        await Promise.all(uploadedFileIds.map((id) => deleteFile(id)));
      }
    } catch (rollbackErr) {
      console.error("Rollback failed", rollbackErr);
    }

    return NextResponse.json(
      {
        error: error.message || "Internal server error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  let newMainFileId: string | null = null;
  const uploadedFileIds: string[] = [];

  try {
    const formData = await req.formData();

    const jsonData = formData.get("data");
    const coverImage = formData.get("coverImage");
    const galleryImages = formData.getAll("galleryImages");
    const deleteGalleryImagesRaw = formData.get("deleteGalleryImages");

    if (typeof jsonData !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    console.log("FORMDATA ENTRIES (Server Side):");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const parsed = projectJsonSchema.safeParse(JSON.parse(jsonData));

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 422 },
      );
    }

    const data = parsed.data;

    if (!data.id) {
      return NextResponse.json(
        { error: "Project ID required" },
        { status: 400 },
      );
    }

    const deleteGalleryIds: string[] =
      typeof deleteGalleryImagesRaw === "string"
        ? JSON.parse(deleteGalleryImagesRaw)
        : [];

    // =========================
    // DB Transaction
    // =========================
    const result = await db.transaction(async (tx) => {
      // 1. get existing project
      const [existing] = await tx
        .select()
        .from(projects)
        .where(eq(projects.id, data.id as string));

      if (!existing) throw new Error("Project not found");

      let coverImageUrl = existing.coverImageUrl;
      let coverImageFileId = existing.coverImageFileId;

      // =========================
      // 2. HANDLE COVER IMAGE
      // =========================
      if (coverImage instanceof File) {
        // delete old
        if (existing.coverImageFileId) {
          await deleteFile(existing.coverImageFileId);
        }

        // upload new
        const upload = await uploadFile(coverImage, imageUploadPath);

        coverImageUrl = upload.url!;
        coverImageFileId = upload.fileId;
        newMainFileId = upload.fileId;
      }

      // =========================
      // 3. DELETE GALLERY IMAGES
      // =========================
      if (deleteGalleryIds.length) {
        const imagesToDelete = await tx
          .select()
          .from(projectGalleryImages)
          .where(
            and(
              eq(projectGalleryImages.projectId, existing.id),
              inArray(projectGalleryImages.fileId, deleteGalleryIds)
            )
          );

        // delete from imagekit
        await Promise.all(
          imagesToDelete.map((img) =>
            img.fileId ? deleteFile(img.fileId) : null,
          ),
        );

        // delete from db
        await tx
          .delete(projectGalleryImages)
          .where(
            and(
              eq(projectGalleryImages.projectId, existing.id),
              inArray(projectGalleryImages.fileId, deleteGalleryIds)
            )
          );
      }

      // =========================
      // 4. UPLOAD NEW GALLERY
      // =========================
      const uploadedImages = await Promise.all(
        galleryImages.map(async (file) => {
          if (!(file instanceof File)) return null;

          const upload = await uploadFile(file, imageUploadPath);

          if (upload.fileId) uploadedFileIds.push(upload.fileId);

          return {
            imageUrl: upload.url!,
            fileId: upload.fileId,
          };
        }),
      );

      const cleanImages = uploadedImages.filter(
        (img): img is { imageUrl: string; fileId: string | null } =>
          img !== null,
      );

      if (cleanImages.length) {
        await tx.insert(projectGalleryImages).values(
          cleanImages.map((img) => ({
            projectId: existing.id,
            imageUrl: img.imageUrl,
            fileId: img.fileId,
          })),
        );
      }

      // =========================
      // 5. UPDATE PROJECT
      // =========================
      await tx
        .update(projects)
        .set({
          slug: data.slug,
          title: data.title,
          shortSummary: data.shortSummary,
          fullDescription: data.fullDescription ?? "",
          category: data.category,
          githubUrl: data.githubUrl ?? null,
          liveUrl: data.liveUrl ?? null,
          isFeatured: data.isFeatured,
          isPublished: data.isPublished,
          startDate: data.startDate || null,
          endDate: data.endDate || null,
          client: data.client,
          teamSize: data.teamSize,
          coverImageUrl,
          coverImageFileId,
        })
        .where(eq(projects.id, existing.id));

      // =========================
      // 6. SYNC TECHNOLOGIES (Optimized)
      // =========================

      // fetch existing
      const existingTech = await tx
        .select({ technologyId: projectTechnologies.technologyId })
        .from(projectTechnologies)
        .where(eq(projectTechnologies.projectId, existing.id));

      // convert to sets (O(1) lookup)
      const existingSet = new Set(existingTech.map(t => t.technologyId));
      const newSet = new Set(data.technologies.map(t => t.id));

      // compute diff (O(n))
      const toDelete: number[] = [];
      const toAdd: number[] = [];

      // find removals
      for (const id of existingSet) {
        if (!newSet.has(id)) toDelete.push(id);
      }

      // find additions
      for (const id of newSet) {
        if (!existingSet.has(id)) toAdd.push(id);
      }

      // batch delete
      if (toDelete.length > 0) {
        await tx
          .delete(projectTechnologies)
          .where(
            and(
              eq(projectTechnologies.projectId, existing.id),
              inArray(projectTechnologies.technologyId, toDelete)
            )
          );
      }

      // batch insert
      if (toAdd.length > 0) {
        await tx.insert(projectTechnologies).values(
          toAdd.map(id => ({
            projectId: existing.id,
            technologyId: id,
          }))
        );
      }

      return { id: existing.id };
    });

    return NextResponse.json(
      { message: "Project updated", data: result },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("[PROJECT_UPDATE]", error);

    // rollback uploaded new files only
    try {
      if (newMainFileId) await deleteFile(newMainFileId);

      if (uploadedFileIds.length) {
        await Promise.all(uploadedFileIds.map(deleteFile));
      }
    } catch { }

    return NextResponse.json(
      { error: error.message || "Update failed" },
      { status: 500 },
    );
  }
}
