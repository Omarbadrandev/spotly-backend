import { Module } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingSpotsModule } from '../parking-spots/parking-spots.module';
import { UsersModule } from '../users/users.module';
import { SettingsModule } from '../settings/settings.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, ParkingSpotsModule, UsersModule, SettingsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
