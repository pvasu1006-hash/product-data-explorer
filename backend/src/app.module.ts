import { Module } from '@nestjs/common';
import { ProductController } from './api/product.controller';
import { ScrapeService } from './scrape/scrape.service';
import { DrizzleService } from './db/drizzle';
@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ScrapeService, DrizzleService],
})
export class AppModule {}
