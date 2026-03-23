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
    title: 'Quiz: Interfaz y Jerarquía',
    questions: [
      {
        prompt: "¿Cuál es la diferencia principal entre la ventana 'Hierarchy' (Jerarquía) y la pestaña 'Project' (Proyecto)?",
        options: ["Hierarchy es para código en C# y Project es para imágenes", "Hierarchy muestra los objetos que están activos en la escena actual, Project muestra todos los archivos/activos disponibles en la computadora", "No hay diferencia, son lo mismo", "Project muestra la escena en 3D y Hierarchy muestra los archivos 2D"],
        correctIndex: 1
      },
      {
        prompt: "En Unity, un GameObject (Objeto de Juego) es fundamentalmente...",
        options: ["Un script de C# compilado", "Un contenedor vacío al que se le añaden 'Componentes' (como Transform, Mesh, Colliders) para darle comportamiento e identidad", "Un modelo 3D importado de Blender", "Un archivo de sonido"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué componente tienen OBLIGATORIAMENTE todos los GameObjects de Unity sin excepción?",
        options: ["Rigidbody (Física)", "Mesh Renderer (Dibujado)", "Transform (Posición, Rotación, Escala)", "AudioSource (Sonido)"],
        correctIndex: 2
      }
    ]
  },
  'scripting': {
    key: 'scripting',
    title: 'Quiz: Scripting Básico',
    questions: [
      {
        prompt: "¿En qué se diferencia el método 'Start()' del método 'Update()' en un script de Unity (MonoBehaviour)?",
        options: ["Ambos se ejecutan todo el tiempo, pero Start es más rápido", "Start() corre en los menús y Update() dentro del nivel", "Start() ejecuta una vez al activarse el objeto, Update() se ejecuta de manera repetitiva cada frame (fotograma)", "Start() sirve solo para iniciar el juego entero, Update() sirve para actualizar los gráficos"],
        correctIndex: 2
      },
      {
        prompt: "Si quieres que el Game Designer pueda modificar la 'velocidadDelJugador' (una variable de C#) directamente desde el Inspector de Unity sin tocar código, debes:",
        options: ["Declarar la variable como 'public' o usar la etiqueta '[SerializeField]'", "Escribir un email al Game Designer", "Declarar la variable como const (constante)", "Guardar la variable en un documento de texto"],
        correctIndex: 0
      },
      {
        prompt: "¿Cómo solemos detectar en C# si el usuario presionó la barra espaciadora durante este preciso frame?",
        options: ["if (keyboard.press == true)", "if (Input.GetKeyDown(KeyCode.Space))", "if (Space.IsPressed())", "if (Unity.Detect(Space))"],
        correctIndex: 1
      }
    ]
  },
  'fisica': {
    key: 'fisica',
    title: 'Quiz: Física y Colisiones',
    questions: [
      {
        prompt: "Para que un personaje u objeto caiga bajo la influencia de la gravedad y pueda reaccionar a fuerzas físicas reales, necesitas agregarle un componente llamado:",
        options: ["PhyPhysics2D", "Transform Gravity", "Rigidbody", "MeshCollider"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es la diferencia entre un Collider 'sólido' tradicional y un Collider configurado como 'Is Trigger'?",
        options: ["El Collider sólido funciona en 3D, el Trigger funciona en 2D", "El Collider sólido detecta choques rebotando, el Trigger sirve para detectar que 'algo entró, se mantiene o salió' en esa zona invisible, útil para áreas de efecto o recolección", "No hay diferencia real", "El Trigger pesa más memoria"],
        correctIndex: 1
      },
      {
        prompt: "Si dos objetos se atraviesan y no chocan, la razón más probable es:",
        options: ["Unity está bugeado", "A uno o a ambos les falta el script de Start()", "Uno de los dos (o ambos) no tiene un componente de tipo 'Collider'", "Las luces de la escena están apagadas"],
        correctIndex: 2
      }
    ]
  },
  'ui-ciclo': {
    key: 'ui-ciclo',
    title: 'Quiz: UI y Ciclo de Juego',
    questions: [
      {
        prompt: "Todos los elementos de Interfaz de Usuario (Textos, Botones, Puntuación) deben ir obligatoriamente como hijos del objeto especial llamado:",
        options: ["Background", "UI Manager", "Main Camera", "Canvas"],
        correctIndex: 3
      },
      {
        prompt: "¿Qué librería de C# en Unity usamos en la parte superior del script (using...) para poder cambiar entre Escenas (ej: pasar de Menú a Nivel 1)?",
        options: ["using UnityEngine.SceneManagement;", "using Unity.Levels;", "using System.UI;", "using UnityEngine.SystemManager;"],
        correctIndex: 0
      },
      {
        prompt: "Para que el 'Prototipo Final' (entregable del Sprint Review) sea válido y comunicable, lo ideal es:",
        options: ["Darle al profesor/cliente todo el código en Github sin ejecutar", "Exportar el proyecto con 'Build AND Run' a un formato ejecutable (.exe, WebGL) para que la otra persona pueda probar el resultado tangiblemente", "Mostrar un video de YouTube", "Grabar el menú y enviarlo por correo"],
        correctIndex: 1
      }
    ]
  }
};
