import { PrismaClient, Settings as PrismaSettings } from '@prisma/client';
import {
  Setting,
  settingSchema,
  toISOStringOrValue,
} from '@spotly-backend/core';
import z from 'zod';

export const createSettingsInputSchema = z.object({
  notificationsRadius: z.number(),
  showPaidSpots: z.boolean(),
  showUnpaidSpots: z.boolean(),
  userId: z.string(),
});

export type CreateSettingsInput = z.infer<typeof createSettingsInputSchema>;

export const patchSettingsInputSchema = z.object({
  notificationsRadius: z.number().optional(),
  showPaidSpots: z.boolean().optional(),
  showUnpaidSpots: z.boolean().optional(),
  id: z.string(),
});
export type PatchSettingsInput = z.infer<typeof patchSettingsInputSchema>;

export class SettingsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(settings: PrismaSettings): Setting {
    return settingSchema.parse({
      id: settings.id,
      createdAt: toISOStringOrValue(settings.createdAt),
      updatedAt: toISOStringOrValue(settings.updatedAt),
      notificationsRadius: settings.notificationsRadius,
      showPaidSpots: settings.showPaidSpots,
      showUnpaidSpots: settings.showUnpaidSpots,
      userId: settings.userId,
    });
  }

  async createSettings(input: CreateSettingsInput): Promise<Setting> {
    const created = await this.prisma.settings.create({
      data: {
        notificationsRadius: input.notificationsRadius,
        showPaidSpots: input.showPaidSpots,
        showUnpaidSpots: input.showUnpaidSpots,
        userId: input.userId,
      },
    });
    return this.toDomain(created);
  }

  async getSettingsByUserId(userId: string): Promise<Setting | null> {
    const setting = await this.prisma.settings.findFirst({
      where: { userId },
    });
    if (!setting) {
      return null;
    }
    return this.toDomain(setting);
  }

  async updateSettings(setting: PatchSettingsInput): Promise<Setting> {
    const updated = await this.prisma.settings.update({
      where: { id: setting.id },
      data: {
        notificationsRadius: setting.notificationsRadius,
        showPaidSpots: setting.showPaidSpots,
        showUnpaidSpots: setting.showUnpaidSpots,
        updatedAt: new Date(),
      },
    });
    return this.toDomain(updated);
  }
}
