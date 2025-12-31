import { PrismaClient, ParkingSpot } from '@prisma/client';

export interface CreateParkingSpotInput {
  name: string;
  description?: string | null;
  latitude: number;
  longitude: number;
}

export class ParkingSpotsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateParkingSpotInput): Promise<ParkingSpot> {
    return this.prisma.parkingSpot.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
  }

  async findAll(): Promise<ParkingSpot[]> {
    return this.prisma.parkingSpot.findMany();
  }
}
