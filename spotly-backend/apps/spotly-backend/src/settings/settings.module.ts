import { Module } from '@nestjs/common';
import { PrismaModule } from '../app/prisma.module';
import { SettingsController } from './settings.controller';
import {
  SettingsApiService,
  SettingsRepository_Injectable,
  SettingsService_Injectable,
} from './settings';

@Module({
  imports: [PrismaModule],
  controllers: [SettingsController],
  providers: [
    SettingsApiService,
    SettingsService_Injectable,
    SettingsRepository_Injectable,
  ],
  exports: [SettingsService_Injectable],
})
export class SettingsModule {}
