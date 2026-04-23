import { NextRequest, NextResponse } from "next/server";
import { projectJsonSchema } from "@/lib/zod/schema";
import { uploadFile, deleteFile } from "@/lib/actions/upload-imagekit";
import { insertNewProject } from "@/lib/actions/projects";

export async function POST(req: NextRequest) {
  let mainFileId: string | null = null;
  const projectFileIds: string[] = [];

  try {
    const formData = await req.formData();

    const jsonData = formData.get("data");
    const mainImage = formData.get("mainImage");
    const projectImages = formData.getAll("projectImages") as File[];

    // validate json
    if (typeof jsonData !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const parsed = projectJsonSchema.safeParse(JSON.parse(jsonData));

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 422 }
      );
    }

    // validate main image
    if (!(mainImage instanceof File) || mainImage.size === 0) {
      return NextResponse.json(
        { error: "Main image is required" },
        { status: 400 }
      );
    }

    // upload main image
    const mainUpload = await uploadFile(mainImage, "/portfolio/projects");

    if (!mainUpload?.url) {
      throw new Error("Main image upload failed");
    }

    mainFileId = mainUpload.fileId;

    // upload project images in parallel
    const uploadedImages = await Promise.all(
      projectImages.map(async (file) => {
        if (!(file instanceof File)) return null;
    
        const upload = await uploadFile(file, "/portfolio/projects");
    
        if (upload.fileId) projectFileIds.push(upload.fileId);
    
        return {
          imageUrl: upload.url!,
          fileId: upload.fileId,
        };
      })
    );
    
    // FIX HERE
    const cleanImages = uploadedImages.filter(
      (img): img is { imageUrl: string; fileId: string | null } => img !== null
    );
    
    // insert DB
    const result = await insertNewProject({
      ...parsed.data,
      description: parsed.data.description ?? "",
      mainImage: mainUpload.url,
      mainImageFileId: mainFileId,
      projectImages: cleanImages,
    });

    return NextResponse.json(
      { message: "Project created", data: result },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("[PROJECT_CREATE]", error);

    // rollback uploads
    try {
      if (mainFileId) await deleteFile(mainFileId);
      if (projectFileIds.length) {
        await Promise.all(projectFileIds.map(deleteFile));
      }
    } catch (rollbackErr) {
      console.error("Rollback failed", rollbackErr);
    }

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}