import { z } from "zod";

export const playerSchema = z.object({
  fullName: z.string().min(3, "Name is required"),
  phone: z.string().min(10, "Phone number is invalid"),
  fatherName: z.string().min(2),
  dob: z.string(),
  role: z.string(),
  batch: z.string(),
  battingStyle: z.string(),
  bowlingStyle: z.string(),
  jerseyNumber: z.string(),
  address: z.string().optional(),
});
