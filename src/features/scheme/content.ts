import { z } from 'zod';

export type Content = z.infer<typeof ContentSchema>;
export const ContentSchema = z.object({
  id: z.number(),
  contentType: z.string(),
  contentPurpose: z.string(),
  mainText: z.string(),
  textStyle: z.string(),
});

export type ContentResponse = z.infer<typeof ContentResponseSchema>;
export const ContentResponseSchema = z.object({
  contents: ContentSchema.array(),
});

export type ContentForm = z.infer<typeof ContentFormSchema>;
export const ContentFormSchema = z.object({
  crops: z.object({ name: z.string() }).array(),
  contentType: z.string(),
  contentPurpose: z.string(),
  cards: z.object({
    root: z.object({ title: z.string(), keywords: z.string() }),
    others: z.object({ title: z.string(), keywords: z.string() }).array(),
  }),
  mainText: z.string(),
  parlanceStyle: z.string(),
  cardStyle: z.string(),
});

export type ContentSuggestion = z.infer<typeof ContentSuggestionSchema>;
export const ContentSuggestionSchema = z.object({
  contentId: z.number(),
  title: z.string(),
  keywords: z.string(),
  cardStyle: z.string(),
});
