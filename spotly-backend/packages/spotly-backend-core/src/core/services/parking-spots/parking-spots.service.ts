import {
  ParkingSpotsRepository,
  CreateParkingSpotInput,
  ParkingSpotDomain,
} from '../../../adapters';

export class ParkingSpotsService {
  constructor(private readonly repository: ParkingSpotsRepository) {}

  async create(input: CreateParkingSpotInput): Promise<ParkingSpotDomain> {
    return this.repository.create(input);
  }

  async list(): Promise<{ parkingSpots: ParkingSpotDomain[] }> {
    const parkingSpots = await this.repository.listParkingSpots();
    return { parkingSpots };
  }
}
