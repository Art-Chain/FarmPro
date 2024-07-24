import { CropResponseSchema } from '@/features/scheme';
import { server } from '@/features/config';

export const fetchCrops = async () => {
  // const response = await fetch(server`/crops`);
  //
  // return CropResponseSchema.parseAsync(await response.json());
  return Promise.resolve({
    crops: [
      {
        id: 1,
        name: '딸기',
      },
      {
        id: 2,
        name: '오이',
      },
      {
        id: 3,
        name: '포도',
      },
      {
        id: 4,
        name: '귤',
      },
      {
        id: 5,
        name: '고추',
      },
      {
        id: 6,
        name: '참외',
      },
      {
        id: 7,
        name: '수박',
      },
    ],
  });
};

export const searchCrops = async (query: string) => {
  const response = await fetch(server`/crops?keyword=${query}`);

  return CropResponseSchema.parseAsync(await response.json());
};
