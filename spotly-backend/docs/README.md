# Spotly Backend

Backend service for the Spotly application, providing APIs for authentication, user management, data processing, and core business logic.

## 🏗️ Architecture

This is a monorepo built with [Nx](https://nx.dev/) and [NestJS](https://nestjs.com/), organized as follows:

- **`apps/spotly-backend`** - Main NestJS application (depends on NestJS)
- **`apps/spotly-backend-e2e`** - End-to-end tests
- **`packages/spotly-backend-core`** - Shared core library with business logic (framework-agnostic)

### Package Dependencies

**Core Package (`@spotly-backend/core`):**
- ✅ **Framework-agnostic** - No NestJS dependencies
- ✅ Can be used with any framework (NestJS, Express, Fastify, etc.)
- ✅ Contains pure TypeScript business logic, domain entities, and database adapters
- ✅ Only depends on `@prisma/client` for database access (when implemented)

**App Package (`@spotly-backend/spotly-backend`):**
- ✅ Depends on NestJS (`@nestjs/common`, `@nestjs/core`, etc.)
- ✅ Wraps core package services with NestJS decorators and modules
- ✅ Provides HTTP endpoints, middleware, and NestJS-specific features

This separation allows the core business logic to be framework-independent and reusable across different applications or frameworks.

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- pnpm (managed via corepack)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
npx nx serve @spotly-backend/spotly-backend
```

The application will be available at `http://localhost:3000/api`

### Building

Build the application:

```bash
npx nx build @spotly-backend/spotly-backend
```

Build all projects:

```bash
npx nx run-many -t build
```

## 📦 Package Management

This project uses **pnpm** with workspaces. The workspace configuration is defined in `pnpm-workspace.yaml`.

### Available Scripts

- `pnpm run commit` - Interactive commit using commitizen (conventional commits)

## 🧪 Testing

Run unit tests:

```bash
npx nx test @spotly-backend/spotly-backend
```

Run e2e tests:

```bash
npx nx e2e @spotly-backend/spotly-backend-e2e
```

Run tests for all projects:

```bash
npx nx run-many -t test
```

## 🐳 Docker

Build the Docker image:

```bash
npx nx docker:build @spotly-backend/spotly-backend
```

Run the container:

```bash
npx nx docker:run @spotly-backend/spotly-backend -p 3000:3000
```

The Dockerfile uses corepack to manage pnpm and is optimized for production builds.

## 🗄️ Database

This project uses [Prisma](https://www.prisma.io/) for database management. The schema is located in `packages/spotly-backend-core/prisma/schema.prisma`.

## 🛠️ Tech Stack

- **Framework**: NestJS 11
- **Language**: TypeScript 5.9
- **Build Tool**: Nx 22
- **Package Manager**: pnpm (via corepack)
- **Database**: Prisma 7
- **Testing**: Jest
- **Linting**: ESLint
- **Code Formatting**: Prettier

## 📝 Code Quality

- **Linting**: `npx nx lint @spotly-backend/spotly-backend`
- **Type Checking**: `npx nx typecheck @spotly-backend/spotly-backend`
- **Formatting**: Prettier is configured

## 🏷️ Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) via commitizen. Use:

```bash
pnpm run commit
```

This will guide you through creating properly formatted commit messages.

## 📚 Project Structure

```
spotly-backend/
├── apps/
│   ├── spotly-backend/          # Main application
│   └── spotly-backend-e2e/      # E2E tests
├── packages/
│   └── spotly-backend-core/     # Shared core library
├── nx.json                       # Nx configuration
├── pnpm-workspace.yaml          # pnpm workspace config
└── package.json                  # Root package.json
```

## 🔧 Nx Commands

Common Nx commands:

- `npx nx graph` - Visualize the dependency graph
- `npx nx affected:test` - Run tests for affected projects
- `npx nx affected:build` - Build affected projects
- `npx nx reset` - Clear Nx cache

## 📄 License

MIT
