import { z } from "zod";
import { UserRole } from "@/lib/constants/roles";

export const RegisterSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .transform((val) => val.toLowerCase().trim()),
  phone: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Invalid Indian mobile number (10 digits, starts 6–9)"
    )
    .optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
  role: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    z.enum([UserRole.TENANT, UserRole.LANDLORD], {
      error: "Role must be TENANT or LANDLORD",
    })
  ),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .transform((val) => val.toLowerCase().trim()),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
