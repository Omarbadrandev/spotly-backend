import { CreateUserInput, User, UsersRepository } from '@spotly-backend/core';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: CreateUserInput): Promise<User> {
    return this.usersRepository.createUser(data);
  }

  async listUsers(): Promise<User[]> {
    return this.usersRepository.listUsers();
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.getUserByEmail(email);
  }
}
