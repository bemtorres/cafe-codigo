import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import dotenv from 'dotenv';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const projectRoot = join(__dirname, '..', '..');

export function loadEnv() {
  dotenv.config({ path: join(projectRoot, '.env.local') });
  dotenv.config({ path: join(projectRoot, '.env') });
}

export function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL?.trim() ||
    process.env.SUPABASE_DB_URL?.trim() ||
    process.env.DIRECT_URL?.trim() ||
    null
  );
}

export function createPgClient(url) {
  const useSsl =
    url.includes('supabase.co') ||
    url.includes('supabase.com') ||
    process.env.PGSSLMODE === 'require';
  return new pg.Client({
    connectionString: url,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  });
}
