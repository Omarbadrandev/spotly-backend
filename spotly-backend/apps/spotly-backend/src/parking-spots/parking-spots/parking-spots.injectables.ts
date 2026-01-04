import { Injectable } from '@nestjs/common';
import {
  ParkingSpotsRepository,
  ParkingSpotsService,
} from '@spotly-backend/core';
import { PrismaService } from '../../app/prisma.service';

@Injectable()
export class ParkingSpotsRepository_Injectable extends ParkingSpotsRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }
}

@Injectable()
export class ParkingSpotsService_Injectable extends ParkingSpotsService {
  constructor(repository: ParkingSpotsRepository_Injectable) {
    super(repository);
  }
}
