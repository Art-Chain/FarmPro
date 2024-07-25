import { Content, LocalContent, LocalContentSchema } from '@/features/scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createLocalContent = async (projectId: number, content: Content) => {
  const contents = await LocalContentSchema.array().parseAsync(JSON.parse(await AsyncStorage.getItem('contents') ?? '[]'));
  const localContent: LocalContent = {
    ...content,
    id: Date.now(),
    projectId,
  };

  contents.push(localContent);
  await AsyncStorage.setItem('projects', JSON.stringify(contents));
  return localContent;
};

export const fetchLocalContents = async () => {
  return LocalContentSchema.array().parseAsync(JSON.parse(await AsyncStorage.getItem('contents') ?? '[]'));
};

export const fetchLocalContentsByProjectId = async (projectId: number) => {
  const contents = await fetchLocalContents();
  return contents.filter((content) => content.projectId === projectId);
};

export const fetchLocalContent = async (id: number) => {
  const contents = await fetchLocalContents();
  return contents.find((content) => content.id === id) ?? null;
};

