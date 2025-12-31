# Architecture & Structure

This document describes the architecture, structure, and design patterns used in the Spotly Backend.

## Table of Contents

- [Overview](#overview)
- [Monorepo Structure](#monorepo-structure)
- [Architectural Layers](#architectural-layers)
- [Package Organization](#package-organization)
- [Data Flow](#data-flow)
- [Dependency Rules](#dependency-rules)
- [Module Structure](#module-structure)
- [Key Patterns](#key-patterns)

## Overview

The Spotly Backend follows **Clean Architecture** (also known as Hexagonal Architecture) principles, organized as an **Nx monorepo**. The architecture separates business logic from framework-specific code, ensuring the core domain remains framework-agnostic and testable.

### Key Principles

1. **Framework Independence**: Core business logic has no framework dependencies
2. **Dependency Inversion**: Dependencies point inward toward the domain
3. **Separation of Concerns**: Clear boundaries between layers
4. **Testability**: Each layer can be tested in isolation

## Monorepo Structure

```
spotly-backend/
├── apps/
│   ├── spotly-backend/          # Main NestJS application
│   └── spotly-backend-e2e/      # End-to-end tests
├── packages/
│   └── spotly-backend-core/     # Core business logic (framework-agnostic)
├── docs/                        # Documentation
├── dist/                        # Build outputs
└── node_modules/                # Dependencies
```

### Apps

- **`apps/spotly-backend`**: The main NestJS application that provides HTTP endpoints
- **`apps/spotly-backend-e2e`**: End-to-end tests for the application

### Packages

- **`packages/spotly-backend-core`**: Framework-agnostic core package containing:
  - Domain entities and business logic
  - Services (use cases)
  - Repository interfaces and implementations
  - Database adapters (Prisma)

## Architectural Layers

The architecture follows Clean Architecture with three main layers:

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                     │
│  (apps/spotly-backend)                                   │
│  - Controllers (HTTP endpoints)                          │
│  - DTOs (Request/Response validation)                    │
│  - NestJS Modules                                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│  (apps/spotly-backend/src/*/parking-spots.service.ts)  │
│  - API Services (orchestration)                         │
│  - DTO transformations                                   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                      Domain Layer                        │
│  (packages/spotly-backend-core/src/core/)                │
│  - Business Logic Services                              │
│  - Domain Models                                         │
│  - Use Cases                                             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   Infrastructure Layer                   │
│  (packages/spotly-backend-core/src/adapters/)           │
│  - Repository Implementations                           │
│  - Database Adapters (Prisma)                           │
│  - External Service Adapters                            │
└─────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### 1. Presentation Layer (`apps/spotly-backend`)

**Purpose**: Handle HTTP requests and responses, framework-specific concerns

**Components**:
- **Controllers**: Define HTTP endpoints, handle routing
- **DTOs**: Validate and transform request/response data
- **Modules**: Configure NestJS dependency injection
- **OpenAPI Decorators**: Generate API documentation

**Example**:
```typescript
@Controller('parking-spots')
export class ParkingSpotsController {
  @Get()
  async listParkingSpots(): Promise<ParkingSpotsListResponseDto> {
    return this.apiService.listParkingSpots();
  }
}
```

#### 2. Application Layer (`apps/spotly-backend/src/*/parking-spots.service.ts`)

**Purpose**: Orchestrate domain services, transform between DTOs and domain types

**Components**:
- **API Services**: Bridge between controllers and domain services
- **DTO Transformations**: Convert between API DTOs and domain types

**Example**:
```typescript
@Injectable()
export class ParkingSpotsApiService {
  async createParkingSpot(dto: CreateParkingSpotDto) {
    const input: CreateParkingSpotInput = { /* transform */ };
    return this.domainService.create(input);
  }
}
```

#### 3. Domain Layer (`packages/spotly-backend-core/src/core/`)

**Purpose**: Contains pure business logic, independent of frameworks and infrastructure

**Components**:
- **Services**: Business logic and use cases
- **Domain Models**: Core entities and value objects
- **Interfaces**: Repository and service contracts

**Example**:
```typescript
export class ParkingSpotsService {
  async create(input: CreateParkingSpotInput): Promise<ParkingSpotDomain> {
    return this.repository.create(input);
  }
}
```

#### 4. Infrastructure Layer (`packages/spotly-backend-core/src/adapters/`)

**Purpose**: Implementations of domain interfaces, external integrations

**Components**:
- **Repositories**: Database access implementations
- **Adapters**: External service integrations
- **Data Transformations**: Convert between Prisma types and domain types

**Example**:
```typescript
export class ParkingSpotsRepository {
  private toDomain(spot: ParkingSpot): ParkingSpotDomain {
    return parkingSpotDomainSchema.parse({
      // Convert Prisma Date to ISO string
      createdAt: spot.createdAt.toISOString(),
      // ...
    });
  }
}
```

## Package Organization

### Core Package Structure

```
packages/spotly-backend-core/
├── src/
│   ├── core/                    # Domain layer
│   │   └── services/           # Business logic services
│   ├── adapters/                # Infrastructure layer
│   │   └── repositories/       # Repository implementations
│   └── index.ts                 # Public API exports
├── prisma/                      # Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
└── package.json
```

### App Package Structure

```
apps/spotly-backend/
├── src/
│   ├── app/                     # Root module
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   └── app.service.ts
│   ├── parking-spots/           # Feature module
│   │   ├── parking-spots.module.ts
│   │   ├── parking-spots.controller.ts
│   │   └── parking-spots/       # Feature implementation
│   │       ├── parking-spots.dto.ts
│   │       ├── parking-spots.service.ts
│   │       └── parking-spots.injectables.ts
│   └── main.ts                  # Application bootstrap
├── scripts/                     # Utility scripts
└── webpack.config.js            # Build configuration
```

## Data Flow

### Request Flow

```
HTTP Request
    ↓
Controller (NestJS)
    ↓
API Service (DTO → Domain Input)
    ↓
Domain Service (Business Logic)
    ↓
Repository (Domain → Prisma)
    ↓
Database (Prisma)
```

### Response Flow

```
Database (Prisma)
    ↓
Repository (Prisma → Domain, Zod validation)
    ↓
Domain Service (Domain)
    ↓
API Service (Domain → DTO)
    ↓
Controller (DTO)
    ↓
HTTP Response (JSON)
```

### Example: Creating a Parking Spot

1. **HTTP Request** → `POST /api/v1/parking-spots`
2. **Controller** → Validates `CreateParkingSpotDto` using Zod
3. **API Service** → Transforms DTO to `CreateParkingSpotInput`
4. **Domain Service** → Executes business logic
5. **Repository** → Converts domain input to Prisma format, saves to DB
6. **Repository** → Converts Prisma result to domain type using Zod schema
7. **Domain Service** → Returns `ParkingSpotDomain`
8. **API Service** → Returns domain type (matches DTO structure)
9. **Controller** → Returns JSON response

## Dependency Rules

### Dependency Direction

```
Presentation → Application → Domain ← Infrastructure
```

**Rules**:
1. **Domain** has no dependencies (except Zod for validation)
2. **Infrastructure** depends on **Domain** (implements domain interfaces)
3. **Application** depends on **Domain** (uses domain services)
4. **Presentation** depends on **Application** and **Domain** (uses both)

### Package Dependencies

```
apps/spotly-backend
    ↓ depends on
packages/spotly-backend-core
    ↓ depends on
@prisma/client, zod
```

**Core Package Dependencies**:
- ✅ `@prisma/client` - Database access
- ✅ `zod` - Schema validation
- ❌ No NestJS dependencies
- ❌ No Express/Fastify dependencies
- ❌ No HTTP framework dependencies

**App Package Dependencies**:
- ✅ `@nestjs/*` - NestJS framework
- ✅ `@spotly-backend/core` - Core business logic
- ✅ `nestjs-zod` - Zod integration with NestJS
- ✅ `@nestjs/swagger` - OpenAPI documentation

## Module Structure

### Feature Module Pattern

Each feature follows a consistent structure:

```
parking-spots/
├── parking-spots.module.ts      # NestJS module configuration
├── parking-spots.controller.ts  # HTTP endpoints
└── parking-spots/               # Feature implementation
    ├── parking-spots.dto.ts     # Request/Response DTOs
    ├── parking-spots.service.ts # API service (orchestration)
    └── parking-spots.injectables.ts # Dependency injection setup
```

### Module Configuration

```typescript
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
```

## Key Patterns

### 1. Dependency Injection Pattern

**Injectables** (`parking-spots.injectables.ts`):
- Bridge between framework-agnostic core and NestJS
- Extend core classes to make them injectable
- Configure dependency injection

```typescript
@Injectable()
export class ParkingSpotsRepository_Injectable 
  extends ParkingSpotsRepository {
  constructor() {
    super(new PrismaClient());
  }
}
```

### 2. Repository Pattern

**Purpose**: Abstract database access, enable testing

**Structure**:
- **Interface**: Defined in domain layer (implicit via class)
- **Implementation**: In infrastructure layer
- **Domain Types**: Uses Zod schemas for validation

```typescript
// Domain service uses repository interface
export class ParkingSpotsService {
  constructor(private readonly repository: ParkingSpotsRepository) {}
}

// Infrastructure implements repository
export class ParkingSpotsRepository {
  async create(data: CreateParkingSpotInput): Promise<ParkingSpotDomain> {
    // Prisma access + domain conversion
  }
}
```

### 3. DTO Pattern

**Purpose**: Validate and transform API requests/responses

**Implementation**:
- Uses Zod schemas for validation
- `nestjs-zod` for NestJS integration
- Automatic OpenAPI schema generation

```typescript
export const createParkingSpotSchema = z.object({
  name: z.string().min(1),
  latitude: z.number().min(-90).max(90),
});

export class CreateParkingSpotDto extends createZodDto(
  createParkingSpotSchema
) {}
```

### 4. Domain Model Pattern

**Purpose**: Represent business entities with validation

**Implementation**:
- Zod schemas define domain types
- Repository converts Prisma types to domain types
- Ensures data integrity and validation

```typescript
export const parkingSpotDomainSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/),
});

export type ParkingSpotDomain = z.infer<typeof parkingSpotDomainSchema>;
```

### 5. Adapter Pattern

**Purpose**: Convert between external formats and domain types

**Example**: Prisma `Date` → Domain ISO string

```typescript
private toDomain(spot: ParkingSpot): ParkingSpotDomain {
  return parkingSpotDomainSchema.parse({
    createdAt: spot.createdAt.toISOString(),
    // ... other fields
  });
}
```

## Type System

### Type Flow

```
Prisma Types (Date objects)
    ↓
Domain Types (ISO strings, Zod validated)
    ↓
DTO Types (API contracts, Zod validated)
```

### Type Conversions

1. **Prisma → Domain**: Repository `toDomain()` method
   - Converts `Date` → ISO string
   - Validates with Zod schema

2. **DTO → Domain Input**: API Service
   - Transforms request DTOs to domain input types

3. **Domain → DTO**: Automatic (same structure)
   - Domain types match DTO structure
   - No transformation needed

## Testing Strategy

### Unit Tests
- **Domain Services**: Test business logic in isolation
- **Repositories**: Mock Prisma client
- **API Services**: Mock domain services

### Integration Tests
- **E2E Tests**: Test full request/response cycle
- **Database Tests**: Use test database

### Test Structure
```
apps/spotly-backend-e2e/     # E2E tests
packages/spotly-backend-core/ # Unit tests (when added)
```

## Build System

### Nx Monorepo
- **Project Graph**: Tracks dependencies between projects
- **Build Caching**: Caches build outputs
- **Task Orchestration**: Runs tasks in dependency order

### Build Process

1. **Core Package** (`spotly-backend-core`):
   - TypeScript compilation
   - Generates type definitions
   - Output: `dist/packages/spotly-backend-core`

2. **App Package** (`spotly-backend`):
   - Webpack bundling
   - Includes core package
   - Output: `dist/apps/spotly-backend`

### Module Resolution

- **TypeScript**: Uses `tsconfig.base.json` paths
- **Webpack**: Uses `tsconfig-paths-webpack-plugin`
- **Runtime**: Nx handles workspace package resolution

## Configuration Files

### Key Configuration Files

- **`tsconfig.base.json`**: Base TypeScript config, path mappings
- **`nx.json`**: Nx workspace configuration
- **`package.json`**: Root package.json with scripts
- **`project.json`**: Per-project Nx configuration
- **`webpack.config.js`**: Webpack configuration for NestJS app

## Best Practices

### Adding a New Feature

1. **Create Domain Types** (`packages/spotly-backend-core`):
   - Define Zod schema in repository
   - Create domain type

2. **Implement Repository** (`packages/spotly-backend-core`):
   - Implement repository class
   - Add `toDomain()` conversion

3. **Create Domain Service** (`packages/spotly-backend-core`):
   - Implement business logic
   - Use repository interface

4. **Create API Layer** (`apps/spotly-backend`):
   - Create DTOs with Zod schemas
   - Create API service
   - Create controller with OpenAPI decorators
   - Create module and injectables

5. **Register Module** (`apps/spotly-backend`):
   - Import feature module in `AppModule`

### Code Organization Rules

1. **Core Package**:
   - ✅ Business logic
   - ✅ Domain models
   - ✅ Repository interfaces/implementations
   - ❌ HTTP concerns
   - ❌ Framework-specific code

2. **App Package**:
   - ✅ HTTP endpoints
   - ✅ DTOs
   - ✅ NestJS modules
   - ✅ API orchestration
   - ❌ Direct database access (use repositories)

3. **Dependency Direction**:
   - Always point dependencies inward
   - Core never depends on app
   - Infrastructure implements domain interfaces

## Summary

The Spotly Backend architecture provides:

- ✅ **Separation of Concerns**: Clear boundaries between layers
- ✅ **Framework Independence**: Core logic can be reused
- ✅ **Testability**: Each layer can be tested independently
- ✅ **Type Safety**: Zod schemas ensure runtime validation
- ✅ **Scalability**: Easy to add new features following the pattern
- ✅ **Maintainability**: Clear structure and organization

This architecture ensures the codebase remains maintainable, testable, and adaptable to future changes.

