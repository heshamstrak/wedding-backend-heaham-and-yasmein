import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const origins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  app.enableCors({
    origin: origins.length ? origins : '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-admin-token'],
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Admin panel: http://localhost:${port}/admin`);
}
bootstrap();
