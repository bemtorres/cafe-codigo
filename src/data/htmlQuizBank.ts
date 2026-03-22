export interface HtmlQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface HtmlQuizDefinition {
  key: string;
  title: string;
  questions: HtmlQuizQuestion[];
}

export const htmlQuizBank: Record<string, HtmlQuizDefinition> = {
  'intro-html': {
    key: 'intro-html',
    title: 'Quiz: Estructura Básica',
    questions: [
      {
        prompt: "¿Qué significan las siglas HTML?",
        options: ["Hyper Text Markup Language", "High Text Mode Language", "Hyper Tool Multi Logic", "Home Tool Markup Language"],
        correctIndex: 0
      },
      {
        prompt: "¿Cuál es la etiqueta que envuelve todo el contenido visible de la página?",
        options: ["<head>", "<body>", "<html>", "<main>"],
        correctIndex: 1
      },
      {
        prompt: "¿En qué etiqueta se pone el título que aparece en la pestaña del navegador?",
        options: ["<header>", "<h1>", "<title>", "<meta>"],
        correctIndex: 2
      },
      {
        prompt: "¿Para qué sirve el Doctype <!DOCTYPE html>?",
        options: ["Para poner el título", "Para avisar al navegador que use el estándar HTML5", "Para poner el idioma", "No sirve para nada"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se llama la parte del archivo HTML que no ve el usuario directamente (scripts, estilos)?",
        options: ["<body>", "<head>", "<footer>", "<invisible>"],
        correctIndex: 1
      }
    ]
  },
  'etiquetas-basicas': {
    key: 'etiquetas-basicas',
    title: 'Quiz: Títulos y Enlaces',
    questions: [
      {
        prompt: "¿Cuál es el título más importante de una página?",
        options: ["<h6>", "<h2>", "<h1>", "<p>"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué etiqueta se usa para crear un párrafo?",
        options: ["<text>", "<p>", "<div>", "<span>"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué atributo se usa en la etiqueta <a> para indicar a dónde va el enlace?",
        options: ["src", "link", "href", "target"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es la diferencia entre <b> e <strong>?",
        options: ["Son iguales", "<strong> da importancia semántica además de negrita", "<b> es para títulos", "<strong> es más oscuro"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se hace una línea horizontal en HTML?",
        options: ["<br>", "<line>", "<hr>", "<hr />"],
        correctIndex: 2
      }
    ]
  },
  'listas-tablas': {
    key: 'listas-tablas',
    title: 'Quiz: Organización de Datos',
    questions: [
      {
        prompt: "¿Qué etiqueta crea una lista DESORDENADA (con puntos)?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se define cada ítem dentro de una lista?",
        options: ["<item>", "<p>", "<li>", "<dd>"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es el orden de las etiquetas para una tabla?",
        options: ["table > tr > td", "table > td > tr", "table > th > body", "tr > table > td"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué etiqueta representa una celda de encabezado en una tabla?",
        options: ["<td>", "<head>", "<th>", "<tr>"],
        correctIndex: 2
      },
      {
        prompt: "¿Para qué sirve la etiqueta <ol>?",
        options: ["Lista ordenada (números)", "Lista desordenada", "Insertar un objeto", "Un enlace"],
        correctIndex: 0
      }
    ]
  },
  'formularios': {
    key: 'formularios',
    title: 'Quiz: Interactividad y Captura',
    questions: [
      {
        prompt: "¿Qué etiqueta principal envuelve un formulario?",
        options: ["<input>", "<form>", "<section>", "<submit>"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué atributo de <input> determina si es texto, contraseña o fecha?",
        options: ["name", "id", "type", "value"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo asociarías un texto <label> con un <input> de forma profesional?",
        options: ["Poniéndolos juntos", "Usando el atributo 'for' en la label igual al 'id' del input", "Usando 'name'", "No se puede"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué etiqueta permite escribir texto en varias líneas (comentarios)?",
        options: ["<input type='big'>", "<textarea>", "<p>", "<multiline>"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el atributo para hacer que un campo sea obligatorio?",
        options: ["must", "required", "needed", "important"],
        correctIndex: 1
      }
    ]
  },
  'multimedia': {
    key: 'multimedia',
    title: 'Quiz: Imágenes y Video',
    questions: [
      {
        prompt: "¿Cuál es el propósito del atributo 'alt' en una imagen?",
        options: ["Ponerle altura", "Descripción para accesibilidad si la imagen no carga", "Filtrar colores", "Ponerle enlace"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué etiqueta se usa para insertar un video?",
        options: ["<movie>", "<video>", "<media>", "<iframe>"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es la ruta para una imagen que está en la misma carpeta?",
        options: ["src='imagen.jpg'", "src='/imagen.jpg'", "src='../../imagen.jpg'", "alt='imagen'"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué etiqueta usarías para incrustar un mapa de Google o un video de YouTube?",
        options: ["<external>", "<iframe>", "<object>", "<embed>"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el atributo para que un video se reproduzca solo al cargar?",
        options: ["start", "autoplay", "play", "muted"],
        correctIndex: 1
      }
    ]
  },
  'semauntica': {
    key: 'semauntica',
    title: 'Quiz: Semántica y SEO',
    questions: [
      {
        prompt: "¿Para qué sirve el HTML Semántico?",
        options: ["Para que se vea bonito", "Para que Google y las máquinas entiendan qué parte es el menú, el pie de página, etc.", "Para que cargue más rápido", "Para los colores"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué etiqueta usarías para el menú de navegación?",
        options: ["<menu>", "<nav>", "<header>", "<ul>"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué etiqueta representa el pie de página?",
        options: ["<bottom>", "<footer>", "<end>", "<base>"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el propósito de la etiqueta <article>?",
        options: ["Para cualquier texto", "Contenido independiente que tiene sentido por sí solo", "Para el menú", "Para negritas"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué etiqueta envuelve el contenido principal (único) de tu página?",
        options: ["<section>", "<main>", "<body>", "<div>"],
        correctIndex: 1
      }
    ]
  }
};
