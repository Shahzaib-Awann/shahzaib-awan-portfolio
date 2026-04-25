import { NextRequest, NextResponse } from "next/server";
import { projectJsonSchema } from "@/lib/zod/schema";
import { uploadFile, deleteFile } from "@/lib/actions/upload-imagekit";
import { db } from "@/lib/db";
import {
  projects,
  projectGalleryImages,
  projectTechnologies,
} from "@/lib/db/schema";

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
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const parsed = projectJsonSchema.safeParse(JSON.parse(jsonData));

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // =========================
    // 3. Validate cover image
    // =========================
    if (!(coverImage instanceof File) || coverImage.size === 0) {
      return NextResponse.json(
        { error: "Main image is required" },
        { status: 400 }
      );
    }

    // =========================
    // 4. Upload cover image
    // =========================
    const mainUpload = await uploadFile(
      coverImage,
      "/portfolio/projects"
    );

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

        const upload = await uploadFile(
          file,
          "/portfolio/projects"
        );

        if (upload?.fileId) {
          uploadedFileIds.push(upload.fileId);
        }

        return {
          imageUrl: upload.url!,
          fileId: upload.fileId ?? null,
        };
      })
    );

    const cleanImages = uploadedImages.filter(
      (
        img
      ): img is { imageUrl: string; fileId: string | null } =>
        img !== null
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
          }))
        );
      }

      // ---- Insert Technologies ----
      if (data.technologies.length) {
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

    // =========================
    // 7. Success response
    // =========================
    return NextResponse.json(
      {
        message: "Project created",
        data: result,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("[PROJECT_CREATE]", error);

    // =========================
    // rollback uploads
    // =========================
    try {
      if (mainFileId) await deleteFile(mainFileId);

      if (uploadedFileIds.length) {
        await Promise.all(
          uploadedFileIds.map((id) => deleteFile(id))
        );
      }
    } catch (rollbackErr) {
      console.error("Rollback failed", rollbackErr);
    }

    return NextResponse.json(
      {
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}