import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to the database');
    } catch (error) {
      this.logger.error(
        'Failed to connect to the database. Please ensure DATABASE_URL is set correctly.',
        error instanceof Error ? error.stack : String(error)
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
