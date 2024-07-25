import {
  ContentCreationResponseSchema,
  ContentForm,
  ContentPurpose,
  ContentResponseSchema,
  ContentSchema,
  ContentType
} from '@/features/scheme';
import { server } from '@/features/config';

export const createContent = async (form: ContentForm) => {
  const response = await fetch(server`/contents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  const json = await response.json();
  console.log('createContent', json)
  return ContentCreationResponseSchema.parseAsync(json);
}

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

/* utils */
export const contentTypeToString = (type: ContentType) => {
  if (type === 'INSTAGRAM') return '인스타그램';
  if (type === 'BLOG') return '블로그';

  return '알 수 없음';
};
export const contentPurposeToString = (purpose: ContentPurpose) => {
  if (purpose === 'PROMOTION') return '홍보';
  if (purpose === 'SALE') return '판매';
  if (purpose === 'INFORMATION') return '정보';

  return '알 수 없음';
};
