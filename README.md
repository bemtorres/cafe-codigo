# cafeycodigo ☕

Aprende programación desde cero con ejercicios prácticos y sin complicaciones, en un entorno moderno y accesible.

**cafeycodigo** es una plataforma gratuita para aprender lógica y programación paso a paso, con ejemplos ejecutables y un simulador de PSeInt.

## Cursos

| Curso | Estado | Descripción |
|-------|--------|-------------|
| **PSeInt** | Disponible | Pseudocódigo en español, ideal para principiantes |
| **Python** | Próximamente | Lenguaje moderno y versátil |
| **Java** | Próximamente | Lenguaje robusto y multiplataforma |

## Orden recomendado

1. **PSeInt** — Aprende la lógica sin preocuparte por la sintaxis
2. **Python** o **Java** — Elige según tus objetivos

## Estructura del proyecto

```
src/
├── data/
│   └── courses.ts      # Configuración de cursos
├── components/
├── layouts/
├── pages/
│   ├── index.astro     # Lista de cursos
│   ├── pseint/         # Curso PSeInt completo
│   ├── python/         # Próximamente
│   └── java/           # Próximamente
└── styles/
```

## Comandos

```bash
npm install
npm run dev
npm run build
npm preview
```

## Deploy (cafeycodigo.org)

El sitio está pensado para desplegarse en `https://cafeycodigo.org`.

- **Build**: `npm run build` (genera `dist/`)
- **Preview**: `npm run preview`

Puedes desplegar el contenido de `dist/` en tu hosting (Vercel, Netlify, Cloudflare Pages, servidor propio, etc.).
