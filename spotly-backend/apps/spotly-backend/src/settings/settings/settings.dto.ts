import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const createSettingsSchema = z.object({
  notificationsRadius: z.number(),
  showPaidSpots: z.boolean(),
  showUnpaidSpots: z.boolean(),
});
export class CreateSettingsDto extends createZodDto(createSettingsSchema) {}

export const settingsSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  notificationsRadius: z.number(),
  showPaidSpots: z.boolean(),
  showUnpaidSpots: z.boolean(),
  userId: z.string().uuid(),
});
export class SettingsDto extends createZodDto(settingsSchema) {}

export const updateSettingsSchema = z.object({
  notificationsRadius: z.number().optional(),
  showPaidSpots: z.boolean().optional(),
  showUnpaidSpots: z.boolean().optional(),
});
export class UpdateSettingsDto extends createZodDto(updateSettingsSchema) {}
