"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";


/**
 * === Fetch User for Sign-In ===
 *
 * - Matches user by email and password
 * - Returns normalized user object
 *
 * @param email - user email
 * @param password - raw password (should ideally be hashed)
 * @returns user object or null
 */
export const getUserForSignin = async (email: string, password: string) => {
  try {
    // === Query user ===
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.password, password)))
      .limit(1);

    // === No user found ===
    if (!user) return null;

    // === Normalize response ===
    return {
      id: String(user.id),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  } catch (error) {
    console.error("Signin error:", error);
    throw new Error("Something went wrong while trying to sign in. Please try again.");
  }
};