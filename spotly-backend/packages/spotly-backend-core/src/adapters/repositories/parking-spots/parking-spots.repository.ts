import { PrismaClient, ParkingSpot } from '@prisma/client';
import { z } from 'zod';

export interface CreateParkingSpotInput {
  name: string;
  description?: string | null;
  latitude: number;
  longitude: number;
}

export const parkingSpotDomainSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  createdAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/, {
      message: 'Invalid datetime format. Expected ISO 8601 format.',
    }),
  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/, {
      message: 'Invalid datetime format. Expected ISO 8601 format.',
    }),
});

export type ParkingSpotDomain = z.infer<typeof parkingSpotDomainSchema>;

export class ParkingSpotsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(spot: ParkingSpot): ParkingSpotDomain {
    return parkingSpotDomainSchema.parse({
      id: spot.id,
      name: spot.name,
      description: spot.description,
      latitude: spot.latitude,
      longitude: spot.longitude,
      createdAt:
        spot.createdAt instanceof Date
          ? spot.createdAt.toISOString()
          : spot.createdAt,
      updatedAt:
        spot.updatedAt instanceof Date
          ? spot.updatedAt.toISOString()
          : spot.updatedAt,
    });
  }

  async create(data: CreateParkingSpotInput): Promise<ParkingSpotDomain> {
    const spot = await this.prisma.parkingSpot.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
    return this.toDomain(spot);
  }

  // TODO: add pagination and query parameters
  async listParkingSpots(): Promise<ParkingSpotDomain[]> {
    const spots = await this.prisma.parkingSpot.findMany();
    return spots.map((spot) => this.toDomain(spot));
  }
}
