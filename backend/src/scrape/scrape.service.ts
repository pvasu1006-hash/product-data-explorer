import { Injectable } from '@nestjs/common';
import PQueue from 'p-queue';
import { scrapeProduct } from './crawler';
import { DrizzleService } from '../db/drizzle';
@Injectable()
export class ScrapeService {
  private queue: PQueue;
  private db: any;
  constructor(private readonly drizzle: DrizzleService) {
    this.queue = new PQueue({ concurrency: Number(process.env.CRAWLEE_MAX_CONCURRENCY||2) });
    this.db = (drizzle as any).db;
  }
  async scheduleProductScrape(url: string, force=false) {
    if (!url) return { error: 'missing url' };
    const TTL_MS = 24*60*60*1000;
    return this.queue.add(async ()=>{
      try {
        const results = await scrapeProduct(url);
        const r = results?.[0]||null;
        if (!r) throw new Error('no data');
        return { status: 'scraped', data: r };
      } catch (err:any) {
        return { status:'error', message: String(err) };
      }
    });
  }
}
