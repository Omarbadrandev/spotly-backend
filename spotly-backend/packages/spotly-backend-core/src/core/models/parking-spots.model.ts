import z from 'zod';
import { baseModel } from './shared.model';

export const parkingSpotModel = baseModel.extend({
  name: z.string(),
  description: z.string().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  paid: z.boolean(),
});
export type ParkingSpotModel = z.infer<typeof parkingSpotModel>;
