export const phpQuizBank = {
  introduccion: {
    questions: [
      {
        prompt: "¿Qué significan originalmente las siglas de PHP?",
        options: [
          "Private Home Page",
          "Personal Home Page",
          "Hypertext Preprocessor",
          "Programming Hypertext Protocol"
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál de las siguientes es la etiqueta de apertura estándar y correcta para escribir código PHP?",
        options: [
          "<script php>",
          "<?php",
          "<?",
          "<%="
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se debe terminar la gran mayoría de las sentencias e instrucciones individuales en PHP?",
        options: [
          "Con un punto final (.)",
          "Con un salto de línea únicamente",
          "Con un punto y coma (;)",
          "No requiere ningún carácter de terminación"
        ],
        correctIndex: 2
      }
    ]
  },
  variables: {
    questions: [
      {
        prompt: "¿Con qué símbolo deben comenzar obligatoriamente todas las variables en PHP?",
        options: [
          "Con un signo de porcentaje (%)",
          "Con un signo de numeral o hash (#)",
          "Con un signo de dólar ($)",
          "Con una arroba (@)"
        ],
        correctIndex: 2
      },
      {
        prompt: "¿Qué operador se utiliza en PHP para concatenar dos cadenas de texto (strings)?",
        options: [
          "El signo de suma (+)",
          "El punto (.)",
          "El signo de ampersand (&)",
          "La flecha (->)"
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es la diferencia al usar comillas dobles (\"\") en lugar de comillas simples ('') para definir un string en PHP?",
        options: [
          "Las comillas dobles permiten interpolar variables directamente dentro del texto",
          "Las comillas simples ejecutan código HTML de forma automática",
          "Las comillas dobles no permiten caracteres especiales",
          "No hay absolutamente ninguna diferencia"
        ],
        correctIndex: 0
      }
    ]
  },
  arrays: {
    questions: [
      {
        prompt: "¿Cómo se define un array asociativo (clave => valor) en PHP moderno?",
        options: [
          "$arr = ['clave' : 'valor'];",
          "$arr = ['clave' => 'valor'];",
          "$arr = ['clave' = 'valor'];",
          "$arr = associative_array('clave', 'valor');"
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Qué bucle es el más recomendado e idóneo para recorrer de forma sencilla todos los elementos de un array asociativo?",
        options: [
          "for ($i = 0; $i < count($arr); $i++)",
          "while ($arr)",
          "foreach ($arr as $key => $value)",
          "do-while ($arr)"
        ],
        correctIndex: 2
      },
      {
        prompt: "¿Qué función nativa de PHP se utiliza para obtener la longitud o cantidad de elementos en un array?",
        options: [
          "length()",
          "size()",
          "count()",
          "array_len()"
        ],
        correctIndex: 2
      }
    ]
  },
  poo: {
    questions: [
      {
        prompt: "¿Cómo se declara e inicializa un constructor de clase en PHP moderno?",
        options: [
          "function className()",
          "public function __construct()",
          "function new()",
          "public function initialize()"
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Qué operador se utiliza en PHP para acceder a los métodos o propiedades no estáticos de un objeto?",
        options: [
          "El punto (.)",
          "La flecha simple (->)",
          "La flecha doble (=>)",
          "Los dos puntos dobles (::)"
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo nos referimos a la instancia del objeto actual dentro de los métodos de una clase en PHP?",
        options: [
          "$this",
          "$self",
          "self::",
          "$parent"
        ],
        correctIndex: 0
      }
    ]
  }
};
