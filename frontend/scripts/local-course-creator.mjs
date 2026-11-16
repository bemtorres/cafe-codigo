import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { isCourseDocument } from '../src/data/courses/courseDocument.ts';

const endpoint = '/api/local/contenidos';
const maxBytes = 2 * 1024 * 1024;

export function localCourseCreator(root = process.cwd()) {
  const output = join(root, 'public', 'contenidos');
  const storage = join(root, '.course-creator');
  return {
    name: 'local-course-creator',
    apply: 'serve',
    enforce: 'pre',
    configResolved(config) {
      config.server.fs.deny.push('**/.course-creator/**');
    },
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (request.url !== endpoint) return next();
        const reply = (status, data) => {
          response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
          response.end(JSON.stringify(data));
        };
        try {
          const host = request.headers.host || '';
          const loopbackHost = /^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(host);
          const loopbackClient = ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(request.socket.remoteAddress);
          if (!loopbackHost || !loopbackClient) return reply(403, { error: 'Abre el creador desde localhost.' });
          if (request.method !== 'POST') return reply(405, { error: 'Método no permitido.' });
          if (request.headers.origin !== 'http://' + host ||
              request.headers['content-type']?.split(';')[0] !== 'application/json') {
            return reply(403, { error: 'Origen de la solicitud inválido.' });
          }

          const chunks = [];
          let bytes = 0;
          for await (const chunk of request.iterator({ destroyOnReturn: false })) {
            bytes += chunk.length;
            if (bytes > maxBytes) {
              request.resume();
              return reply(413, { error: 'El contenido supera el límite de 2 MB.' });
            }
            chunks.push(chunk);
          }

          let payload;
          try {
            payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          } catch {
            return reply(400, { error: 'El JSON es inválido.' });
          }
          const document = payload?.document;
          const revision = payload?.revision;
          if (!isCourseDocument(document) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(document.courseId) ||
              document.courseId.length > 80 || (revision !== null && typeof revision !== 'string')) {
            return reply(400, { error: 'Revisa la estructura y el identificador de la asignatura.' });
          }

          const { DatabaseSync } = await import('node:sqlite');
          mkdirSync(storage, { recursive: true });
          mkdirSync(output, { recursive: true });
          const db = new DatabaseSync(join(storage, 'contents.sqlite'));
          const path = join(output, document.courseId + '.json');
          const temporary = join(storage, randomUUID() + '.tmp');
          try {
            db.exec(`PRAGMA busy_timeout = 5000;
              CREATE TABLE IF NOT EXISTS courses (
                id TEXT PRIMARY KEY,
                document TEXT NOT NULL,
                saved_at TEXT NOT NULL
              ) STRICT;
              BEGIN IMMEDIATE;`);

            const previous = existsSync(path) ? readFileSync(path, 'utf8') : null;
            if (previous !== revision) {
              db.exec('ROLLBACK');
              return reply(409, { error: 'Ya existe una versión distinta. Abre la asignatura desde la biblioteca para editarla.' });
            }
            const json = JSON.stringify(document, null, 2) + '\n';
            let exported = false;
            try {
              db.prepare(`INSERT INTO courses (id, document, saved_at) VALUES (?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET document = excluded.document, saved_at = excluded.saved_at`)
                .run(document.courseId, json, new Date().toISOString());
              writeFileSync(temporary, json, { flag: 'wx' });
              renameSync(temporary, path);
              exported = true;
              db.exec('COMMIT');
            } catch (error) {
              if (exported && previous === null) rmSync(path);
              if (exported && previous !== null) {
                writeFileSync(temporary, previous, { flag: 'wx' });
                renameSync(temporary, path);
              }
              throw error;
            }
            return reply(200, { json, path: 'public/contenidos/' + document.courseId + '.json' });
          } finally {
            try {
              db.close();
            } finally {
              rmSync(temporary, { force: true });
            }
          }
        } catch (error) {
          server.config.logger.error('Error al guardar la asignatura: ' + String(error));
          if (!response.headersSent) reply(500, { error: 'No se pudo guardar la asignatura. Revisa la consola local e inténtalo de nuevo.' });
        }
      });
    },
  };
}
