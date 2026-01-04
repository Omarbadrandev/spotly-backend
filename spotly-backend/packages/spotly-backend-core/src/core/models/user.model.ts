import z from 'zod';
import { baseModel } from './shared.model';

export const userSchema = baseModel.extend({
  name: z.string(),
  surname: z.string(),
  phone: z.string().nullable(),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;
