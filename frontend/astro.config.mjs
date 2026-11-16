// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import { localCourseCreator } from './scripts/local-course-creator.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://cafeycodigo.org',

  vite: {
    plugins: [tailwindcss(), localCourseCreator()],
  },

  integrations: [react()],
});
