import { deleteFile } from "@/lib/actions/upload-imagekit";
import { db } from "@/lib/db";
import { projectGalleryImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileId, imageType } = body;

    // =========================
    // 1. Validation
    // =========================
    if (!fileId || !imageType) {
      return NextResponse.json(
        { error: "Missing fileId or imageType" },
        { status: 400 }
      );
    }

    // =========================
    // 2. Delete from ImageKit
    // =========================
    const deleted = await deleteFile(fileId);

    if (!deleted) {
      return NextResponse.json(
        { error: "Failed to delete image from ImageKit" },
        { status: 500 }
      );
    }

    // =========================
    // 3. Delete from DB (based on type)
    // =========================
    if (imageType === "project-gallery-image") {
      await db
        .delete(projectGalleryImages)
        .where(eq(projectGalleryImages.fileId, fileId));
    }

    // =========================
    // 4. Success response
    // =========================
    return NextResponse.json(
      {
        message: "Image deleted successfully",
        fileId,
        imageType,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[DELETE_IMAGE]", error);

    return NextResponse.json(
      {
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}