import z from 'zod';


const imageSchema = z
.union([
  // Validate if the input is a File instance
  z
    .instanceof(File, { message: "Choose an image to upload" })
    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: "Image must be smaller than 1MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      { message: "Unsupported format — try JPG, PNG, or GIF 🚀" }
    ),
  // Allow string (e.g., URL or placeholder)
  z.string(),
  // Allow null
  z.null(),
])

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

export const technologySchema = z.object({
  id: z.union([z.number(), z.string().transform(String)]).optional(),
  name: z.string().min(2, "Technology name must be at least 2 characters").max(150, "Technology name must be less than 150 characters"),
});

const projectImageSchema = z.object({
  imageUrl: imageSchema,
  fieldId: z.string().nullable(),
});

const projectTechnologiesSchema = z.object({
  id: z.number(),
});

export const projectFormSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphenated"),
  
  title: z.string().min(1, "Title is required"),
  mainImage: imageSchema,

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

  projectImages: z.array(projectImageSchema),

  technologies: z.array(projectTechnologiesSchema).min(1, { error: "Add atleast 1 technology" }),
})

export const projectJsonSchema = projectFormSchema.omit({
  mainImage: true,
  projectImages: true,
});