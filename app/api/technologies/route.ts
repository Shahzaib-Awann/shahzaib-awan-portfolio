import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { technologies } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    // === Basic validation ===
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Technology name must be at least 2 characters" },
        { status: 400 }
      );
    }

    // === Insert ===
    const result = await db
      .insert(technologies)
      .values({
        name: name.trim(),
      })
      .returning();

    return NextResponse.json(
      {
        message: "Technology created successfully",
        data: result[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/technologies] Error:", error);

    return NextResponse.json(
      { error: "Failed to create technology" },
      { status: 500 }
    );
  }
}



export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name } = body;

    // Validate ID
    if (!id || !name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Form Data is invalid" },
        { status: 400 }
      );
    }

    //  Update record
    const result = await db
      .update(technologies)
      .set({
        name: name.trim(),
      })
      .where(eq(technologies.id, id))
      .returning();

    return NextResponse.json(
      {
        message: "Technology updated successfully",
        data: result[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PUT /api/technologies] Error:", error);

    return NextResponse.json(
      { error: "Failed to update technology" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: "Technology ID is required for deletion" },
        { status: 400 }
      );
    }

    // Delete record
    const result = await db
      .delete(technologies)
      .where(eq(technologies.id, id))
      .returning();

    return NextResponse.json(
      {
        message: "Technology deleted successfully",
        data: result[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE /api/technologies] Error:", error);

    return NextResponse.json(
      { error: "Failed to delete technology" },
      { status: 500 }
    );
  }
}