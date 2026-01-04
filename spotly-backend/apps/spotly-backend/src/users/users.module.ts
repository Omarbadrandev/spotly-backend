import { Module } from '@nestjs/common';

import { PrismaModule } from '../app/prisma.module';
import { UsersController } from './users.controller';
import {
  UsersApiService,
  UsersRepository_Injectable,
  UsersService_Injectable,
} from './users';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersApiService,
    UsersService_Injectable,
    UsersRepository_Injectable,
  ],
  exports: [UsersService_Injectable],
})
export class UsersModule {}
