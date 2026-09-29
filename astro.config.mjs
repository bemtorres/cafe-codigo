// @ts-check
import { defineConfig } from 'astro/config';
// @ts-ignore
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://cafeycodigo.org',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        'react/jsx-dev-runtime': fileURLToPath(new URL('./src/lib/jsx-dev-runtime.js', import.meta.url)),
      },
    },
  },

  integrations: [react()],
});