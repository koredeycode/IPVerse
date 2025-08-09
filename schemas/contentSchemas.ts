import { ALLOWED_TYPES } from "@/lib/content";
import z from "zod";

export const uploadSchema = z.object({
  file: z.instanceof(File).refine((file) => ALLOWED_TYPES.includes(file.type), {
    message: "Unsupported file type",
  }),
});

export const mintSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL"),
  description: z.string().min(1, "Description is required"),
  tags: z.string().optional(),
  metadata: z.array(
    z.object({
      traitType: z.string().min(1),
      value: z.string().min(1),
    })
  ),
  price: z.number().positive("Price must be greater than 0"),
  duration: z.number().positive("Duration must be greater than 0"),
  durationUnit: z.enum(["Weeks", "Months", "Years"]),
});
