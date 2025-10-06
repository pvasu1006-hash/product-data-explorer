import { Injectable } from '@nestjs/common';
import PQueue from 'p-queue';
import { scrapeProduct } from './crawler';
import { DrizzleService } from '../db/drizzle';
@Injectable()
export class ScrapeService {
  private queue: PQueue;
  private db: any;
  private pool: any;
  constructor(private readonly drizzle: DrizzleService) {
    this.queue = new PQueue({ concurrency: Number(process.env.CRAWLEE_MAX_CONCURRENCY||2) });
    this.db = (drizzle as any).db;
    this.pool = (drizzle as any).pool;
  }

  async scheduleProductScrape(url: string, force=false) {
    if (!url) return { error: 'missing url' };
    const TTL_MS = 24*60*60*1000;
    // Check existing product
    try {
      const existing = await this.pool.query('SELECT * FROM products WHERE source_url=$1', [url]);
      if (existing.rows.length > 0 && !force) {
        const last = existing.rows[0].scraped_at ? new Date(existing.rows[0].scraped_at).getTime() : 0;
        if (Date.now() - last < TTL_MS) {
          return { status: 'cached', data: existing.rows[0] };
        }
      }
    } catch (err) {
      console.warn('DB check failed', err);
    }

    return this.queue.add(async ()=>{
      try {
        const results = await scrapeProduct(url);
        const r = results?.[0]||null;
        if (!r) throw new Error('no data');
        // Upsert into Postgres using ON CONFLICT
        const q = `
          INSERT INTO products (source_url, title, price, image, description, scraped_at)
          VALUES ($1,$2,$3,$4,$5,NOW())
          ON CONFLICT (source_url) DO UPDATE SET
            title = EXCLUDED.title,
            price = EXCLUDED.price,
            image = EXCLUDED.image,
            description = EXCLUDED.description,
            scraped_at = NOW()
          RETURNING *;
        `;
        const vals = [r.source_url || url, r.title || r.title, r.price || r.price, r.image || r.image, r.description || r.description];
        const inserted = await this.pool.query(q, vals);
        return { status: 'scraped', data: inserted.rows[0] };
      } catch (err:any) {
        console.error('Scrape error', err);
        return { status: 'error', message: String(err) };
      }
    });
  }
}
