import { CropResponseSchema } from '@/features/scheme';
import { server } from '@/features/config';

export const fetchCrops = async () => {
  const response = await fetch(server`/crops`);

  return CropResponseSchema.parseAsync(await response.json());
};

export const searchCrops = async (query: string) => {
  const response = await fetch(server`/crops?keyword=${query}`);

  return CropResponseSchema.parseAsync(await response.json());
};
