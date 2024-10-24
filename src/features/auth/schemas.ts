import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8, "Minimum 8 characters required").max(32, "Maximum 32 characters allowed"),
});