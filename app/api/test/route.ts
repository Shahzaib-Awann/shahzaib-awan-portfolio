import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await db.select().from(users);

    return NextResponse.json({
      message: "Working Route",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};