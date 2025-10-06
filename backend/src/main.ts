import 'reflect-metadata'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as rateLimit from 'express-rate-limit';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((rateLimit as any).default({ windowMs: 60_000, max: 200 }));
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT || 4000);
  console.log('Backend running on', process.env.PORT || 4000);
}
bootstrap();
