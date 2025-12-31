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

export class ParkingSpotResponseDto extends createZodDto(
  parkingSpotResponseSchema
) {}

export const parkingSpotsListResponseSchema = z.object({
  parkingSpots: z.array(parkingSpotResponseSchema),
});

export class ParkingSpotsListResponseDto extends createZodDto(
  parkingSpotsListResponseSchema
) {}
