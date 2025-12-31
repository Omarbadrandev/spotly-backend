# Spotly Backend

Backend service for the Spotly application.

## Quick Start

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm run prisma:generate

# Start development server
pnpm run serve

# Build
pnpm run build
```

## Documentation

All documentation has been moved to the [`docs/`](./docs/) folder:

- **[Architecture & Structure](./docs/ARCHITECTURE.md)** - System architecture and design patterns
- **[Main Documentation](./docs/README.md)** - Setup and usage guide
- **[OpenAPI Generation Guide](./docs/OPENAPI_GENERATION.md)** - How OpenAPI specs are generated
- **[Core Package Documentation](./docs/core-README.md)** - Core package details

## API Documentation

When the server is running, visit:
- **Swagger UI**: http://localhost:3000/api/docs
- **OpenAPI JSON**: http://localhost:3000/api/docs-json
- **OpenAPI YAML**: http://localhost:3000/api/docs-yaml

## Scripts

- `pnpm run serve` - Start development server
- `pnpm run build` - Build all projects
- `pnpm run prisma:generate` - Generate Prisma client
- `pnpm run openapi:export` - Export OpenAPI spec (server must be running)

