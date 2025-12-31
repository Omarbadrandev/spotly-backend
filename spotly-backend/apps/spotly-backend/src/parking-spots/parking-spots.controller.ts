import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  CreateParkingSpotDto,
  ParkingSpotResponseDto,
  ParkingSpotsListResponseDto,
} from './parking-spots/parking-spots.dto';
import { ParkingSpotsApiService } from './parking-spots/parking-spots.service';

@ApiTags('parking-spots')
@Controller('parking-spots')
export class ParkingSpotsController {
  constructor(
    private readonly parkingSpotsApiService: ParkingSpotsApiService
  ) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new parking spot',
    description: 'Creates a new parking spot with the provided details',
  })
  @ApiBody({
    type: CreateParkingSpotDto,
    description: 'Parking spot creation data',
  })
  @ApiCreatedResponse({
    description: 'Parking spot successfully created',
    type: ParkingSpotResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async create(@Body() createParkingSpotDto: CreateParkingSpotDto) {
    return this.parkingSpotsApiService.createParkingSpot(createParkingSpotDto);
  }

  @Get()
  @Version('1')
  @ApiOperation({
    summary: 'List all parking spots',
    description: 'Retrieves a list of all parking spots',
  })
  @ApiOkResponse({
    description: 'Parking spots successfully retrieved',
    type: ParkingSpotsListResponseDto,
  })
  async listParkingSpots() {
    return this.parkingSpotsApiService.listParkingSpots();
  }
}
