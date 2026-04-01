/** Pie «dato curioso» al final del contenido en cursos de lenguaje (category: language). */
export interface LanguageCuriosityMeta {
  /** Una frase corta: cuándo y quién. */
  line: string;
  wikiUrl: string;
}

export const languageCuriosityBySlug: Record<string, LanguageCuriosityMeta> = {
  cpp: {
    line: 'C++ apareció en 1985; Bjarne Stroustrup en Bell Labs.',
    wikiUrl: 'https://es.wikipedia.org/wiki/C%2B%2B',
  },
  csharp: {
    line: 'Microsoft lo presentó en 2000; C# 1.0 con .NET en 2002 (Anders Hejlsberg).',
    wikiUrl: 'https://es.wikipedia.org/wiki/C_Sharp',
  },
  java: {
    line: 'JDK 1.0 en 1996; James Gosling y Sun Microsystems.',
    wikiUrl: 'https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)',
  },
  python: {
    line: 'Primera versión pública en 1991; Guido van Rossum.',
    wikiUrl: 'https://es.wikipedia.org/wiki/Python',
  },
  javascript: {
    line: '1995 en Netscape; Brendan Eich.',
    wikiUrl: 'https://es.wikipedia.org/wiki/JavaScript',
  },
};

export function getLanguageCuriosityMeta(slug: string): LanguageCuriosityMeta | undefined {
  return languageCuriosityBySlug[slug];
}
