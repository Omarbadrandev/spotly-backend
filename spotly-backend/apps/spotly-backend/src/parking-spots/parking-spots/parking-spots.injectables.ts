import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  ParkingSpotsRepository,
  ParkingSpotsService,
} from '@spotly-backend/core';

@Injectable()
export class ParkingSpotsRepository_Injectable extends ParkingSpotsRepository {
  constructor() {
    super(new PrismaClient());
  }
}

@Injectable()
export class ParkingSpotsService_Injectable extends ParkingSpotsService {
  constructor(repository: ParkingSpotsRepository_Injectable) {
    super(repository);
  }
}
