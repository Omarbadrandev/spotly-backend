import {
  SettingsRepository,
  CreateSettingsInput,
  PatchSettingsInput,
} from '@spotly-backend/core';
import { Setting } from '../../models/settings.model';

export class SettingsService {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async createSettings(input: CreateSettingsInput): Promise<Setting> {
    return this.settingsRepository.createSettings(input);
  }

  async getSettingsByUserId(userId: string): Promise<Setting | null> {
    return this.settingsRepository.getSettingsByUserId(userId);
  }

  async updateSettings(setting: PatchSettingsInput): Promise<Setting> {
    return this.settingsRepository.updateSettings(setting);
  }
}
