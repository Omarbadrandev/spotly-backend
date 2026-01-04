import { ParkingSpot, PrismaClient } from '@prisma/client';
import {
  ParkingSpotModel,
  parkingSpotModel,
  toISOStringOrValue,
} from '@spotly-backend/core';

export interface CreateParkingSpotInput {
  name: string;
  description?: string | null;
  latitude: number;
  longitude: number;
  paid?: boolean;
}

export class ParkingSpotsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(spot: ParkingSpot): ParkingSpotModel {
    return parkingSpotModel.parse({
      id: spot.id,
      name: spot.name,
      description: spot.description,
      latitude: spot.latitude,
      longitude: spot.longitude,
      createdAt: toISOStringOrValue(spot.createdAt),
      updatedAt: toISOStringOrValue(spot.updatedAt),
      paid: spot.paid ?? false,
    });
  }

  async create(data: CreateParkingSpotInput): Promise<ParkingSpotModel> {
    const spot = await this.prisma.parkingSpot.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        latitude: data.latitude,
        longitude: data.longitude,
        paid: data.paid ?? false,
      },
    });
    return this.toDomain(spot);
  }

  // TODO: add pagination and query parameters
  async listParkingSpots(): Promise<ParkingSpotModel[]> {
    const spots = await this.prisma.parkingSpot.findMany();
    return spots.map((spot: ParkingSpot) => this.toDomain(spot));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.parkingSpot.delete({
      where: { id },
    });
  }
}
