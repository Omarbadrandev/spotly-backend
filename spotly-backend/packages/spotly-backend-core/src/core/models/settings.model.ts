import z from 'zod';
import { baseModel } from './shared.model';

export const settingSchema = baseModel.extend({
  notificationsRadius: z.number(),
  showPaidSpots: z.boolean(),
  showUnpaidSpots: z.boolean(),
  userId: z.string().uuid(),
});
export type Setting = z.infer<typeof settingSchema>;
