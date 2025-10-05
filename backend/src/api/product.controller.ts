import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ScrapeService } from '../scrape/scrape.service';
@Controller('api/product')
export class ProductController {
  constructor(private readonly scrapeService: ScrapeService) {}
  @Get('detail')
  async getProductDetail(@Query('url') url: string) {
    if (!url) return { error: 'missing url' };
    const res = await this.scrapeService.scheduleProductScrape(url);
    return res;
  }
  @Post('refresh')
  async refreshProduct(@Body('url') url: string) {
    const res = await this.scrapeService.scheduleProductScrape(url, true);
    return res;
  }
}
