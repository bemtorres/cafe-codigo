/**
 * Reset (supabase/reset.sql) + esquema completo (supabase/schema.sql).
 * Requiere CONFIRM_FRESH=1 y URI Postgres (DATABASE_URL, SUPABASE_DB_URL o DIRECT_URL).
 * Cambios incrementales para producción: supabase/sql-incremental/ (ver README allí).
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createPgClient, getDatabaseUrl, loadEnv, projectRoot } from './lib/pg-env.mjs';

loadEnv();

if (process.env.CONFIRM_FRESH !== '1') {
  console.error('');
  console.error('[db:fresh] Borra datos en public.* y vuelve a aplicar schema.sql.');
  console.error('');
  console.error('  CONFIRM_FRESH=1 npm run db:fresh');
  console.error('  PowerShell: $env:CONFIRM_FRESH="1"; npm run fresh');
  console.error('');
  process.exit(1);
}

const url = getDatabaseUrl();
if (!url) {
  console.error(
    '[db:fresh] Falta URI de Postgres en .env.local: define DATABASE_URL, SUPABASE_DB_URL o DIRECT_URL.',
  );
  console.error(
    '  No alcanza PUBLIC_SUPABASE_URL / anon key: en Supabase → Project Settings → Database copiá "Connection string" (URI).',
  );
  process.exit(1);
}

const resetPath = join(projectRoot, 'supabase', 'reset.sql');
const schemaPath = join(projectRoot, 'supabase', 'schema.sql');
let resetSql;
let schemaSql;
try {
  resetSql = readFileSync(resetPath, 'utf8');
} catch (e) {
  console.error('[db:fresh] No se encontró', resetPath, e.message);
  process.exit(1);
}
try {
  schemaSql = readFileSync(schemaPath, 'utf8');
} catch (e) {
  console.error('[db:fresh] No se encontró', schemaPath, e.message);
  process.exit(1);
}

const client = createPgClient(url);

try {
  await client.connect();
  console.log('[db:fresh] Ejecutando reset.sql…');
  await client.query(resetSql);
  console.log('[db:fresh] Ejecutando schema.sql…');
  await client.query(schemaSql);
  console.log('[db:fresh] Listo.');
  console.log('[db:fresh] Nota: usuarios en Auth siguen; podés necesitar backfill de profiles.');
} catch (e) {
  console.error('[db:fresh] Error:', e.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}

process.exit(process.exitCode ?? 0);
