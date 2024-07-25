import { z } from 'zod';

export type ImageResponse = z.infer<typeof ImageResponseSchema>;
export const ImageResponseSchema = z.object({
  fileName: z.string(),
  urls: z.object({
    url: z.string(),
  }),
});
