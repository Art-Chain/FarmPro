import { ContentResponseSchema, ContentSchema } from '@/features/scheme';
import { server } from '@/features/config';

export const fetchContent = async (id: number) => {
  const response = await fetch(server`/contents/${id}`);

  return ContentSchema.parseAsync(await response.json());
};

export const fetchContents = async () => {
  const response = await fetch(server`/contents/lists`);

  return ContentResponseSchema.parseAsync(await response.json());
};

export const fetchContentFeeds = async () => {
  const response = await fetch(server`/contents/feeds`);

  return ContentResponseSchema.parseAsync(await response.json());
};
