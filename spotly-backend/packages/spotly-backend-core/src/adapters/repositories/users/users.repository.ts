import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { toISOStringOrValue, User, userSchema } from '@spotly-backend/core';

export interface CreateUserInput {
  name: string;
  surname: string;
  phone?: string | null;
  email: string;
}

export class UsersRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(user: PrismaUser): User {
    return userSchema.parse({
      id: user.id,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      email: user.email,
      createdAt: toISOStringOrValue(user.createdAt),
      updatedAt: toISOStringOrValue(user.updatedAt),
    });
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        surname: data.surname,
        phone: data.phone ?? null,
        email: data.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return this.toDomain(user);
  }

  async listUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user: PrismaUser) => this.toDomain(user));
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.toDomain(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.toDomain(user);
  }
}
