import { drizzle } from 'drizzle-orm/sqlite3';
import sqlite3 from 'sqlite3';
export class DrizzleService {
  db: any;
  constructor() {
    const filePath = process.env.DATABASE_URL?.startsWith('file:') ? process.env.DATABASE_URL.replace('file:','') : './data/dev.db';
    const sqliteDb = new sqlite3.Database(filePath);
    this.db = drizzle(sqliteDb);
    console.log('Drizzle initialized with', filePath);
  }
}
