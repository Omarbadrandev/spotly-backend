import {
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Version,
  Controller,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './users/users.dto';
import { UsersApiService } from './users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersApiService: UsersApiService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the provided details',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User creation data',
  })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: Object,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersApiService.createUser(createUserDto);
  }
}
