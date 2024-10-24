import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8, "Minimum 8 characters required").max(32, "Maximum 32 characters allowed"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Minimum 1 character required").max(64, "Maximum 64 characters allowed"),
  email: z.string().trim().email(),
  password: z.string().trim().min(8, "Minimum 8 characters required").max(32, "Maximum 32 characters allowed"),
});