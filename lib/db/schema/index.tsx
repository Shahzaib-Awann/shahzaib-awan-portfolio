import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "manager"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  role: userRoleEnum("role").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
