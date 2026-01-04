import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../app/prisma.service';
import { SettingsRepository, SettingsService } from '@spotly-backend/core';

@Injectable()
export class SettingsRepository_Injectable extends SettingsRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }
}

@Injectable()
export class SettingsService_Injectable extends SettingsService {
  constructor(repository: SettingsRepository_Injectable) {
    super(repository);
  }
}
