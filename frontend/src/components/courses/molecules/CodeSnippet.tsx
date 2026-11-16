import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { highlightLine, idePalettes, resolveFinalLang } from '../../../lib/codeHighlight';
import './code-snippet.css';

export interface CodeSnippetProps {
  code: string;
  language?: string;
}

export function CodeSnippet({ code, language }: CodeSnippetProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const lang = resolveFinalLang(language, code, false).toLowerCase();
  const palette = Object.hasOwn(idePalettes, lang) ? idePalettes[lang] : idePalettes.python;
  const label = lang === 'text' ? 'Texto' : lang.toUpperCase();
  const highlighted = useMemo(
    () => code.split('\n').map((line) => highlightLine(line, lang)).join('\n'),
    [code, lang],
  );

  useEffect(() => {
    if (copyState !== 'copied') return;
    const timer = window.setTimeout(() => setCopyState('idle'), 2200);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const copyCode = async () => {
    setCopyState('copying');
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  return (
    <figure
      className="course-code-snippet"
      style={{
        '--snippet-paper': palette.bg,
        '--snippet-ink': palette.txt,
        '--snippet-keyword': palette.kw,
        '--snippet-string': palette.str,
        '--snippet-function': palette.func,
        '--snippet-type': palette.type,
      } as CSSProperties}
    >
      <figcaption className="course-code-snippet-bar">
        <span>{label}</span>
        <button type="button" onClick={copyCode} disabled={!code || copyState === 'copying'}>
          {copyState === 'copied' ? 'Copiado' : copyState === 'copying' ? 'Copiando…' : 'Copiar código'}
        </button>
      </figcaption>
      <pre className="course-code-snippet-source" tabIndex={0} aria-label={`Código · ${label}`}>
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
      <span className={copyState === 'failed' ? 'course-code-snippet-error' : 'sr-only'} role="status">
        {copyState === 'copied' && 'Código copiado al portapapeles.'}
        {copyState === 'failed' && 'No se pudo copiar. Selecciona el código para copiarlo manualmente.'}
      </span>
    </figure>
  );
}
