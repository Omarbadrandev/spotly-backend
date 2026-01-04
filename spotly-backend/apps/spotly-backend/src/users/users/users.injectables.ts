import { Injectable } from '@nestjs/common';
import { UsersRepository, UsersService } from '@spotly-backend/core';
import { PrismaService } from '../../app/prisma.service';

@Injectable()
export class UsersRepository_Injectable extends UsersRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }
}

@Injectable()
export class UsersService_Injectable extends UsersService {
  constructor(repository: UsersRepository_Injectable) {
    super(repository);
  }
}
