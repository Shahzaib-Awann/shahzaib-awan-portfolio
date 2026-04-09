import z from 'zod';



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