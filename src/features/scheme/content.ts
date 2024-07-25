import { z } from 'zod';
import { ProjectInfoSchema } from './project';

export type ContentPurpose = z.infer<typeof ContentPurposeSchema>;
export const ContentPurposeSchema = z.union([
  z.literal('PROMOTION'),
  z.literal('SALE'),
  z.literal('INFORMATION'),
]);
export type ContentType = z.infer<typeof ContentTypeSchema>;
export const ContentTypeSchema = z.union([
  z.literal('INSTAGRAM'),
  z.literal('BLOG'),
]);
export type ParlanceStyle = z.infer<typeof ParlanceStyleSchema>;
export const ParlanceStyleSchema = z.union([
  z.literal('INFORMATIVE'),
  z.literal('HUMOROUS'),
  z.literal('EMOTIONAL'),
  z.literal('ATTRACTIVE'),
  z.literal('STORYTELLER'),
]);
export type CardStyle = z.infer<typeof CardStyleSchema>;
export const CardStyleSchema = z.union([
  z.literal('LAVISH'),
  z.literal('SERENE'),
  z.literal('EMOTIVE'),
  z.literal('MODERN'),
  z.literal('HUMOROUS'),
]);

export type Content = z.infer<typeof ContentSchema>;
export const ContentSchema = z.object({
  id: z.number(),
  projectInfo: ProjectInfoSchema.nullable(),
  contentType: ContentTypeSchema,
  contentPurpose: ContentPurposeSchema,
  mainText: z.string().nullable(),
  title: z.string().nullable(),
  images: z.object({
    images: z.object({
      id: z.number().nullable(),
      imageUrl: z.string(),
      title: z.string().nullable(),
    }).array(),
  }),
  parlanceStyle: ParlanceStyleSchema.nullable().optional(),
  cardStyle: CardStyleSchema.nullable().optional(),
});

export type ContentCreation = z.infer<typeof ContentCreationSchema>;
export const ContentCreationSchema = ContentSchema
  .omit({ images: true  })
  .extend({
    generatedTitle: z.string(),
    userUploadImages: z.object({
      images: z.object({
        id: z.number().nullable(),
        imageUrl: z.string(),
        title: z.string().nullable(),
      }).array(),
    }),
    chatGptResponses: z.object({
      data: z.object({
        url: z.string(),
        revisedPrompt: z.string().nullable(),
      }).array(),
    }).array(),
  });

export type LocalContent = z.infer<typeof LocalContentSchema>;
export const LocalContentSchema = ContentSchema.omit({ projectInfo: true }).extend({
  projectId: z.number(),
});

export type ContentResponse = z.infer<typeof ContentResponseSchema>;
export const ContentResponseSchema = z.object({
  contents: ContentSchema.array(),
});

export type ContentForm = z.infer<typeof ContentFormSchema>;
export const ContentFormSchema = z.object({
  projectInfo: z.object({
    cropCategoryName: z.object({
      name: z.string(),
    }),
    cropDetailName: z.string(),
    growMethod: z.string(),
    plantDescription: z.string(),
    cropPrice: z.string(),
    plantContactInfo: z.string(),
  }).nullable(),
  crops: z.object({
    name: z.string(),
  }).array(),
  contentType: ContentTypeSchema,
  contentPurpose: ContentPurposeSchema,
  cards: z.object({
    root: z.object({
      title: z.string(),
      keywords: z.string(),
      url: z.string().optional(),
    }),
    others: z.object({
      keywords: z.string(),
      url: z.string().optional(),
    }).array(),
  }),
  mainText: z.string(),
  parlanceStyle: ParlanceStyleSchema,
  cardStyle: CardStyleSchema,
});

export type ContentCreationResponse = z.infer<typeof ContentCreationResponseSchema>;
export const ContentCreationResponseSchema = z.object({
  data: z.object({
    url: z.string(),
    revisedPrompt: z.string().nullable(),
  }).array(),
}).array();

export type ContentSuggestion = z.infer<typeof ContentSuggestionSchema>;
export const ContentSuggestionSchema = z.object({
  contentId: z.number(),
  title: z.string(),
  keywords: z.string(),
  cardStyle: z.string(),
});
