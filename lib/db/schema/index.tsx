import { boolean, date, integer, pgEnum, pgTable, primaryKey, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "manager"]);
export const projectCategoryEnum = pgEnum("project_category", ["frontend", "backend", "fullstack"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  role: userRoleEnum("role").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull()
})

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  slug: text("slug").unique().notNull(),

  title: text("title").notNull(),

  mainImage: text("main_image").notNull(),

  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(), // markdown

  category: projectCategoryEnum("category").notNull(),

  githubUrl: text("github_url"),
  liveUrl: text("live_url"),

  isFeatured: boolean("is_featured").default(false).notNull(),
  isPublished: boolean("is_published").default(true).notNull(),

  startDate: date("start_date"),
  endDate: date("end_date"),

  client: varchar("client", { length: 150 }),
  teamSize: integer("team_size"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const projectTechnologies = pgTable("project_technologies", {
    projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
    technologyId: integer("technology_id").notNull().references(() => technologies.id, { onDelete: "cascade" }),
  }, (table) => [
    primaryKey({ columns: [table.projectId, table.technologyId] }),
  ]
);