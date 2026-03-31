# Cambios SQL por pasos (producción sin `db:fresh`)

`supabase/schema.sql` es el **esquema completo** (también usado tras `reset.sql` en `npm run db:fresh`).

Cuando cambies la base **en un proyecto que ya tiene datos**, no conviene pegar todo `schema.sql` de nuevo. En su lugar:

1. Añadí un archivo nuevo aquí con **solo** el SQL nuevo (ALTER, CREATE, políticas, etc.).
2. Nombralo así:

   `YYYYMMDD_NN_descripcion-corta.sql`

   - **YYYYMMDD**: fecha del cambio (ej. `20260330`).
   - **NN**: `01`, `02`, … si ese día hay más de un paso (orden de ejecución).
   - **descripcion-corta**: en minúsculas y guiones, qué toca (ej. `add-indice-lecciones`).

   Ejemplos:

   - `20260330_01_add-column-notas.sql`
   - `20260330_02_politica-admin-lectura.sql`

3. En Supabase → SQL → ejecutá los archivos **en orden** (por nombre ordena solo: año, mes, día, luego `_NN`).

4. Mantener **al día** `schema.sql` con el estado final deseado (para nuevos entornos y para `db:fresh` en local).

Convención al implementar una feature en código que toque la DB: **crear el `.sql` incremental el mismo día** con el nombre anterior; así queda historial claro de qué subir paso a paso.
