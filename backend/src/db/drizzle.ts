import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
export class DrizzleService {
  db: any;
  pool: any;
  constructor() {
    const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/productdb';
    const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
    this.pool = pool;
    this.db = drizzle(pool);
    console.log('Drizzle connected to Postgres');
    // initialize schema if needed (simple check)
    this.init();
  }

  async init() {
    const sql = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        source_url TEXT UNIQUE NOT NULL,
        title TEXT,
        price TEXT,
        image TEXT,
        description TEXT,
        scraped_at TIMESTAMP DEFAULT NOW()
      );
    `;
    try {
      await this.pool.query(sql);
      console.log('Ensured products table exists');
    } catch (err) {
      console.error('Failed to init DB', err);
    }
  }
}
