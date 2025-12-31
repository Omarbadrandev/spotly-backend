# OpenAPI Specification Generation

## How It Works

The OpenAPI specification is **automatically generated at runtime** when your NestJS application starts. Here's the process:

### 1. **Runtime Scanning** (`SwaggerModule.createDocument()`)

When `SwaggerModule.createDocument(app, config)` is called in `main.ts`, it:

- **Scans all modules** registered in your NestJS application
- **Discovers controllers** decorated with `@Controller()`
- **Extracts route information** from decorators like `@Post()`, `@Get()`, `@Put()`, `@Delete()`
- **Reads Swagger decorators** like `@ApiTags()`, `@ApiOperation()`, `@ApiBody()`, `@ApiResponse()`
- **Inspects DTO classes** to generate request/response schemas

### 2. **Schema Generation** (via `nestjs-zod`)

For DTOs that extend `createZodDto()`:

- **Zod schemas** are automatically converted to OpenAPI JSON schemas
- **Validation rules** (min, max, required, etc.) are included in the spec
- **Type information** is inferred from Zod types (string, number, date, etc.)

Example:
```typescript
// Zod schema
const createParkingSpotSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  latitude: z.number().min(-90).max(90),
});

// Automatically becomes OpenAPI schema:
// {
//   "type": "object",
//   "required": ["name", "latitude"],
//   "properties": {
//     "name": { "type": "string", "minLength": 1 },
//     "latitude": { "type": "number", "minimum": -90, "maximum": 90 }
//   }
// }
```

### 3. **Document Assembly**

The final OpenAPI document combines:

- **Metadata** from `DocumentBuilder`:
  - Title, description, version
  - Tags and their descriptions
  - Server URLs
  - Security schemes (if configured)

- **Paths** from controllers:
  - HTTP methods (GET, POST, etc.)
  - Path parameters
  - Query parameters
  - Request bodies
  - Response schemas

- **Components**:
  - Schema definitions (from DTOs)
  - Response definitions
  - Security schemes

## Accessing the Generated Spec

Once your server is running, you can access the OpenAPI specification in multiple formats:

### 1. **Swagger UI** (Interactive Documentation)
```
http://localhost:3000/api/docs
```
- Visual, interactive API documentation
- Try out endpoints directly from the browser
- See request/response examples

### 2. **OpenAPI JSON**
```
http://localhost:3000/api/docs-json
```
- Raw JSON format of the OpenAPI specification
- Can be imported into Postman, Insomnia, or other API tools
- Can be used for code generation

### 3. **OpenAPI YAML**
```
http://localhost:3000/api/docs-yaml
```
- YAML format of the specification
- Human-readable format
- Can be version controlled

## What Gets Generated

### From Your Controller:
```typescript
@ApiTags('parking-spots')
@Controller('parking-spots')
export class ParkingSpotsController {
  @Post()
  @ApiOperation({ summary: 'Create a new parking spot' })
  @ApiCreatedResponse({ type: ParkingSpotResponseDto })
  async create(@Body() dto: CreateParkingSpotDto) { ... }
}
```

Generates:
```json
{
  "paths": {
    "/parking-spots": {
      "post": {
        "tags": ["parking-spots"],
        "summary": "Create a new parking spot",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/CreateParkingSpotDto" }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Parking spot successfully created",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/ParkingSpotResponseDto" }
              }
            }
          }
        }
      }
    }
  }
}
```

### From Your DTOs:
```typescript
export class CreateParkingSpotDto extends createZodDto(z.object({
  name: z.string().min(1),
  latitude: z.number().min(-90).max(90),
}))
```

Generates:
```json
{
  "components": {
    "schemas": {
      "CreateParkingSpotDto": {
        "type": "object",
        "required": ["name", "latitude"],
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "latitude": {
            "type": "number",
            "minimum": -90,
            "maximum": 90
          }
        }
      }
    }
  }
}
```

## Exporting the Spec File

The OpenAPI spec is generated at runtime, but you can export it to a file for version control, CI/CD, or sharing with other tools.

### Method 1: Using the Export Script (Recommended)

**Prerequisites:** Your server must be running on `http://localhost:3000`

```bash
# Export to openapi.json
pnpm run openapi:export
```

This will create `openapi.json` in the project root.

### Method 2: Manual Export with curl

```bash
# Get JSON spec
curl http://localhost:3000/api/docs-json > openapi.json

# Get YAML spec  
curl http://localhost:3000/api/docs-yaml > openapi.yaml
```

### Method 3: Using the Fetch Script

```bash
# Using the shell script
bash apps/spotly-backend/scripts/fetch-openapi.sh

# Or with custom port/output
PORT=4000 OUTPUT_FILE=my-spec.json bash apps/spotly-backend/scripts/fetch-openapi.sh
```

### Important Notes

⚠️ **The spec file is NOT automatically generated** - it's created on-demand when you:
1. Start your server (`pnpm run serve`)
2. Export it using one of the methods above

The spec is always available at runtime via:
- Swagger UI: `http://localhost:3000/api/docs`
- JSON endpoint: `http://localhost:3000/api/docs-json`
- YAML endpoint: `http://localhost:3000/api/docs-yaml`

For CI/CD, you can:
1. Start the server in the background
2. Wait for it to be ready
3. Export the spec
4. Stop the server

## Key Points

1. **No build step required** - Specs are generated at runtime
2. **Always up-to-date** - Reflects your current code automatically
3. **Type-safe** - Uses your actual TypeScript types and Zod schemas
4. **Single source of truth** - Your code IS the specification
5. **Framework integration** - Works seamlessly with NestJS decorators

## Customization

You can customize the generation process:

- **Add more metadata** in `DocumentBuilder`
- **Add security schemes** (JWT, API keys, etc.)
- **Add examples** using `@ApiProperty({ example: '...' })`
- **Group endpoints** using `@ApiTags()`
- **Add descriptions** using `@ApiOperation()` and `@ApiResponse()`

