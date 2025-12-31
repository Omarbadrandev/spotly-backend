import { ParkingSpot } from '@prisma/client';
import {
  ParkingSpotsRepository,
  CreateParkingSpotInput,
} from '../../../adapters';

export class ParkingSpotsService {
  constructor(private readonly repository: ParkingSpotsRepository) {}

  async create(input: CreateParkingSpotInput): Promise<ParkingSpot> {
    return this.repository.create(input);
  }
}
