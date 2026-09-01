import React, { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';

interface ExpressCodeEditorProps {
  code: string;
  language: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const ExpressCodeEditor: React.FC<ExpressCodeEditorProps> = ({
  code,
  language,
  disabled = false,
  onChange,
}) => {
  const extensions = useMemo(() => {
    const langExt = (() => {
      switch (language.toLowerCase()) {
        case 'cpp':
          return cpp();
        case 'python':
          return python();
        case 'javascript':
          return javascript();
        case 'java':
          return java();
        default:
          return cpp();
      }
    })();

    return [
      langExt,
      oneDark,
      EditorView.lineWrapping,
      EditorView.theme({
        '&': {
          fontSize: '13.5px',
          backgroundColor: '#080C14',
          borderRadius: '0 0 1rem 1rem',
          border: '1px solid rgba(51, 65, 85, 0.8)',
          borderTop: 'none',
        },
        '.cm-content': {
          fontFamily: '"JetBrains Mono", monospace',
          padding: '12px 14px',
        },
        '.cm-gutters': {
          backgroundColor: '#0B0F19',
          color: '#475569',
          borderRight: '1px solid #1E293B',
          borderRadius: '0 0 0 1rem',
        },
        '.cm-activeLineGutter': {
          backgroundColor: '#1E293B',
          color: '#38BDF8',
        },
        '.cm-activeLine': {
          backgroundColor: 'rgba(56, 189, 248, 0.05)',
        },
      }),
    ];
  }, [language]);

  return (
    <div className="w-full text-left rounded-b-2xl overflow-hidden shadow-inner">
      <CodeMirror
        value={code}
        height="320px"
        extensions={extensions}
        readOnly={disabled}
        editable={!disabled}
        onChange={(val) => {
          if (onChange) onChange(val);
        }}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: false,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
};
