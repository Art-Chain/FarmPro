import { ContentResponseSchema } from '@/features/scheme';
import { server } from '@/features/config';

export const fetchContents = async () => {
  const response = await fetch(server`/contents`);

  return ContentResponseSchema.parseAsync(await response.json());
};

export const fetchContentFeeds = async () => {
  const response = await fetch(server`/contents/feeds`);

  return ContentResponseSchema.parseAsync(await response.json());
};
