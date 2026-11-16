export interface CssQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface CssQuizDefinition {
  key: string;
  title: string;
  questions: CssQuizQuestion[];
}

export const cssQuizBank: Record<string, CssQuizDefinition> = {
  'intro-css': {
    key: 'intro-css',
    title: 'Quiz: CSS y Box Model',
    questions: [
      {
        prompt: "¿Qué significan las siglas CSS?",
        options: ["Cascading Style Sheets", "Cascading Simple Scripts", "Cascading Strong Styles", "Cascading Screen System"],
        correctIndex: 0
      },
      {
        prompt: "¿A qué elemento apunta el selector '.mi-clase'?",
        options: ["Al que tiene un ID 'mi-clase'", "Al que tiene una clase 'mi-clase'", "Al primer párrafo", "Al que tiene el atributo name='mi-clase'"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el orden de las capas en el Box Model (de adentro hacia afuera)?",
        options: ["Content > Padding > Border > Margin", "Content > Border > Padding > Margin", "Margin > Border > Padding > Content", "Padding > Content > Border > Margin"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué propiedad cambia el color de fondo?",
        options: ["color", "bg-color", "background-color", "fill"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es la diferencia entre margin y padding?",
        options: ["Son iguales", "Margin es el espacio exterior, Padding el interior", "Padding es para bordes", "Margin es para el texto"],
        correctIndex: 1
      }
    ]
  },
  'flexbox-grid': {
    key: 'flexbox-grid',
    title: 'Quiz: Flexbox y Grid',
    questions: [
      {
        prompt: "¿Cómo activamos Flexbox en un contenedor?",
        options: ["display: flex;", "display: block;", "flex-direction: row;", "align-items: center;"],
        correctIndex: 0
      },
      {
        prompt: "¿Cuál es el eje principal de Flexbox por defecto?",
        options: ["Horizontal (row)", "Vertical (column)", "Diagonal", "Z-index"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué propiedad alinea los ítems horizontalmente en Flexbox (si el eje es row)?",
        options: ["align-items", "justify-content", "align-content", "flex-wrap"],
        correctIndex: 1
      },
      {
        prompt: "¿Para qué sirve CSS Grid principalmente?",
        options: ["Alinear una sola línea (filas O columnas)", "Crear disposiciones en dos dimensiones (filas Y columnas)", "Para colores", "Para fuentes"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué unidad se usa típicamente para crear columnas flexibles en Grid?",
        options: ["px", "rem", "fr (fractional)", "%"],
        correctIndex: 2
      }
    ]
  },
  'responsive': {
    key: 'responsive',
    title: 'Quiz: Diseño Adaptable',
    questions: [
      {
        prompt: "¿Cómo se llama la técnica para que una web se vea bien en móviles y PCs?",
        options: ["Responsive Web Design", "Automatic Layout", "Scale Design", "Mobile First Logic"],
        correctIndex: 0
      },
      {
        prompt: "¿Cuál es la herramienta de CSS para aplicar estilos basados en el tamaño de pantalla?",
        options: ["@screen", "@media queries", "@responsive", "if (window.width)"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué significa el enfoque 'Mobile First'?",
        options: ["Hacer primero la versión de PC", "Hacer primero la versión móvil y añadir cambios para PC conforme crece el ancho", "Hacer solo la versión móvil", "Usar solo iconos"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué propiedad evita que una imagen sea más ancha que su contenedor?",
        options: ["width: 100%;", "max-width: 100%;", "object-fit: contain;", "display: block;"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es un tamaño típico de 'breakpoint' para móviles?",
        options: ["1200px", "768px", "480px", "2560px"],
        correctIndex: 2
      }
    ]
  },
  'bootstrap': {
    key: 'bootstrap',
    title: 'Quiz: Bootstrap Essentials',
    questions: [
      {
        prompt: "¿Qué arquitectura usa el sistema de grid de Bootstrap?",
        options: ["10 columnas", "12 columnas", "8 columnas", "Ilimitadas"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es la clase para crear un botón azul primario?",
        options: ["button-blue", "btn btn-primary", "btn btn-blue", "primary-btn"],
        correctIndex: 1
      },
      {
        prompt: "¿Para qué sirve el contenedor 'container'?",
        options: ["Para centrar el contenido y darle un ancho máximo fijo", "Para poner bordes", "Para que sea una web progresiva", "Para esconder el menú"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué clase de margen usarías para separar un elemento por arriba (top) con un nivel 3?",
        options: ["top-3", "margin-top-3", "mt-3", "m-t-3"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo harías una columna que ocupa la mitad de la pantalla en dispositivos medianos?",
        options: ["col-md-3", "col-md-6", "col-md-12", "half-col"],
        correctIndex: 1
      }
    ]
  },
  'tailwind': {
    key: 'tailwind',
    title: 'Quiz: Tailwind Utility',
    questions: [
      {
        prompt: "¿Cuál es la mayor diferencia de Tailwind con Bootstrap?",
        options: ["Tailwind no tiene componentes pre-estilizados, usa clases de utilidad (Utility-first)", "Tailwind es más antiguo", "Bootstrap es solo para móviles", "Ninguna"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué clase de Tailwind usarías para centrar un texto?",
        options: ["center-text", "text-center", "align-center", "items-center"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se definen los estados hover (pasar el ratón sobre un botón)?",
        options: ["Usando CSS aparte", "Prefijo 'hover:', ejemplo: 'hover:bg-blue-600'", "class='on-hover'", "Usa JavaScript"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué clase de Tailwind pone un fondo negro?",
        options: ["bg-black", "black-bg", "background:black", "color-black"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué clase daría un redondeado máximo a un botón (píldora)?",
        options: ["rounded-full", "rounded-pill", "border-radius-full", "circle"],
        correctIndex: 0
      }
    ]
  }
};
