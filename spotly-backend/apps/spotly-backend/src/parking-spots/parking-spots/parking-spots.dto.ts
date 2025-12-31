import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createParkingSpotSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export class CreateParkingSpotDto extends createZodDto(
  createParkingSpotSchema
) {}

export const parkingSpotResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export class ParkingSpotResponseDto extends createZodDto(
  parkingSpotResponseSchema
) {}
