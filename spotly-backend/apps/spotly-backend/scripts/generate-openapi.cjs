/**
 * Script to generate OpenAPI specification file
 * This script bootstraps the NestJS app and exports the OpenAPI spec to a file
 */

const { NestFactory } = require('@nestjs/core');
const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger');
const { writeFileSync } = require('fs');
const { join } = require('path');
const { AppModule } = require('../src/app/app.module');

async function generateOpenApiSpec() {
  // Create NestJS application instance (without starting the server)
  const app = await NestFactory.create(AppModule, {
    logger: false, // Suppress logs during spec generation
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Configure Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Spotly Backend API')
    .setDescription('API documentation for Spotly Backend')
    .setVersion('1.0')
    .addTag('parking-spots', 'Parking spots management')
    .build();

  // Generate the OpenAPI document
  const document = SwaggerModule.createDocument(app, config);

  // Get the output directory (project root)
  // From apps/spotly-backend/scripts/ to workspace root
  const outputDir = join(__dirname, '../../../..');

  // Write JSON file
  const jsonPath = join(outputDir, 'openapi.json');
  writeFileSync(jsonPath, JSON.stringify(document, null, 2));
  console.log(`✅ OpenAPI JSON spec generated: ${jsonPath}`);

  await app.close();
  process.exit(0);
}

generateOpenApiSpec().catch((error) => {
  console.error('❌ Error generating OpenAPI spec:', error);
  process.exit(1);
});

