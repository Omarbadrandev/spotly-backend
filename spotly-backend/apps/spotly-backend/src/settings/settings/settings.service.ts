import { Injectable } from '@nestjs/common';
import { CreateSettingsInput, PatchSettingsInput } from '@spotly-backend/core';
import {
  CreateSettingsDto,
  SettingsDto,
  UpdateSettingsDto,
} from './settings.dto';
import { SettingsService_Injectable } from './settings.injectables';

@Injectable()
export class SettingsApiService {
  constructor(private readonly settingsService: SettingsService_Injectable) {}

  async createSettings(
    createSettingsDto: CreateSettingsDto,
    userId: string
  ): Promise<SettingsDto> {
    const input: CreateSettingsInput = {
      notificationsRadius: createSettingsDto.notificationsRadius,
      showPaidSpots: createSettingsDto.showPaidSpots,
      showUnpaidSpots: createSettingsDto.showUnpaidSpots,
      userId,
    };
    return this.settingsService.createSettings(input);
  }

  async getSettingsByUserId(userId: string): Promise<SettingsDto | null> {
    return this.settingsService.getSettingsByUserId(userId);
  }

  async updateSettings(
    updateSettingsDto: UpdateSettingsDto,
    id: string
  ): Promise<SettingsDto> {
    const input: PatchSettingsInput = {
      id,
      notificationsRadius: updateSettingsDto.notificationsRadius,
      showPaidSpots: updateSettingsDto.showPaidSpots,
      showUnpaidSpots: updateSettingsDto.showUnpaidSpots,
    };
    return this.settingsService.updateSettings(input);
  }
}
