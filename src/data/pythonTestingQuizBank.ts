export interface PythonTestingQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface PythonTestingQuizDefinition {
  key: string;
  title: string;
  questions: PythonTestingQuizQuestion[];
}

export const pythonTestingQuizBank: Record<string, PythonTestingQuizDefinition> = {
  'intro-pytest': {
    key: 'intro-pytest',
    title: 'Quiz: Introducción y pytest',
    questions: [
      {
        prompt: '¿Qué comando suele usarse para instalar pytest en un entorno virtual?',
        options: ['pip install testing', 'pip install pytest', 'python -m pytest install', 'apt install pytest-python'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué es una prueba unitaria en Python?',
        options: [
          'Un script que imprime todo el proyecto',
          'Una función de test que verifica una pieza pequeña de lógica de forma aislada',
          'Solo un archivo llamado unit.py',
          'Un tipo de variable',
        ],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo debe llamarse una función de test reconocida por convención de pytest?',
        options: ['Debe empezar con test_', 'Debe llamarse main', 'Debe terminar en _unit', 'Da igual el nombre'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué ventaja principal aporta pytest frente a ejecutar prints manuales?',
        options: [
          'Hace el código más largo siempre',
          'Automatiza verificaciones y falla de forma clara cuando algo no cumple',
          'Elimina la necesidad de Python',
          'Solo sirve para bases de datos',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'La pirámide de pruebas suele recomendar…',
        options: [
          'Casi solo pruebas end-to-end',
          'Muchas pruebas unitarias en la base y menos en la punta (E2E)',
          'No escribir tests',
          'Igual número de tests en cada capa siempre',
        ],
        correctIndex: 1,
      },
    ],
  },
  'patron-aaa-python': {
    key: 'patron-aaa-python',
    title: 'Quiz: Patrón AAA en Python',
    questions: [
      {
        prompt: 'Las tres A del patrón AAA son…',
        options: ['Always, Any, All', 'Arrange, Act, Assert', 'Apply, Add, Assert', 'Ask, Answer, Abort'],
        correctIndex: 1,
      },
      {
        prompt: 'En Arrange normalmente…',
        options: [
          'Solo se comprueba el resultado',
          'Se preparan datos, objetos o dependencias necesarios para el test',
          'Se borra el código fuente',
          'Se despliega a producción',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'En Act se ejecuta…',
        options: [
          'Solo importaciones',
          'La acción o función que quieres verificar',
          'Siempre pytest.main()',
          'El linter',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Assert en Python con pytest suele usar…',
        options: ['print()', 'la palabra assert o helpers como pytest.raises', 'solo comentarios', 'input()'],
        correctIndex: 1,
      },
      {
        prompt: 'Un test legible con AAA ayuda a…',
        options: [
          'Ocultar qué se prueba',
          'Que otro desarrollador entienda rápido el escenario, la acción y la expectativa',
          'Evitar ejecutar el test',
          'Compilar a bytecode más rápido',
        ],
        correctIndex: 1,
      },
    ],
  },
  'assertions-pytest': {
    key: 'assertions-pytest',
    title: 'Quiz: Aserciones',
    questions: [
      {
        prompt: 'En pytest, si `assert x == y` falla, ¿qué ocurre?',
        options: [
          'Python ignora el error',
          'El test falla y pytest muestra valores de x e y',
          'Se reinicia el intérprete',
          'Solo falla en modo debug',
        ],
        correctIndex: 1,
      },
      {
        prompt: '¿Para qué sirve `assert condicion`?',
        options: [
          'Definir una función',
          'Comprobar que la condición sea verdadera; si no, el test falla',
          'Importar módulos',
          'Crear un bucle',
        ],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué comparación usarías para verificar que dos listas tienen los mismos elementos en el mismo orden?',
        options: ['assert lista1 is lista2', 'assert lista1 == lista2', 'assert lista1 = lista2', 'assert eq(lista1, lista2) sin assert'],
        correctIndex: 1,
      },
      {
        prompt: '¿`assert not x` verifica que…?',
        options: ['x sea verdadero', 'x sea falso en contexto booleano', 'x sea None siempre', 'x sea un entero'],
        correctIndex: 1,
      },
      {
        prompt: 'Los mensajes opcionales en `assert expr, "mensaje"` sirven para…',
        options: [
          'Ocultar el fallo',
          'Aclarar por qué esperabas algo cuando el assert falla',
          'Desactivar pytest',
          'Cambiar la versión de Python',
        ],
        correctIndex: 1,
      },
    ],
  },
  'organizar-tests': {
    key: 'organizar-tests',
    title: 'Quiz: Organizar tests',
    questions: [
      {
        prompt: 'Por convención, los archivos de test en pytest suelen llamarse…',
        options: ['main.py', 'test_*.py o *_test.py', 'solo tests.py en la raíz del SO', 'app.py'],
        correctIndex: 1,
      },
      {
        prompt: '¿Para qué sirve `conftest.py`?',
        options: [
          'Reemplazar pytest por unittest',
          'Compartir fixtures y configuración entre tests del directorio y subdirectorios',
          'Es el archivo principal de Django siempre',
          'Solo para documentación',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Colocar tests en una carpeta separada (p. ej. `tests/`) ayuda a…',
        options: [
          'Mezclar código de producción con experimentos sin orden',
          'Separar claramente lo que se instala o ejecuta en prod de lo que valida el comportamiento',
          'Evitar ejecutar pytest',
          'Eliminar imports',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Los paquetes de test a veces incluyen `__init__.py` para…',
        options: [
          'Evitar que Python reconozca el directorio',
          'Tratar el directorio como paquete cuando aplica tu layout y resolución de imports',
          'Solo en Python 2',
          'No tiene ningún propósito',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Ejecutar `pytest` en la raíz del proyecto normalmente…',
        options: [
          'Solo busca archivos .txt',
          'Descubre y ejecuta tests según convenciones y opciones de configuración',
          'Instala pip automáticamente',
          'Borra archivos test_*',
        ],
        correctIndex: 1,
      },
    ],
  },
  'fixtures-pytest': {
    key: 'fixtures-pytest',
    title: 'Quiz: Fixtures',
    questions: [
      {
        prompt: 'Una fixture en pytest es…',
        options: [
          'Un comentario especial ignorado',
          'Una función que prepara datos u objetos reutilizables para los tests',
          'Solo un error de sintaxis',
          'Un tipo de excepción built-in',
        ],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se declara una fixture?',
        options: [
          'Con @pytest.fixture sobre una función',
          'Con def fixture(): pass sin decorador',
          'Solo en archivos .java',
          'Con import fixture',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Si una fixture tiene scope="module", se ejecuta…',
        options: [
          'Una vez por cada assert',
          'Una vez por módulo de test (según el ciclo de vida de pytest)',
          'Nunca',
          'Solo al instalar pytest',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'autouse=True en una fixture significa que…',
        options: [
          'Se ignora siempre',
          'Se aplica automáticamente a los tests del scope sin pedirla como argumento',
          'Solo corre en Windows',
          'Desactiva otros tests',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Yield en una fixture puede usarse para…',
        options: [
          'Solo detener Python',
          'Entregar un recurso y ejecutar teardown después del test',
          'Evitar teardown',
          'Reemplazar assert',
        ],
        correctIndex: 1,
      },
    ],
  },
  parametrizacion: {
    key: 'parametrizacion',
    title: 'Quiz: Parametrización',
    questions: [
      {
        prompt: '@pytest.mark.parametrize sirve para…',
        options: [
          'Instalar paquetes',
          'Ejecutar el mismo test con distintos valores de entrada esperados',
          'Desactivar pytest',
          'Solo medir tiempo',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Parametrizar reduce…',
        options: [
          'La claridad siempre',
          'Código repetido cuando solo cambian los datos del caso',
          'La necesidad de asserts',
          'El uso de Python 3',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Los ids en parametrize pueden ayudar a…',
        options: [
          'Ocultar qué caso falló',
          'Identificar mejor cada caso en la salida del test',
          'Eliminar parámetros',
          'Compilar a C++',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Varios @pytest.mark.parametrize anidados permiten…',
        options: [
          'Combinaciones de parámetros (producto cartesiano de casos)',
          'Solo un valor fijo',
          'Ejecutar un solo test en total',
          'Evitar fixtures',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Si un caso parametrizado falla, pytest muestra…',
        options: [
          'Nada',
          'Qué valores de parámetros correspondían a ese caso',
          'Solo el primer error del archivo sin contexto',
          'Un mensaje genérico sin línea',
        ],
        correctIndex: 1,
      },
    ],
  },
  'mocks-python': {
    key: 'mocks-python',
    title: 'Quiz: Mocks y patch',
    questions: [
      {
        prompt: 'unittest.mock.Mock permite…',
        options: [
          'Borrar el disco',
          'Simular objetos y registrar llamadas sin implementación real',
          'Solo medir CPU',
          'Reemplazar Python por Java',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'patch() se usa habitualmente para…',
        options: [
          'Reemplazar temporalmente un atributo o import en el sitio de uso durante el test',
          'Parchear el intérprete del sistema operativo',
          'Solo formatear código',
          'Instalar pytest',
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Por qué mockear una API HTTP en un unit test?',
        options: [
          'Para depender siempre de la red y la latencia real',
          'Para aislar la lógica y hacer el test rápido y determinista',
          'Para que el test no pueda fallar nunca',
          'Porque Python no tiene requests',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'mock.assert_called_once() verifica que…',
        options: [
          'No se llamó nunca',
          'El mock fue llamado exactamente una vez',
          'Se llamó al menos diez veces',
          'El mock es None',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Es importante hacer patch donde…',
        options: [
          'Se define la librería original en el sistema',
          'Se usa el nombre en el módulo bajo prueba (donde se busca el símbolo)',
          'Siempre en site-packages',
          'En el archivo conftest del usuario final',
        ],
        correctIndex: 1,
      },
    ],
  },
  'excepciones-pytest': {
    key: 'excepciones-pytest',
    title: 'Quiz: Excepciones esperadas',
    questions: [
      {
        prompt: 'pytest.raises(ValueError) se usa para…',
        options: [
          'Suprimir cualquier error',
          'Afirmar que el bloque bajo prueba lanza ValueError',
          'Convertir ValueError en Warning',
          'Instalar excepciones',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Si el código NO lanza la excepción esperada, el test…',
        options: ['Pasa igual', 'Falla', 'Se salta', 'Ejecuta solo en CI'],
        correctIndex: 1,
      },
      {
        prompt: 'match= en pytest.raises puede servir para…',
        options: [
          'Ignorar el mensaje',
          'Comprobar que el mensaje de error coincide con un patrón',
          'Desactivar la excepción',
          'Cambiar el tipo de excepción',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'pytest.warns se relaciona con…',
        options: ['Solo SyntaxError', 'Advertencias (warnings), no solo excepciones', 'Imports', 'Tipado estático'],
        correctIndex: 1,
      },
      {
        prompt: 'Probar errores esperados es útil para…',
        options: [
          'Ocultar bugs',
          'Documentar contratos: entradas inválidas deben fallar de forma controlada',
          'Evitar tests negativos',
          'Eliminar try/except del código de producción siempre',
        ],
        correctIndex: 1,
      },
    ],
  },
  cobertura: {
    key: 'cobertura',
    title: 'Quiz: Cobertura',
    questions: [
      {
        prompt: 'La cobertura de código mide…',
        options: [
          'Solo la velocidad del CPU',
          'Qué líneas o ramas fueron ejecutadas por los tests',
          'Cuántos usuarios tiene la app',
          'El tamaño del disco',
        ],
        correctIndex: 1,
      },
      {
        prompt: '100% de cobertura no garantiza…',
        options: [
          'Nada útil',
          'Que no haya bugs: solo que el código fue ejecutado, no que todos los casos estén bien diseñados',
          'Que pytest esté instalado',
          'Que el código compile',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'pytest-cov suele integrarse para…',
        options: [
          'Reemplazar assert',
          'Generar informes de cobertura al ejecutar pytest',
          'Solo formatear con black',
          'Desplegar a la nube',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Una rama no cubierta puede indicar…',
        options: [
          'Que el código es perfecto',
          'Código muerto o casos de test faltantes para ese camino',
          'Que no hay funciones',
          'Que pytest está roto',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Es sano combinar cobertura con…',
        options: [
          'Solo métricas de líneas ignorando calidad de asserts',
          'Revisión humana, tests significativos y buen diseño de casos',
          'Eliminar tests lentos siempre',
          'No ejecutar CI',
        ],
        correctIndex: 1,
      },
    ],
  },
  'proyecto-final': {
    key: 'proyecto-final',
    title: 'Quiz: Proyecto final',
    questions: [
      {
        prompt: 'En TDD, el ciclo típico es…',
        options: [
          'Deploy, luego test',
          'Test que falla (rojo), código mínimo (verde), refactor',
          'Solo refactor sin tests',
          'Escribir todo el código y nunca testear',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Una suite de tests automatizada en CI ayuda a…',
        options: [
          'Evitar revisiones humanas',
          'Detectar regresiones antes de fusionar cambios',
          'Eliminar Git',
          'Borrar dependencias',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Los tests lentos o frágiles suelen…',
        options: [
          'Mejorar siempre la moral del equipo',
          'Desincentivar correr la suite; conviene aislar IO y usar mocks donde toque',
          'Ser el objetivo principal del testing',
          'Reemplazar documentación',
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Mantener tests cerca del comportamiento esperado significa…',
        options: [
          'Copiar código de producción en el test sin asserts',
          'Leer el test y entender qué garantiza el sistema para los usuarios o módulos vecinos',
          'No usar nombres descriptivos',
          'Evitar parametrización',
        ],
        correctIndex: 1,
      },
      {
        prompt: '¿Buena práctica al cerrar un módulo con tests?',
        options: [
          'Un solo test gigante sin estructura',
          'Varios tests pequeños que cubren casos felices, límite y errores',
          'Solo probar con print',
          'Depender siempre de datos de producción',
        ],
        correctIndex: 1,
      },
    ],
  },
};
