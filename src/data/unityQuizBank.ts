export interface UnityQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface UnityQuizDefinition {
  key: string;
  title: string;
  questions: UnityQuizQuestion[];
}

export const unityQuizBank: Record<string, UnityQuizDefinition> = {
  'interfaz': {
    key: 'interfaz',
    title: 'Quiz: Interfaz y Escenario 3D',
    questions: [
      {
        prompt: "¿Cuál es la diferencia principal entre la ventana 'Hierarchy' (Jerarquía) y la pestaña 'Project' (Proyecto)?",
        options: [
          "Hierarchy es para código en C# y Project es para imágenes", 
          "Hierarchy muestra los objetos que están activos en la escena actual, Project muestra todos los archivos/activos disponibles en el proyecto", 
          "No hay diferencia, son lo mismo", 
          "Project muestra la escena en 3D y Hierarchy muestra los archivos 2D"
        ],
        correctIndex: 1
      },
      {
        prompt: "En Unity, un GameObject (Objeto de Juego) es fundamentalmente...",
        options: [
          "Un script de C# compilado", 
          "Un contenedor vacío al que se le añaden 'Componentes' (como Transform, Mesh, Colliders) para darle comportamiento e identidad", 
          "Un modelo 3D importado de Blender", 
          "Un archivo de sonido"
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Qué componente tienen OBLIGATORIAMENTE todos los GameObjects de Unity sin excepción?",
        options: [
          "Rigidbody (Física)", 
          "Mesh Renderer (Dibujado)", 
          "Transform (Posición, Rotación, Escala)", 
          "AudioSource (Sonido)"
        ],
        correctIndex: 2
      }
    ]
  },
  'movimiento': {
    key: 'movimiento',
    title: 'Quiz: Física y Movimiento del Jugador',
    questions: [
      {
        prompt: "Si quieres mover un objeto usando fuerzas físicas y gravedad (como rodar una pelota), ¿qué componente debes usar?",
        options: [
          "Mesh Collider", 
          "Transform Translator", 
          "Rigidbody", 
          "Constant Force"
        ],
        correctIndex: 2
      },
      {
        prompt: "¿Qué diferencia hay entre usar 'Input.GetAxis(\"Horizontal\")' y leer una tecla fija con 'Input.GetKeyDown(KeyCode.A)'?",
        options: [
          "Input.GetAxis devuelve un valor decimal continuo entre -1 y 1 (soporta joysticks y aceleración), mientras que GetKeyDown es puramente binario (verdadero/falso)",
          "Input.GetAxis solo funciona en consolas y GetKeyDown en PC",
          "No hay diferencia, ambos devuelven strings",
          "Input.GetAxis es obsoleto y no compila"
        ],
        correctIndex: 0
      },
      {
        prompt: "¿Para qué sirve colocar '[SerializeField]' delante de una variable privada en C#?",
        options: [
          "Para compilar el script más rápido",
          "Permite que la variable sea visible y editable desde el Inspector de Unity, manteniendo la privacidad del código frente a otros scripts",
          "Para que la variable se guarde automáticamente en la base de datos de Unity",
          "Para obligar a que la variable sea de tipo numérico"
        ],
        correctIndex: 1
      }
    ]
  },
  'fisicas-interaccion': {
    key: 'fisicas-interaccion',
    title: 'Quiz: Colisiones y Triggers',
    questions: [
      {
        prompt: "¿Cuál es la diferencia entre un Collider sólido y uno configurado como 'Is Trigger'?",
        options: [
          "El Collider sólido rebota físicamente y bloquea el paso; el Trigger es una zona de detección invisible que permite ser atravesada sin colisión física",
          "El Trigger solo sirve para reproducir música",
          "El sólido funciona en 3D, el Trigger funciona exclusivamente en 2D",
          "El Trigger no requiere de un Rigidbody para registrar eventos"
        ],
        correctIndex: 0
      },
      {
        prompt: "¿Qué función nativa de Unity MonoBehaviour se ejecuta automáticamente cuando el jugador atraviesa una zona marcada como 'Is Trigger'?",
        options: [
          "OnCollisionEnter(Collision col)",
          "OnTriggerEnter(Collider other)",
          "Update()",
          "OnAreaEnter(GameObject obj)"
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es la forma correcta de recolectar un ítem (hacer que desaparezca de la escena) en C#?",
        options: [
          "other.gameObject.SetActive(false); o Destroy(other.gameObject);",
          "other.transform.position = Vector3.zero;",
          "Delete(other);",
          "other.gameObject = null;"
        ],
        correctIndex: 0
      }
    ]
  },
  'ui-gamemanager': {
    key: 'ui-gamemanager',
    title: 'Quiz: UI y GameManager',
    questions: [
      {
        prompt: "En la jerarquía de Unity, ¿dónde deben colocarse todos los elementos de UI como textos de puntuación o botones?",
        options: [
          "Dentro de la Main Camera",
          "Como hijos de un componente especial llamado Canvas",
          "Directamente sueltos en la jerarquía 3D",
          "Dentro de un GameObject vacío llamado Screen"
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Por qué se suele usar un script 'GameManager' centralizado?",
        options: [
          "Porque Unity obliga a tener uno para que el juego compile",
          "Para manejar y coordinar el estado global del juego (puntos, tiempo, victoria) desde un único punto accesible",
          "Para acelerar el rendimiento gráfico de las texturas",
          "Para conectar el teclado con la tarjeta de video"
        ],
        correctIndex: 1
      },
      {
        prompt: "Para actualizar un componente de texto de TextMeshPro mediante código, ¿qué librería debes importar al inicio del script?",
        options: [
          "using UnityEngine.UI;",
          "using TMPro;",
          "using System.Text;",
          "using UnityEngine.Texts;"
        ],
        correctIndex: 1
      }
    ]
  },
  'ciclo-escenas': {
    key: 'ciclo-escenas',
    title: 'Quiz: Ciclo de Juego y Compilación',
    questions: [
      {
        prompt: "¿Qué línea de código C# se utiliza para reiniciar la escena activa cuando el jugador pierde?",
        options: [
          "SceneManager.LoadScene(SceneManager.GetActiveScene().name);",
          "Application.Restart();",
          "SceneManager.RestartActiveScene();",
          "Destroy(SceneManager.activeScene);"
        ],
        correctIndex: 0
      },
      {
        prompt: "Para poder cambiar a una escena o recargarla mediante código, ¿qué paso obligatorio se debe realizar en el editor de Unity?",
        options: [
          "Ponerle candado a la escena",
          "Añadir la escena al listado de escenas en 'Build Settings'",
          "Exportar la escena como un archivo FBX",
          "Crear un prefab de la escena completa"
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el propósito del proceso de 'Build AND Run'?",
        options: [
          "Hacer que el juego corra más rápido dentro del editor de Unity",
          "Compilar el juego en un archivo ejecutable independiente (.exe, WebGL, .apk) fuera del editor para que cualquier persona pueda jugarlo",
          "Escanear el código C# buscando errores ortográficos",
          "Ejecutar pruebas unitarias automatizadas en la nube"
        ],
        correctIndex: 1
      }
    ]
  }
};
