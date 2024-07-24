import { CropSchema } from '@/features/scheme';
import { server } from '@/features/config';

export const fetchCrops = async () => {
  const response = await fetch(server`/crops`);

  return CropSchema.spa(await response.json());
};

export const searchCrops = async (query: string) => {
  const response = await fetch(server`/crops?keyword=${query}`);

  return CropSchema.spa(await response.json());
};
