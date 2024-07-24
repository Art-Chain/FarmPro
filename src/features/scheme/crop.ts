import { z } from 'zod';

export type Crop = z.infer<typeof CropSchema>;
export const CropSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Crops = z.infer<typeof CropsSchema>;
export const CropsSchema = z.object({
  crops: CropSchema.array(),
});
