import { createContext, useContext, useState, useEffect } from 'react';
import { useEditor, EditorContent, NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code-block';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import type { BrandPreset, RichTextEditorialBlockData } from '../../../data/courses/courseJsonTypes';
import { ApaReferenceFooter } from './ZoomableFigure';
import { CodeSnippet } from '../molecules/CodeSnippet';
import { langColors } from '../../../lib/codeHighlight';

const CodeBlockEditing = createContext(false);

function EditorialCodeBlockView({ node, updateAttributes }: NodeViewProps) {
  const isEditing = useContext(CodeBlockEditing);
  const language = node.attrs.language as string | null;
  const languages = Object.keys(langColors);

  return (
    <NodeViewWrapper>
      {isEditing ? (
        <label className="mt-3 inline-flex flex-wrap items-center gap-2 text-sm font-semibold" contentEditable={false}>
          Lenguaje del código
          <select
            value={language ?? ''}
            onChange={(event) => updateAttributes({ language: event.target.value || null })}
            className="rounded border border-slate-300 bg-white px-2 py-1"
          >
            <option value="">Detectar automáticamente</option>
            <option value="text">Texto sin formato</option>
            {language && language !== 'text' && !languages.includes(language) && (
              <option value={language}>{language}</option>
            )}
            {languages.map((lang) => <option key={lang} value={lang}>{lang.toUpperCase()}</option>)}
          </select>
        </label>
      ) : (
        <div contentEditable={false}>
          <CodeSnippet code={node.textContent} language={language ?? undefined} />
        </div>
      )}
      <NodeViewContent<'pre'> as="pre" hidden={!isEditing} />
    </NodeViewWrapper>
  );
}

const EditorialCodeBlock = CodeBlock.extend({
  addNodeView() {
    return ReactNodeViewRenderer(EditorialCodeBlockView, { contentDOMElementTag: 'code' });
  },
});

export interface WidgetRichTextEditorialProps {
  data: RichTextEditorialBlockData;
  brand: BrandPreset;
  isEditMode?: boolean;
  onUpdateData?: (nextData: RichTextEditorialBlockData) => void;
}

const CALLOUT_SNIPPETS = [
  {
    label: '💡 Nota Clave',
    html: '<blockquote><p><strong>💡 Nota Clave de Arquitectura:</strong> Redacta aquí la recomendación principal o el recordatorio normativo para el equipo.</p></blockquote><p></p>',
  },
  {
    label: '⚠️ Alerta Ética',
    html: '<blockquote><p><strong>⚠️ Alerta de Cumplimiento:</strong> Nunca compartas datos personales o secretos de producción en canales externos sin anonimización previa.</p></blockquote><p></p>',
  },
  {
    label: '📌 Paso Destacado',
    html: '<h3>📌 Punto de Control</h3><p>Describe aquí el criterio verificable que todo desarrollador debe validar antes de continuar.</p>',
  },
];

export function WidgetRichTextEditorial({
  data,
  brand,
  isEditMode = false,
  onUpdateData,
}: WidgetRichTextEditorialProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [1, 2, 3],
        },
        link: {
          openOnClick: false,
        },
      }),
      EditorialCodeBlock,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: data.htmlContent || '<p>Escribe el contenido aquí...</p>',
    editable: isEditingText,
    onUpdate: ({ editor: ed }) => {
      const nextHtml = ed.getHTML();
      onUpdateData?.({
        ...data,
        htmlContent: nextHtml,
      });
    },
  });

  // Sincronizar modo editable cuando cambia isEditingText
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(isEditingText, false);
  }, [editor, isEditingText]);

  // Si el JSON externo cambia (por ejemplo desde el drawer JSON), sincronizar el contenido si no tiene el foco activo
  useEffect(() => {
    if (!editor) return;
    if (!editor.isFocused && data.htmlContent && editor.getHTML() !== data.htmlContent) {
      editor.commands.setContent(data.htmlContent, { emitUpdate: false });
    }
  }, [editor, data.htmlContent]);

  const handleSetLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href || '';
    const url = window.prompt('Ingresa la URL del enlace:', previousUrl);
    if (url === null) return;
    if (url.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  };

  const triggerSavedFlash = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 1800);
  };

  const useCard = data.cardFrame !== false;

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px' }}>
      {/* Estilos tipográficos editoriales para el contenido renderizado y editable de Tiptap */}
      <style>{`
        .cc-tiptap-editorial .ProseMirror {
          outline: none;
          min-height: ${isEditingText ? '240px' : 'auto'};
          color: #1E293B;
          font-size: 16px;
          line-height: 1.78;
        }
        .cc-tiptap-editorial .ProseMirror > * + * {
          margin-top: 0.9em;
        }
        .cc-tiptap-editorial .ProseMirror h1 {
          font-size: 30px;
          font-weight: 900;
          color: #0F172A;
          line-height: 1.22;
          letter-spacing: -0.02em;
          margin: 1.1em 0 0.45em 0;
        }
        .cc-tiptap-editorial .ProseMirror h2 {
          font-size: 23px;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.3;
          letter-spacing: -0.015em;
          margin: 1.2em 0 0.45em 0;
          padding-bottom: 6px;
          border-bottom: 2px solid #F1F5F9;
        }
        .cc-tiptap-editorial .ProseMirror h3 {
          font-size: 18.5px;
          font-weight: 800;
          color: #1E293B;
          line-height: 1.35;
          margin: 1.1em 0 0.35em 0;
        }
        .cc-tiptap-editorial .ProseMirror p {
          margin: 0 0 0.95em 0;
          color: #334155;
        }
        .cc-tiptap-editorial .ProseMirror strong {
          font-weight: 800;
          color: #0F172A;
        }
        .cc-tiptap-editorial .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.6rem;
          margin: 0.75em 0 1.1em 0;
          color: #334155;
        }
        .cc-tiptap-editorial .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.6rem;
          margin: 0.75em 0 1.1em 0;
          color: #334155;
        }
        .cc-tiptap-editorial .ProseMirror li {
          margin-bottom: 0.4em;
        }
        .cc-tiptap-editorial .ProseMirror li p {
          margin: 0;
        }
        .cc-tiptap-editorial .ProseMirror blockquote {
          margin: 1.25em 0;
          padding: 16px 20px;
          border-left: 4px solid ${brand.primary};
          background-color: #F8FAFC;
          border-radius: 0 8px 8px 0;
          color: #1E293B;
          font-style: normal;
        }
        .cc-tiptap-editorial .ProseMirror blockquote p:last-child {
          margin-bottom: 0;
        }
        .cc-tiptap-editorial .ProseMirror code {
          background-color: #F1F5F9;
          color: #0F172A;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: "JetBrains Mono", Consolas, monospace;
          font-size: 0.88em;
          border: 1px solid #E2E8F0;
        }
        .cc-tiptap-editorial .ProseMirror pre {
          background-color: #0F172A;
          color: #F8FAFC;
          padding: 16px 18px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: "JetBrains Mono", Consolas, monospace;
          font-size: 13px;
          line-height: 1.6;
          margin: 1.1em 0;
        }
        .cc-tiptap-editorial .ProseMirror pre code {
          background: transparent;
          color: inherit;
          padding: 0;
          border: none;
          font-size: inherit;
        }
        .cc-tiptap-editorial .ProseMirror hr {
          border: none;
          border-top: 2px solid #E2E8F0;
          margin: 1.8em 0;
        }
        .cc-tiptap-editorial .ProseMirror a {
          color: ${brand.primary};
          font-weight: 700;
          text-decoration: underline;
        }
        .cc-tiptap-editorial .ProseMirror mark {
          background-color: #FEF08A;
          color: #0F172A;
          padding: 1px 4px;
          border-radius: 3px;
        }
      `}</style>

      {/* Cabecera superior de sección + Botón para abrir/cerrar el diseñador Tiptap */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '22px',
        }}
      >
        <div>
          {data.badge && (
            <span
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: brand.primary,
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              {data.badge}
            </span>
          )}
          {data.title && (
            <h3
              style={{
                fontSize: '28px',
                fontWeight: 900,
                color: '#0F172A',
                margin: 0,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {data.title}
            </h3>
          )}
          {data.subtitle && (
            <p
              style={{
                fontSize: '14.5px',
                color: '#64748B',
                margin: '6px 0 0 0',
                fontWeight: 500,
              }}
            >
              {data.subtitle}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {data.readingTime && (
            <span
              style={{
                padding: '5px 12px',
                borderRadius: '999px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#475569',
              }}
            >
              📖 {data.readingTime}
            </span>
          )}

          <button
            type="button"
            onClick={() => {
              if (isEditingText) {
                triggerSavedFlash();
              }
              setIsEditingText((prev) => !prev);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: isEditingText ? '2px solid #0F172A' : `1.5px solid ${brand.primary}`,
              backgroundColor: isEditingText ? '#0F172A' : '#FFFFFF',
              color: isEditingText ? '#FDE047' : brand.primary,
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)',
              transition: 'all 0.18s ease',
            }}
          >
            <span>{isEditingText ? 'Ver modo lectura' : 'Editar texto'}</span>
          </button>

          {savedNotice && (
            <span
              style={{
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#047857',
                backgroundColor: '#ECFDF5',
                border: '1px solid #6EE7B7',
                padding: '5px 10px',
                borderRadius: '6px',
              }}
            >
              ✓ Guardado en JSON
            </span>
          )}
        </div>
      </div>

      {/* BARRA DE HERRAMIENTAS WYSIWYG TIPTAP (Visible cuando se está editando) */}
      {isEditingText && editor && (
        <div
          style={{
            backgroundColor: '#0F172A',
            color: '#F8FAFC',
            borderRadius: '10px 10px 0 0',
            padding: '10px 14px',
            border: '1px solid #334155',
            borderBottom: `2px solid ${brand.primary}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {/* Fila 1: Controles de metadatos rápidos (Título, Badge y Estilo de Tarjeta) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              paddingBottom: '8px',
              borderBottom: '1px solid #1E293B',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                fontWeight: 900,
                color: '#FDE047',
                backgroundColor: '#1E293B',
                padding: '3px 8px',
                borderRadius: '4px',
                letterSpacing: '0.05em',
              }}
            >
              ⚡ TIPTAP STUDIO
            </span>

            <input
              type="text"
              value={data.badge || ''}
              onChange={(e) =>
                onUpdateData?.({
                  ...data,
                  badge: e.target.value,
                })
              }
              placeholder="Badge superior (opcional)..."
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #334155',
                backgroundColor: '#1E293B',
                color: '#E2E8F0',
                fontSize: '11.5px',
                width: '190px',
              }}
            />

            <input
              type="text"
              value={data.title || ''}
              onChange={(e) =>
                onUpdateData?.({
                  ...data,
                  title: e.target.value,
                })
              }
              placeholder="Título de la sección (opcional)..."
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #334155',
                backgroundColor: '#1E293B',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '11.5px',
                flex: 1,
                minWidth: '200px',
              }}
            />

            <button
              type="button"
              onClick={() =>
                onUpdateData?.({
                  ...data,
                  cardFrame: !useCard,
                })
              }
              title="Alternar entre contenedor tipo tarjeta blanca o texto libre sobre el fondo"
              style={{
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid #475569',
                backgroundColor: useCard ? '#38BDF8' : '#1E293B',
                color: useCard ? '#0F172A' : '#CBD5E1',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              {useCard ? '🪪 Con Tarjeta Editorial' : '📄 Texto Libre sin Tarjeta'}
            </button>
          </div>

          {/* Fila 2: Botones de formato Tiptap */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
            {/* Párrafo y Encabezados */}
            <ToolbarBtn
              active={editor.isActive('paragraph')}
              onClick={() => editor.chain().focus().setParagraph().run()}
              title="Párrafo normal"
            >
              P
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive('heading', { level: 1 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              title="Título H1"
            >
              H1
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive('heading', { level: 2 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              title="Subtítulo H2"
            >
              H2
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive('heading', { level: 3 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              title="Encabezado H3"
            >
              H3
            </ToolbarBtn>

            <Divider />

            {/* Estilos de texto */}
            <ToolbarBtn
              active={editor.isActive('bold')}
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Negrita (Ctrl+B)"
            >
              <strong>B</strong>
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive('italic')}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Cursiva (Ctrl+I)"
            >
              <em>I</em>
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive('underline')}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Subrayado (Ctrl+U)"
            >
              <span style={{ textDecoration: 'underline' }}>U</span>
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive('strike')}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              title="Tachado"
            >
              <span style={{ textDecoration: 'line-through' }}>S</span>
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive('highlight')}
              onClick={() => editor.chain().focus().toggleHighlight({ color: '#FEF08A' }).run()}
              title="Resaltador amarillo"
            >
              🖍️ Resaltar
            </ToolbarBtn>

            {/* Color de marca sobre texto seleccionado */}
            <ToolbarBtn
              active={editor.isActive('textStyle', { color: brand.primary })}
              onClick={() => editor.chain().focus().setColor(brand.primary).run()}
              title="Aplicar color institucional al texto seleccionado"
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '9px',
                  height: '9px',
                  borderRadius: '999px',
                  backgroundColor: brand.primary,
                  marginRight: '4px',
                }}
              />
              Color Marca
            </ToolbarBtn>
            <ToolbarBtn
              active={false}
              onClick={() => editor.chain().focus().unsetColor().run()}
              title="Restaurar color de texto por defecto"
            >
              Texto Normal
            </ToolbarBtn>

            <Divider />

            {/* Alineación */}
            <ToolbarBtn
              active={editor.isActive({ textAlign: 'left' })}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              title="Alinear a la izquierda"
            >
              ⬅
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive({ textAlign: 'center' })}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              title="Centrar texto"
            >
              ↔
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive({ textAlign: 'justify' })}
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              title="Justificar texto"
            >
              ☰
            </ToolbarBtn>

            <Divider />

            {/* Listas y bloques */}
            <ToolbarBtn
              active={editor.isActive('bulletList')}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Lista con viñetas"
            >
              • Lista
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive('orderedList')}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Lista numerada"
            >
              1. Lista
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive('blockquote')}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              title="Cita / Bloque destacado"
            >
              ❝ Cita
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive('codeBlock')}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              title="Bloque de código"
            >
              {'</>'} Código
            </ToolbarBtn>
            <ToolbarBtn
              active={editor.isActive('link')}
              onClick={handleSetLink}
              title="Insertar o editar enlace"
            >
              🔗 Enlace
            </ToolbarBtn>
            <ToolbarBtn
              active={false}
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Insertar línea divisoria horizontal"
            >
              ― Línea
            </ToolbarBtn>

            <Divider />

            {/* Deshacer / Rehacer */}
            <ToolbarBtn
              active={false}
              onClick={() => editor.chain().focus().undo().run()}
              title="Deshacer"
            >
              ↶
            </ToolbarBtn>
            <ToolbarBtn
              active={false}
              onClick={() => editor.chain().focus().redo().run()}
              title="Rehacer"
            >
              ↷
            </ToolbarBtn>
          </div>

          {/* Fila 3: Bloques pre-diseñados con 1 clic */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
              paddingTop: '6px',
              borderTop: '1px solid #1E293B',
            }}
          >
            <span style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 700 }}>
              Insertar bloque rápido:
            </span>
            {CALLOUT_SNIPPETS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => editor.chain().focus().insertContent(s.html).run()}
                style={{
                  padding: '3px 9px',
                  borderRadius: '999px',
                  border: '1px solid #334155',
                  backgroundColor: '#1E293B',
                  color: '#E2E8F0',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                + {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LIENZO PRINCIPAL DEL DOCUMENTO / TEXTO EDITORIAL */}
      <div
        className="cc-tiptap-editorial"
        onDoubleClick={() => {
          if (isEditMode && !isEditingText) {
            setIsEditingText(true);
          }
        }}
        style={{
          backgroundColor: useCard ? '#FFFFFF' : 'transparent',
          border: isEditingText
            ? `2px solid ${brand.primary}`
            : useCard
              ? '1px solid #E2E8F0'
              : 'none',
          borderTop:
            !isEditingText && useCard ? `4px solid ${brand.primary}` : undefined,
          borderRadius: isEditingText ? '0 0 12px 12px' : useCard ? '12px' : '0px',
          padding: useCard ? '40px 44px' : '8px 0',
          boxShadow: useCard ? '0 12px 32px rgba(15, 23, 42, 0.05)' : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        <CodeBlockEditing.Provider value={isEditingText}>
          <EditorContent editor={editor} />
        </CodeBlockEditing.Provider>

        {data.apaCitation && (
          <div style={{ marginTop: '24px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
            <ApaReferenceFooter citation={data.apaCitation} />
          </div>
        )}
      </div>
    </div>
  );
}

function ToolbarBtn({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 8px',
        borderRadius: '5px',
        border: active ? '1px solid #FDE047' : '1px solid #334155',
        backgroundColor: active ? '#F59E0B' : '#1E293B',
        color: active ? '#0F172A' : '#F8FAFC',
        fontSize: '11.5px',
        fontWeight: 800,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function Divider() {
  return (
    <span
      style={{
        width: '1px',
        height: '18px',
        backgroundColor: '#334155',
        margin: '0 3px',
        display: 'inline-block',
      }}
    />
  );
}

