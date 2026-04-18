import z, { nullable } from 'zod';



/**
 * === Contact Me Form Validation Schema ===
 * 
 * This schema defines the validation rules for the Contact Me form.
 * Using Zod ensures type-safety and integrates seamlessly with react-hook-form.
 * 
 * Fields:
 * - fullName: Required, 3-100 characters.
 * - email: Must be a valid email address.
 * - subject: Required, 1-150 characters.
 * - message: Required, 1-1000 characters.
 */
export const contactMeFormSchema = z.object({
  fullName: z
    .string({ error: "Required" })
    .min(3, "Full Name is required")
    .max(100, "Full Name must be less than 100 characters"),

  email: z
    .email("Invalid email address"),

  subject: z
    .string({ error: "Required"})
    .min(1, "Subject is required")
    .max(150, "Subject must be less than 150 characters"),

  message: z
    .string({ error: "Required" })
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters"),
});



export const signInFormSchema = z.object({
  email: z.email({ error: "Email is required" })
    .min(1, "Email is required"),
  password: z.string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
})



export const projectFormSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphenated"),
  
  title: z.string().min(1, "Title is required"),
  mainImage: z
  .instanceof(File, { message: "Main image is required" })
  .refine((file) => file.size <= 2 * 1024 * 1024, {
    message: "Image must be less than 2MB",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    {
      message: "Only JPG, PNG, or WEBP allowed",
    }
  ),

  shortDescription: z.string().min(1, "Short description is required"),
  description: z.string().nullable(),

  category: z.enum(["frontend", "backend", "fullstack"]),

  githubUrl: z.url().nullable(),
  liveUrl: z.url().nullable(),

  isFeatured: z.boolean(),
  isPublished: z.boolean(),

  startDate: z.string().nullable(), // ISO date string
  endDate: z.string().nullable(),

  client: z.string().max(150, { error: "Client name must be less than 150 characters" }).nullable(),
  teamSize: z.number().gt(0, { error: "Team Size must not be in negative" }),
})