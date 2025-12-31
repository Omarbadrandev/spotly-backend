import { Injectable } from '@nestjs/common';
import {
  CreateParkingSpotDto,
  ParkingSpotsListResponseDto,
} from './parking-spots.dto';
import { ParkingSpotsService_Injectable } from './parking-spots.injectables';
import { CreateParkingSpotInput } from '@spotly-backend/core';

@Injectable()
export class ParkingSpotsApiService {
  constructor(
    private readonly parkingSpotsService: ParkingSpotsService_Injectable
  ) {}

  async createParkingSpot(createParkingSpotDto: CreateParkingSpotDto) {
    const input: CreateParkingSpotInput = {
      name: createParkingSpotDto.name,
      description: createParkingSpotDto.description ?? null,
      latitude: createParkingSpotDto.latitude,
      longitude: createParkingSpotDto.longitude,
    };
    return this.parkingSpotsService.create(input);
  }

  async listParkingSpots(): Promise<ParkingSpotsListResponseDto> {
    return this.parkingSpotsService.list();
  }
}
