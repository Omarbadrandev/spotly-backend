import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { UsersService_Injectable } from './users.injectables';

@Injectable()
export class UsersApiService {
  constructor(private readonly usersService: UsersService_Injectable) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async listUsers() {
    return this.usersService.listUsers();
  }

  async getUserById(id: string) {
    return this.usersService.getUserById(id);
  }

  async getUserByEmail(email: string) {
    return this.usersService.getUserByEmail(email);
  }
}
