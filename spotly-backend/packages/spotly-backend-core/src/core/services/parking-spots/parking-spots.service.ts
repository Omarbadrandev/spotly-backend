import {
  ParkingSpotsRepository,
  CreateParkingSpotInput,
} from '../../../adapters';
import { ParkingSpotModel } from '../../models/parking-spots.model';

export class ParkingSpotsService {
  constructor(private readonly repository: ParkingSpotsRepository) {}

  async create(input: CreateParkingSpotInput): Promise<ParkingSpotModel> {
    return this.repository.create(input);
  }

  async list(): Promise<{ parkingSpots: ParkingSpotModel[] }> {
    const parkingSpots = await this.repository.listParkingSpots();
    return { parkingSpots };
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
