# @spotly-backend/core

Core package for Spotly Backend containing shared business logic, database services, and domain entities.

## Structure

```
src/
├── core/           # Domain entities and business logic
├── services/       # Business logic services
├── adapters/       # External API adapters and Databases
└── index.ts        # Public API exports
```

## Database

This package uses Prisma for database management. The Prisma schema is located in `prisma/schema.prisma`.

### Prisma Commands

```bash
# Generate Prisma Client
pnpm prisma:generate
# or
npx nx run @spotly-backend/core:prisma:generate

# Create and run migrations
pnpm prisma:migrate

# Open Prisma Studio
pnpm prisma:studio

# Format schema
pnpm prisma:format

# Validate schema
pnpm prisma:validate
```

## Usage

### Import Database Module

```typescript
import { DatabaseModule } from '@spotly-backend/core';

@Module({
  imports: [DatabaseModule],
  // ...
})
export class AppModule {}
```

### Use Prisma Service

```typescript
import { PrismaService } from '@spotly-backend/core';

@Injectable()
export class MyService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
```

### Use Domain Services

```typescript
import { UserService } from '@spotly-backend/core';

@Injectable()
export class MyController {
  constructor(private readonly userService: UserService) {}

  async getUsers() {
    return this.userService.findAll();
  }
}
```

## Development

The Prisma Client is automatically generated before building. The build process includes:

1. Prisma Client generation
2. TypeScript compilation
3. Package bundling

## Environment Variables

Make sure to set the `DATABASE_URL` environment variable:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/spotly?schema=public"
```


