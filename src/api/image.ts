import { server } from '@/features/config';
import { ImageResponseSchema } from '@/features/scheme';
import RNFetchBlob from 'rn-fetch-blob';

export const fetchImage = async (name: string, ext: 'jpg') => {
  console.log('fetchImage', name, ext);
  const response = await fetch(server`/image?fileType=${encodeURIComponent(ext)}&fileName=${encodeURIComponent(name)}`);

  return ImageResponseSchema.parseAsync(await response.json());
};

export const uploadImage = async (name: string, ext: 'jpg', image: string) => {
  const data = await fetchImage(name, ext);
  console.log('uploadImage', data.urls.url);

  const response = await RNFetchBlob.fetch('POST', data.urls.url, {
    'Content-Type': 'application/octet-stream',
  }, image);

  console.log('uploadImage', response);

  await fetch(server`/image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileName: name,
    }),
  });

  return data;
};
