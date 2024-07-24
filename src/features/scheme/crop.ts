import { z } from 'zod';

export type Crop = z.infer<typeof CropSchema>;
export const CropSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type CropResponse = z.infer<typeof CropResponseSchema>;
export const CropResponseSchema = z.object({
  crops: CropSchema.array(),
});
