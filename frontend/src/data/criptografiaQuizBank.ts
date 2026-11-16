export const criptografiaQuizBank = {
  introduccion: {
    title: "Conceptos Básicos de Criptografía",
    questions: [
      {
        prompt: "¿Cuál es la principal diferencia entre el cifrado simétrico y el asimétrico?",
        options: [
          "El simétrico es unidireccional (irreversible) y el asimétrico es bidireccional.",
          "El simétrico usa la misma clave para cifrar y descifrar, mientras que el asimétrico usa un par de claves (pública y privada).",
          "El asimétrico es mucho más rápido y eficiente computacionalmente que el simétrico.",
          "No existe diferencia real; son términos diferentes para el mismo tipo de cifrado."
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Por qué funciones hash clásicas como MD5 o SHA-1 se consideran obsoletas para propósitos de seguridad?",
        options: [
          "Porque se han descubierto vulnerabilidades de colisión que permiten encontrar dos mensajes distintos con el mismo hash.",
          "Porque consumen demasiada memoria RAM en servidores modernos.",
          "Porque solo funcionan en sistemas operativos de 32 bits.",
          "Porque la longitud del hash resultante varía según el tamaño de la entrada."
        ],
        correctIndex: 0
      },
      {
        prompt: "En la progresión pedagógica, ¿cuál es el beneficio de aprender el cifrado César o Vigenère antes que algoritmos modernos como AES?",
        options: [
          "Aprender a programar en lenguajes antiguos como ensamblador.",
          "Comprender los principios básicos de la sustitución y transposición sin la complejidad matemática de los algoritmos modernos.",
          "Saber cómo encriptar bases de datos de producción con cifrados rápidos.",
          "Ninguno, se recomienda omitir los cifrados históricos y empezar por criptografía poscuántica."
        ],
        correctIndex: 1
      }
    ]
  },
  "cifrado-simetrico": {
    title: "Cifrado Simétrico (AES-256)",
    questions: [
      {
        prompt: "¿Qué modo de operación de AES se prefiere en el desarrollo moderno debido a que proporciona cifrado autenticado (confidencialidad + integridad)?",
        options: [
          "AES-ECB (Electronic Codebook)",
          "AES-CBC (Cipher Block Chaining)",
          "AES-GCM (Galois/Counter Mode)",
          "AES-RC4 (Stream Mode)"
        ],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es la función del Vector de Inicialización (IV) o Nonce en el cifrado simétrico?",
        options: [
          "Asegurar que un mismo texto plano cifrado múltiples veces con la misma clave genere textos cifrados totalmente distintos.",
          "Servir como una contraseña alternativa si se pierde la clave principal.",
          "Indicar en qué formato (Hex o Base64) se debe guardar el archivo final.",
          "Duplicar la longitud efectiva de la clave criptográfica."
        ],
        correctIndex: 0
      },
      {
        prompt: "¿Cuál es el principal problema de diseño que busca resolver la criptografía asimétrica frente a la simétrica?",
        options: [
          "La lentitud de los procesos de descifrado.",
          "La longitud excesiva de los textos cifrados.",
          "La distribución segura de la clave secreta compartida.",
          "La falta de soporte de caracteres Unicode en los textos planos."
        ],
        correctIndex: 2
      }
    ]
  },
  "cifrado-asimetrico": {
    title: "Cifrado Asimétrico (RSA & ECC)",
    questions: [
      {
        prompt: "Si Alicia quiere enviarle un mensaje secreto a Roberto utilizando criptografía asimétrica, ¿con qué clave debe encriptar el mensaje?",
        options: [
          "Con la clave privada de Alicia.",
          "Con la clave pública de Alicia.",
          "Con la clave privada de Roberto.",
          "Con la clave pública de Roberto."
        ],
        correctIndex: 3
      },
      {
        prompt: "¿Por qué es una práctica común utilizar cifrado híbrido en lugar de cifrar archivos grandes directamente con RSA?",
        options: [
          "Porque RSA está prohibido para archivos mayores a 1 MB.",
          "Porque el cifrado asimétrico es computacionalmente lento; se cifra el archivo con AES (rápido) y la clave AES se cifra con RSA.",
          "Porque RSA altera el formato binario de los archivos multimedia.",
          "Porque el cifrado simétrico requiere internet y el asimétrico funciona offline."
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es la principal ventaja de la Criptografía de Curva Elíptica (ECC) frente a RSA?",
        options: [
          "Usa llaves mucho más cortas para ofrecer el mismo nivel de seguridad, lo que ahorra recursos y ancho de banda.",
          "Es un algoritmo simétrico fácil de memorizar.",
          "No requiere de operaciones matemáticas complejas en la CPU.",
          "Es inmune por completo a la computación cuántica."
        ],
        correctIndex: 0
      }
    ]
  },
  "hashing-contrasenas": {
    title: "Hashes y Seguridad de Contraseñas",
    questions: [
      {
        prompt: "¿Por qué no se debe usar un algoritmo hash rápido como SHA-256 para almacenar contraseñas en una base de datos?",
        options: [
          "Porque SHA-256 es reversible y se puede descifrar fácilmente la contraseña original.",
          "Porque su rapidez permite a un atacante realizar miles de millones de intentos de fuerza bruta por segundo usando hardware como GPUs.",
          "Porque SHA-256 requiere una clave simétrica para generar el hash.",
          "Porque SHA-256 no es compatible con bases de datos relacionales."
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el propósito del añadir una sal (salt) aleatoria a una contraseña antes de calcular su hash?",
        options: [
          "Evitar ataques con tablas precomputadas (Rainbow Tables) y asegurar que usuarios con la misma contraseña tengan hashes distintos.",
          "Comprimir el texto para que ocupe menos espacio en disco.",
          "Ocultar la longitud original de la contraseña.",
          "Encriptar la contraseña con la clave pública de la aplicación."
        ],
        correctIndex: 0
      },
      {
        prompt: "¿Cuál de los siguientes algoritmos está diseñado específicamente para hashing seguro de contraseñas mediante factores de costo configurables?",
        options: [
          "AES-GCM",
          "SHA-512",
          "Argon2id",
          "MD5-Salted"
        ],
        correctIndex: 2
      }
    ]
  },
  "intercambio-firmas": {
    title: "Intercambio de Claves y Firmas Digitales",
    questions: [
      {
        prompt: "¿Qué problema resuelve el protocolo de intercambio de claves Diffie-Hellman?",
        options: [
          "Cifrar archivos grandes de forma extremadamente rápida.",
          "Establecer una clave secreta compartida sobre un canal inseguro sin necesidad de transmitir la clave directamente.",
          "Firmar digitalmente documentos sin usar hashes.",
          "Evitar que los mensajes cifrados sean interceptados físicamente."
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se genera una firma digital para asegurar que un mensaje proviene del emisor correcto y no ha sido alterado?",
        options: [
          "El emisor cifra el hash del mensaje utilizando su propia clave privada.",
          "El emisor cifra todo el texto del mensaje con la clave pública del receptor.",
          "El emisor calcula un SHA-256 utilizando una clave simétrica secreta compartida.",
          "El emisor adjunta el vector de inicialización (IV) de su firma en texto plano."
        ],
        correctIndex: 0
      },
      {
        prompt: "¿Qué propiedades de seguridad garantiza una firma digital correctamente implementada?",
        options: [
          "Solo confidencialidad (nadie puede leer el contenido).",
          "Autenticidad, integridad y no repudio.",
          "Velocidad de transmisión y reducción de peso del archivo.",
          "Resistencia absoluta contra ataques cuánticos."
        ],
        correctIndex: 1
      }
    ]
  }
};
