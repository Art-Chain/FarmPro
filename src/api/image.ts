import { server } from '@/features/config';
import { ImageResponseSchema } from '@/features/scheme';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

export const fetchImage = async (name: string, ext: 'jpg') => {
  console.log('fetchImage', name, ext);
  const response = await fetch(server`/image?fileType=${encodeURIComponent(ext)}&fileName=${encodeURIComponent(`${name}.${ext}`)}`);

  return ImageResponseSchema.parseAsync(await response.json());
};

export const uploadImage = async (name: string, ext: 'jpg', image: string) => {
  const data = await fetchImage(name, ext);

  const filePath = Platform.OS === 'ios'
    ? image.replace('file:///', '').replace('file://', '')
    : image.replace('file://', '').replace('file:/', '');
  await RNFetchBlob.fetch('PUT', data.urls.url, {}, RNFetchBlob.wrap(filePath));

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
