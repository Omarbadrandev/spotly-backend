import { Module } from '@nestjs/common';
import { ParkingSpotsController } from './parking-spots.controller';
import {
  ParkingSpotsRepository_Injectable,
  ParkingSpotsService_Injectable,
} from './parking-spots/parking-spots.injectables';
import { ParkingSpotsApiService } from './parking-spots/parking-spots.service';

@Module({
  controllers: [ParkingSpotsController],
  providers: [
    ParkingSpotsRepository_Injectable,
    ParkingSpotsService_Injectable,
    ParkingSpotsApiService,
  ],
  exports: [ParkingSpotsService_Injectable],
})
export class ParkingSpotsModule {}
