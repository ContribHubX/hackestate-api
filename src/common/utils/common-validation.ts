import { z } from "zod";

// Define a reusable password schema with validation rules
export const passwordSchema = z
  .string()
  .min(5, "Password must be at least 5 characters long")
//   .max(64, "Password must not exceed 64 characters")
//   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//   .regex(/[0-9]/, "Password must contain at least one number")
//   .regex(/[\W_]/, "Password must contain at least one special character");

// Use the password schema in other schemas
export const changePasswordSchema = z.object({
  passwordResetToken: z.string(),
  newPassword: passwordSchema,
});
