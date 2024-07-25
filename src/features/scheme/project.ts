import { z } from 'zod';
import { CropSchema } from '@/features/scheme/crop.ts';

export type Project = z.infer<typeof ProjectSchema>;
export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  crop: CropSchema,
  variety: z.string(),
  method: z.string(),
  description: z.string(),
  price: z.string(),
  outlink: z.string(),
});

export type ProjectForm = z.infer<typeof ProjectFormSchema>;
export const ProjectFormSchema = z.object({
  name: z.string(),
  crop: CropSchema,
  variety: z.string(),
  method: z.string(),
  description: z.string(),
  price: z.string(),
  outlink: z.string(),
});

export type ProjectInfo = z.infer<typeof ProjectInfoSchema>;
export const ProjectInfoSchema =  z.object({
  cropCategoryName: z.object({
    name: z.string(),
  }),
  cropDetailName: z.string(),
});
