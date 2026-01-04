import z from 'zod';

export const baseModel = z.object({
  id: z.string().uuid(),
  createdAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/, {
      message: 'Invalid datetime format. Expected ISO 8601 format.',
    }),
  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/, {
      message: 'Invalid datetime format. Expected ISO 8601 format.',
    }),
});

export type BaseModel = z.infer<typeof baseModel>;
