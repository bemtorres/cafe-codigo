export interface QuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

export const excelQuizBank: Record<string, QuizData> = {
  'introduccion': {
    title: 'Introducción a Excel',
    questions: [
      {
        prompt: '¿Cómo se identifica de forma estandarizada una celda en Excel?',
        options: ['Por un número seguido de una letra (ej. 4B)', 'Por una letra seguida de un número (ej. B4)', 'Por sus coordenadas cardinales', 'Con un nombre inventado'],
        correctIndex: 1
      },
      {
        prompt: 'Un libro de Excel (Workbook) puede contener...',
        options: ['Solo una hoja de cálculo', 'Múltiples hojas delimitadas por pestañas', 'Únicamente gráficos, no texto', 'Un máximo de 10 columnas'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué es una "Fila" en Excel?',
        options: ['Un grupo de celdas verticales identificadas por letras', 'Un grupo de celdas horizontales identificadas por números', 'Un tipo de gráfico circular', 'La barra superior de herramientas'],
        correctIndex: 1
      },
      {
        prompt: '¿Cuál es la extensión de archivo estándar de Excel en versiones modernas?',
        options: ['.doc', '.exe', '.xlsx', '.txt'],
        correctIndex: 2
      },
      {
        prompt: '¿Cómo se llama la intersección entre una Fila y una Columna?',
        options: ['Bloque', 'Cuadro', 'Celda', 'Segmento'],
        correctIndex: 2
      },
      {
        prompt: '¿Para qué sirve la "Barra de Fórmulas"?',
        options: ['Para cambiar el color de la fuente', 'Para introducir o ver el contenido de la celda activa', 'Para imprimir el documento', 'Para navegar entre hojas'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué letra identifica a la primera columna de una hoja de cálculo?',
        options: ['Z', '1', 'A', 'X'],
        correctIndex: 2
      },
      {
        prompt: 'Si estás en la celda A1 y bajas tres filas, ¿en qué celda estarás?',
        options: ['B1', 'A4', 'A3', 'D1'],
        correctIndex: 1
      },
      {
        prompt: '¿Cuál es el número máximo de filas aproximado en una hoja de Excel moderna?',
        options: ['100,000', '1,048,576', '50,000', 'Ilimitado'],
        correctIndex: 1
      },
      {
        prompt: '¿Cómo se pueden ver las diferentes hojas de un mismo libro?',
        options: ['Cerrando y abriendo el archivo', 'Usando las pestañas en la parte inferior izquierda', 'Haciendo clic derecho en el centro', 'Buscando en el menú Ayuda'],
        correctIndex: 1
      },
      {
        prompt: 'En la interfaz de Excel, la "cinta" es…',
        options: ['Solo la barra de título del archivo', 'La franja con pestañas como Inicio, Insertar y Datos y sus botones', 'El área de impresión', 'La lista de hojas ocultas'],
        correctIndex: 1
      },
      {
        prompt: 'Un archivo .xlsx es normalmente…',
        options: ['Una sola celda', 'Un libro que puede contener varias hojas', 'Solo un gráfico', 'Una base de datos SQL'],
        correctIndex: 1
      },
      {
        prompt: 'Si en la misma hoja tienes un inventario en A:D y un resumen en F:G, ¿qué afirmación es correcta?',
        options: ['No puede haber dos tablas en una hoja', 'Son dos bloques distintos; cada celda sigue teniendo una sola dirección (ej. F2)', 'Excel mezcla automáticamente ambas tablas', 'La segunda tabla debe empezar siempre en A'],
        correctIndex: 1
      },
      {
        prompt: 'La pestaña "Datos" suele usarse para…',
        options: ['Solo cambiar fuentes', 'Herramientas como filtro, texto en columnas o quitar duplicados', 'Insertar WordArt', 'Cerrar el libro sin guardar'],
        correctIndex: 1
      }
    ]
  },
  'calculos-matematicos': {
    title: 'Cálculos Matemáticos',
    questions: [
      {
        prompt: '¿Qué símbolo es obligatorio para iniciar cualquier fórmula o cálculo?',
        options: ['""', '$', '=', '#'],
        correctIndex: 2
      },
      {
        prompt: 'Resolviendo =10+5*2 (PEMDAS), ¿cuál es el resultado?',
        options: ['30', '20', '17', '25'],
        correctIndex: 1
      },
      {
        prompt: '¿Cuál es el operador para realizar una multiplicación?',
        options: ['x', '·', '*', '^'],
        correctIndex: 2
      },
      {
        prompt: '¿Cuál es el operador para realizar una división?',
        options: [':', '/', '\\', '%'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué se resuelve primero en la fórmula =(A1+B1)*C1?',
        options: ['La multiplicación por C1', 'La suma de A1+B1', 'Depende del valor de las celdas', 'Excel da error con paréntesis'],
        correctIndex: 1
      },
      {
        prompt: 'Si quiero restar el valor de B2 al valor de A2, la fórmula correcta es:',
        options: ['=A2-B2', '=RESTA(A2,B2)', 'A2 menos B2', '=A2+B2-'],
        correctIndex: 0
      },
      {
        prompt: '¿Para qué sirve el acento circunflejo (^) en una fórmula?',
        options: ['Para multiplicar', 'Para elevar a una potencia (Exponenciación)', 'Para dividir', 'Para redondear'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué sucede si intentas dividir un número por 0 en Excel?',
        options: ['Devuelve 0', 'Devuelve el error #¡DIV/0!', 'La celda se queda en blanco', 'Se cierra Excel'],
        correctIndex: 1
      },
      {
        prompt: '¿Es posible realizar cálculos entre celdas de diferentes hojas?',
        options: ['No, solo en la misma hoja', 'Sí, anteponiendo el nombre de la hoja seguido de !', 'Solo si las hojas tienen el mismo nombre', 'Solo mediante macros'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué operador tiene mayor jerarquía según PEMDAS?',
        options: ['Suma (+)', 'Multiplicación (*)', 'Paréntesis ()', 'Resta (-)'],
        correctIndex: 2
      },
      {
        prompt: 'El resultado de =(10+5)*2 es…',
        options: ['17', '30', '25', '20'],
        correctIndex: 1
      },
      {
        prompt: 'El resultado de =10+5*2 (sin paréntesis extra) es…',
        options: ['30', '20', '25', '17'],
        correctIndex: 1
      },
      {
        prompt: 'Para subtotal de cantidad por precio en la misma fila, lo habitual es…',
        options: ['=B2+C2', '=B2*C2', '=B2^C2', '=B2/C2 siempre'],
        correctIndex: 1
      },
      {
        prompt: 'Si arrastras una fórmula que usa B2 y C2 hacia abajo una fila, en Excel típico…',
        options: ['Siempre quedará B2 y C2 fijos', 'Pasará a B3 y C3 (referencias relativas)', 'Dará error', 'Se borrará el contenido'],
        correctIndex: 1
      }
    ]
  },
  'funciones-basicas': {
    title: 'Funciones Básicas',
    questions: [
      {
        prompt: '¿Para qué sirve el símbolo de dos puntos (:) en una función?',
        options: ['Para separar valores individuales', 'Para definir un rango (desde:hasta)', 'Para indicar el final de la fórmula', 'Para multiplicar'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué función usarías para encontrar el valor más alto en un grupo de sueldos?',
        options: ['=ALTO()', '=SUMA()', '=MAX()', '=GRANDE()'],
        correctIndex: 2
      },
      {
        prompt: 'La función =PROMEDIO(A1:A10) equivale a:',
        options: ['Sumar A1 y A10 y dividir por 2', 'Sumar todas las celdas y dividirlas por la cantidad de celdas', 'Contar cuántas celdas tienen números', 'Encontrar el valor medio'],
        correctIndex: 1
      },
      {
        prompt: '¿Cuál es la diferencia entre CONTAR y CONTARA?',
        options: ['No hay diferencia', 'CONTAR cuenta números y CONTARA cuenta cualquier celda no vacía', 'CONTARA solo cuenta letras', 'CONTAR es para hojas protegidas'],
        correctIndex: 1
      },
      {
        prompt: 'Si quiero sumar los valores desde B2 hasta B50, la función es:',
        options: ['=SUMAR(B2,B50)', '=SUMA(B2:B50)', '=PLUS(B2:B50)', '=AÑADIR(B2-B50)'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué devuelve la función =MIN(C2:C10)?',
        options: ['El valor más pequeño del rango', 'El primer valor de la lista', 'La cantidad de valores negativos', 'El promedio de los menores'],
        correctIndex: 0
      },
      {
        prompt: 'Si usas =SUMA(A1; A5), ¿qué celdas se están sumando?',
        options: ['A1, A2, A3, A4 y A5', 'Solo A1 y A5', 'A1 dividido A5', 'Ninguna, da error'],
        correctIndex: 1
      },
      {
        prompt: '¿Cómo se llama el argumento que va dentro de los paréntesis de una función?',
        options: ['Condición', 'Variable', 'Parámetro / Argumento', 'Cuerpo'],
        correctIndex: 2
      },
      {
        prompt: '¿Se pueden anidar funciones (poner una dentro de otra)?',
        options: ['No, es imposible', 'Sí, por ejemplo =SUMA(PROMEDIO(A1:A5), 10)', 'Solo en versiones Pro de Excel', 'Solo si son la misma función'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué función usarías para saber cuántos empleados hay en una lista (contando sus nombres)?',
        options: ['=CONTAR()', '=CONTARA()', '=SUMA()', '=BUSCAR()'],
        correctIndex: 1
      },
      {
        prompt: 'En Excel en español, B2:B11 en un argumento de función indica…',
        options: ['Solo las celdas B2 y B11', 'Un rango continuo desde B2 hasta B11', 'Un error de sintaxis', 'Multiplicar B2 por B11'],
        correctIndex: 1
      },
      {
        prompt: '=SUMA(B2;B11) suma…',
        options: ['Todas las celdas desde B2 hasta B11', 'Únicamente B2 y B11', 'B11 dividido B2', 'Nada, siempre da error'],
        correctIndex: 1
      },
      {
        prompt: 'Una fila de totales debajo de gastos suele usar…',
        options: ['=PROMEDIO(B2:B20) para sumar todo', '=SUMA(B2:B20) para el total del rango', '=CONTAR para sumar dinero', '=MIN para el total'],
        correctIndex: 1
      },
      {
        prompt: 'CONTAR sobre un rango de celdas cuenta…',
        options: ['Solo celdas con números', 'Cualquier celda no vacía', 'Solo texto', 'Solo fechas en formato texto'],
        correctIndex: 0
      }
    ]
  },
  'referencias': {
    title: 'Referencias y Fijado',
    questions: [
      {
        prompt: '¿Para qué sirve presionar F4 sobre la referencia de una celda?',
        options: ['Para borrar la celda', 'Para alternar entre referencia relativa, absoluta y mixta ($)', 'Para formatear como moneda', 'Para cerrar Excel'],
        correctIndex: 1
      },
      {
        prompt: 'Si arrastras la fórmula =A1 hacia abajo, la siguiente celda tendrá:',
        options: ['=$A$1', '=B1', '=A2', '=A1'],
        correctIndex: 2
      },
      {
        prompt: '¿Qué parte de la celda se fija en la referencia $A1?',
        options: ['La fila 1', 'La columna A', 'Toda la celda', 'Nada se fija'],
        correctIndex: 1
      },
      {
        prompt: '¿Cuál es una referencia "Absoluta" completa?',
        options: ['A1', '$A1', 'A$1', '$A$1'],
        correctIndex: 3
      },
      {
        prompt: '¿Cuál es la utilidad principal de las referencias absolutas?',
        options: ['Que la fórmula sea más bonita', 'Evitar que una celda de referencia cambie al copiar o arrastrar la fórmula', 'Hacer que los números no se borren', 'Proteger la hoja con contraseña'],
        correctIndex: 1
      },
      {
        prompt: 'Si tienes un tipo de cambio en E1 y quieres multiplicar todos tus precios por él, debes usar:',
        options: ['=B2*E1', '=B2*$E$1', '=B2*E$1$', '=$B2*E1'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué sucede si arrastras la referencia =$A$1 horizontalmente?',
        options: ['Cambia a =$B$1', 'Se mantiene como =$A$1', 'Cambia a =A1', 'Da error de referencia'],
        correctIndex: 1
      },
      {
        prompt: 'Una referencia mixta se ve así:',
        options: ['A1', '$A$1', 'A$1', '1A'],
        correctIndex: 2
      },
      {
        prompt: '¿Qué significa el símbolo $ en una referencia?',
        options: ['Moneda Dólar', 'Fijar o "Anclar"', 'Error de valor', 'Ocultar columna'],
        correctIndex: 1
      },
      {
        prompt: 'Si copias la fórmula =B$1 de la celda C1 a la celda D2, ¿qué obtendrás?',
        options: ['=C$2', '=C$1', '=B$1', '=B$2'],
        correctIndex: 1
      },
      {
        prompt: 'La referencia $A1 fija…',
        options: ['Solo la fila 1', 'Solo la columna A', 'Toda la celda A1', 'Nada'],
        correctIndex: 1
      },
      {
        prompt: 'Para que el tipo de cambio en E1 no se desplace al copiar hacia abajo, conviene…',
        options: ['Dejar E1 sin símbolos', 'Usar $E$1 en la fórmula', 'Borrar la columna E', 'Usar solo E1 sin copiar'],
        correctIndex: 1
      },
      {
        prompt: 'A$1 al copiarse hacia abajo en la misma columna…',
        options: ['Suele pasar a A$2', 'Siempre queda A$1', 'Pasa a B$1', 'Excel la borra'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué atajo alterna relativas, absolutas y mixtas sobre la referencia activa en la barra de fórmulas?',
        options: ['Ctrl+F4', 'F4', 'F5', 'Alt+Enter'],
        correctIndex: 1
      }
    ]
  },
  'funciones-condicionales': {
    title: 'Lógica y Condicionales',
    questions: [
      {
        prompt: '¿Cuál es la estructura correcta de la función SI?',
        options: ['=SI(valor, verdadero)', '=SI(prueba_logica, valor_si_verdadero, valor_si_falso)', '=SI(si_es_verdad, entonces)', '=SI(A1; B1; C1)'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué devuelve =SI(10>5; "Gana"; "Pierde")?',
        options: ['Gana', 'Pierde', '10', 'Error'],
        correctIndex: 0
      },
      {
        prompt: '¿Para qué sirve la función CONTAR.SI?',
        options: ['Para contar todas las celdas', 'Para contar celdas que cumplen un criterio específico', 'Para sumar celdas con números', 'Para contar cuántas letras "SI" hay'],
        correctIndex: 1
      },
      {
        prompt: '¿Cómo escribirías el criterio "mayor a 100" en un CONTAR.SI?',
        options: ['>100', '">100"', 'MAYOR(100)', 'A1>100'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué hace la función SUMAR.SI?',
        options: ['Suma dos números', 'Suma un rango si las celdas cumplen una condición', 'Suma todo el libro', 'Cuenta y luego suma'],
        correctIndex: 1
      },
      {
        prompt: 'En =SI(A1>=6; "Aprobado"; "Reprobado"), ¿qué pasa si A1 es exactamente 6?',
        options: ['Aprobado', 'Reprobado', 'Error', 'Queda vacío'],
        correctIndex: 0
      },
      {
        prompt: '¿Se pueden anidar funciones SI?',
        options: ['No, solo una por celda', 'Sí, para evaluar múltiples condiciones (ej. notas A, B, C)', 'Solo en Google Sheets', 'Solo si el resultado es numérico'],
        correctIndex: 1
      },
      {
        prompt: '¿Cuál es el operador lógico para "distinto de"?',
        options: ['!=', '<>', '><', 'NOT'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué función usarías para sumar solo las ventas de la categoría "Electrónica"?',
        options: ['=SUMA()', '=SUMAR.SI()', '=CONTAR.SI()', '=FILTER()'],
        correctIndex: 1
      },
      {
        prompt: '¿Es obligatorio poner el argumento de "valor_si_falso" en un SI?',
        options: ['Sí, siempre', 'No, pero si no se pone y la prueba es falsa, Excel devuelve "FALSO"', 'No, Excel inventa un resultado', 'Excel da error crítico'],
        correctIndex: 1
      },
      {
        prompt: 'SUMAR.SI con criterio "Electrónica" en categorías y rango de montos sirve para…',
        options: ['Contar cuántas celdas dicen Electrónica', 'Sumar montos solo de filas cuya categoría coincide', 'Ordenar la tabla', 'Borrar filas no electrónicas'],
        correctIndex: 1
      },
      {
        prompt: 'CONTAR.SI(C2:C500;"Aprobado") devuelve…',
        options: ['La suma de notas', 'Cuántas celdas del rango cumplen el criterio', 'El promedio', 'Siempre cero'],
        correctIndex: 1
      },
      {
        prompt: 'Muchas condiciones encadenadas con SI dentro de SI suelen volverse…',
        options: ['Más legibles siempre', 'Difíciles de mantener; a veces conviene IFS u otras funciones en Excel moderno', 'Imposibles en Excel', 'Obligatorias'],
        correctIndex: 1
      },
      {
        prompt: 'Si la nota en B2 es 6 y la regla es aprobar con >=6, =SI(B2>=6;"Aprobado";"Reprobado") da…',
        options: ['Reprobado', 'Aprobado', 'Error', 'Vacío'],
        correctIndex: 1
      }
    ]
  },
  'funciones-busqueda': {
    title: 'Búsquedas de Datos',
    questions: [
      {
        prompt: '¿Qué significa la "V" en BUSCARV?',
        options: ['Valor', 'Vertical', 'Variable', 'Validación'],
        correctIndex: 1
      },
      {
        prompt: '¿En qué columna de la matriz debe estar el valor que buscamos con BUSCARV?',
        options: ['En la última', 'En la del medio', 'En la primera (la más a la izquierda)', 'Cualquiera'],
        correctIndex: 2
      },
      {
        prompt: '¿Qué indica el tercer argumento en =BUSCARV(H1, A:C, 3, 0)?',
        options: ['El valor buscado', 'El número de columna de donde extraer el resultado', 'La cantidad de filas a bajar', 'El tipo de coincidencia'],
        correctIndex: 1
      },
      {
        prompt: '¿Para qué sirve el último argumento (0 o FALSO) en BUSCARV?',
        options: ['Para indicar que la tabla está vacía', 'Para exigir una coincidencia exacta', 'Para buscar el valor más cercano', 'No sirve para nada'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué error aparece si BUSCARV no encuentra el valor?',
        options: ['#VALUE!', '#NAME?', '#N/A (o #N/D)', '#REF!'],
        correctIndex: 2
      },
      {
        prompt: '¿Para qué sirve BUSCARH?',
        options: ['Para búsquedas en Horizontal (por filas)', 'Para buscar Hojas', 'Para buscar Historiales', 'Para búsquedas rápidas'],
        correctIndex: 0
      },
      {
        prompt: '¿Cuál es la ventaja de BUSCARX sobre BUSCARV?',
        options: ['Es más rápida', 'No requiere que la columna de búsqueda sea la primera', 'Puede devolver valores hacia la izquierda', 'Todas las anteriores'],
        correctIndex: 3
      },
      {
        prompt: 'Si quieres buscar un precio usando un código, y el código está en la columna C y el precio en la B, ¿puedes usar BUSCARV directo?',
        options: ['Sí, sin problemas', 'No, porque BUSCARV solo busca hacia la derecha', 'Solo si ordenas de la A a la Z', 'Solo con macros'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué hace la función COINCIDIR?',
        options: ['Busca el valor y devuelve el dato', 'Devuelve la posición (número de fila/columna) de un valor en un rango', 'Compara si dos celdas son iguales', 'Suma valores idénticos'],
        correctIndex: 1
      },
      {
        prompt: 'La combinación de ÍNDICE y COINCIDIR se usa para:',
        options: ['Búsquedas más potentes y flexibles que BUSCARV', 'Calcular promedios complejos', 'Formatear tablas', 'Borrar duplicados'],
        correctIndex: 0
      },
      {
        prompt: 'El flujo típico de BUSCARV es: valor en una celda (ej. E1) + matriz donde la primera columna es…',
        options: ['Siempre la de precios', 'La columna de búsqueda (ej. códigos)', 'La última columna', 'Cualquier columna da igual'],
        correctIndex: 1
      },
      {
        prompt: 'Si el código buscado no existe en la matriz, BUSCARV con FALSO suele mostrar…',
        options: ['0', '#N/D o #N/A', 'VERDADERO', 'El texto "OK"'],
        correctIndex: 1
      },
      {
        prompt: 'BUSCARH busca el valor en la primera fila del rango y luego…',
        options: ['Solo cuenta filas', 'Baja a la fila indicada por el argumento de número de fila', 'Ordena toda la hoja', 'Elimina duplicados'],
        correctIndex: 1
      },
      {
        prompt: 'BUSCARX frente a BUSCARV (cuando está disponible) puede…',
        options: ['Solo buscar en la columna A', 'Separar columna de búsqueda y columna de resultado sin exigir orden concreto', 'No usar coincidencia exacta', 'Solo funcionar en Excel 2003'],
        correctIndex: 1
      }
    ]
  },
  'funciones-fechas': {
    title: 'Manejo de Fechas',
    questions: [
      {
        prompt: '¿Qué devuelve la función =HOY()?',
        options: ['La fecha y la hora actual', 'Solo la fecha del sistema', 'El día de la semana', 'El año actual'],
        correctIndex: 1
      },
      {
        prompt: '¿Cómo almacena Excel las fechas internamente?',
        options: ['Como texto', 'Como números de serie (Día 1 = 1/1/1900)', 'Como imágenes', 'Como archivos adjuntos'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué hace la función =SIFECHA(inicio, fin, "Y")?',
        options: ['Calcula los años transcurridos entre dos fechas', 'Dice si una fecha existe', 'Suma años a una fecha', 'Pregunta si hoy es fin de año'],
        correctIndex: 0
      },
      {
        prompt: 'Para extraer solo el mes (número) de una fecha en B1, usas:',
        options: ['=MONTHNAME(B1)', '=MES(B1)', '=FECHA.MES(B1)', '=EXTRAER(B1)'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué diferencia hay entre HOY() y AHORA()?',
        options: ['Ninguna', 'AHORA() incluye también la hora (minutos y segundos)', 'HOY() es más rápida', 'AHORA() solo funciona en inglés'],
        correctIndex: 1
      },
      {
        prompt: 'Si restas dos celdas con fechas, Excel te dará:',
        options: ['Error', 'La cantidad de días entre ambas', 'Una fecha nueva', 'El promedio de los meses'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué devuelve =DIA("15/05/2024")?',
        options: ['Mayo', '15', 'Miércoles', '2024'],
        correctIndex: 1
      },
      {
        prompt: '¿Cómo escribes el parámetro en SIFECHA para obtener los meses?',
        options: ['"Month"', '"M"', '"MES"', 'm'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué función usarías para obtener el último día de un mes?',
        options: ['=FIN.MES()', '=ULTIMO()', '=MES.FINAL()', '=DIA.MAX()'],
        correctIndex: 0
      },
      {
        prompt: '¿Año bisiesto? Excel lo calcula correctamente...',
        options: ['No, hay que hacerlo manual', 'Sí, automáticamente al manejar fechas', 'Solo si instalas un plugin', 'Solo en años pares'],
        correctIndex: 1
      },
      {
        prompt: '=AÑO(B2) devuelve…',
        options: ['El nombre del mes', 'El año de la fecha en B2 como número', 'Los días entre fechas', 'La hora actual'],
        correctIndex: 1
      },
      {
        prompt: 'Si B2 y C2 son fechas válidas, =C2-B2 suele dar…',
        options: ['Un error siempre', 'La cantidad de días entre ambas', 'La suma de años', 'Texto "fecha"'],
        correctIndex: 1
      },
      {
        prompt: 'SIFECHA con tercer argumento "M" pide…',
        options: ['Metros', 'Meses completos entre fechas', 'Minutos', 'Millones'],
        correctIndex: 1
      },
      {
        prompt: 'HOY() frente a AHORA(): AHORA incluye…',
        options: ['Solo el año', 'También hora (y normalmente minutos/segundos)', 'Solo el día de la semana en texto', 'Nada más que HOY'],
        correctIndex: 1
      }
    ]
  },
  'analisis-celdas': {
    title: 'Análisis y Formato',
    questions: [
      {
        prompt: '¿Dónde se encuentra la opción de "Formato Condicional"?',
        options: ['Pestaña Insertar', 'Pestaña Inicio', 'Pestaña Datos', 'Pestaña Vista'],
        correctIndex: 1
      },
      {
        prompt: '¿Para qué sirve el Formato Condicional?',
        options: ['Para cambiar el color de todas las celdas', 'Para aplicar formato automáticamente según el valor de la celda', 'Para proteger celdas con clave', 'Para corregir ortografía'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué herramienta permite ocultar filas que no cumplen cierto criterio?',
        options: ['Ordenar', 'Filtros', 'Ocultar columnas', 'Agrupar'],
        correctIndex: 1
      },
      {
        prompt: '¿Cuál es la diferencia entre Ordenar y Filtrar?',
        options: ['Ordenar cambia la posición; Filtrar oculta datos temporalmente', 'Filtrar borra los datos; Ordenar no', 'Son lo mismo', 'No existen en Excel'],
        correctIndex: 0
      },
      {
        prompt: '¿Qué es la "Validación de Datos"?',
        options: ['Revisar si los cálculos son correctos', 'Restringir lo que el usuario puede escribir en una celda (ej. lista desplegable)', 'Poner contraseña al archivo', 'Un tipo de gráfico'],
        correctIndex: 1
      },
      {
        prompt: 'Para crear un semáforo de colores en una lista de ventas, usaría:',
        options: ['Filtros', 'Escalas de Color o Conjunto de Iconos (Formato Condicional)', 'Pintar uno por uno', 'Tablas Dinámicas'],
        correctIndex: 1
      },
      {
        prompt: '¿Puedo filtrar registros por color de celda?',
        options: ['No, solo por texto o números', 'Sí, Excel permite filtrar por color de relleno o fuente', 'Solo en Excel para Mac', 'Solo si exportas a PDF'],
        correctIndex: 1
      },
      {
        prompt: 'En un filtro, ¿qué significa la opción "Borrar filtro"?',
        options: ['Borrar todos los datos de la tabla', 'Volver a mostrar todas las filas ocultas', 'Eliminar la cabecera', 'Cerrar el archivo'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué es el "Análisis Rápido"?',
        options: ['Un examen para el usuario', 'Un botón que aparece al seleccionar datos para crear gráficos o formatos velozmente', 'Una macro secreta', 'El modo lectura de Excel'],
        correctIndex: 1
      },
      {
        prompt: 'Quitar Duplicados se encuentra en la pestaña:',
        options: ['Inicio', 'Insertar', 'Datos', 'Revisar'],
        correctIndex: 2
      },
      {
        prompt: 'La validación de datos con lista desplegable sirve para…',
        options: ['Cambiar el tema del Excel', 'Limitar valores permitidos en una celda', 'Ocultar la hoja', 'Traducir fórmulas'],
        correctIndex: 1
      },
      {
        prompt: 'Al usar un filtro, las filas que no cumplen el criterio…',
        options: ['Se borran del archivo al instante', 'Suelen ocultarse temporalmente', 'Se convierten en gráfico', 'Pasan a otra hoja solas'],
        correctIndex: 1
      },
      {
        prompt: 'Quitar duplicados sobre un rango seleccionado…',
        options: ['Solo colorea celdas', 'Elimina filas duplicadas según columnas elegidas', 'Crea una tabla dinámica', 'No existe en Excel'],
        correctIndex: 1
      },
      {
        prompt: 'Ordenar por la columna de ingresos de mayor a menor…',
        options: ['Elimina las filas pequeñas', 'Reordena las filas visibles según ese criterio', 'Solo funciona con texto', 'Requiere macros'],
        correctIndex: 1
      }
    ]
  },
  'tablas-dinamicas': {
    title: 'Tablas Dinámicas',
    questions: [
      {
        prompt: '¿Cuál es la función principal de una Tabla Dinámica?',
        options: ['Hacer que las celdas se muevan', 'Resumir y analizar grandes cantidades de datos fácilmente', 'Crear dibujos en las celdas', 'Hacer cálculos más lentos'],
        correctIndex: 1
      },
      {
        prompt: '¿En qué pestaña se inserta una Tabla Dinámica?',
        options: ['Inicio', 'Insertar', 'Datos', 'Fórmulas'],
        correctIndex: 1
      },
      {
        prompt: '¿Cómo se llaman las áreas donde arrastras los campos en una Tabla Dinámica?',
        options: ['Cuadros, Cajas, Espacios', 'Filtros, Columnas, Filas y Valores', 'Norte, Sur, Este, Oeste', 'A, B, C, D'],
        correctIndex: 1
      },
      {
        prompt: 'Si quieres ver el total de ventas por vendedor, ¿dónde pones el "Monto de Venta"?',
        options: ['En Filas', 'En Columnas', 'En Valores', 'En Filtros'],
        correctIndex: 2
      },
      {
        prompt: '¿Qué sucede si cambias los datos originales de la tabla base?',
        options: ['La Tabla Dinámica se actualiza sola al instante', 'Debes hacer clic derecho en la Tabla Dinámica y poner "Actualizar"', 'Se borra la Tabla Dinámica', 'No se puede cambiar el origen'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué es un "Gráfico Dinámico"?',
        options: ['Un gráfico que tiene animaciones 3D', 'Un gráfico vinculado a una Tabla Dinámica que cambia según sus filtros', 'Un dibujo hecho a mano', 'Un gráfico que vuela por la pantalla'],
        correctIndex: 1
      },
      {
        prompt: '¿Se pueden agrupar fechas por años o meses en una Tabla Dinámica?',
        options: ['No, solo por días sueltos', 'Sí, Excel lo permite haciendo clic derecho sobre las fechas en la tabla', 'Solo si usas BUSCARV', 'Solo en la versión de Office 365'],
        correctIndex: 1
      },
      {
        prompt: '¿Qué área usarías para que tu reporte muestre solo los datos de un país específico sin saturar la tabla?',
        options: ['Filas', 'Columnas', 'Filtros', 'Valores'],
        correctIndex: 2
      },
      {
        prompt: '¿Puedo cambiar "Suma" por "Promedio" o "Cuenta" en el área de Valores?',
        options: ['No, siempre suma', 'Sí, en la Configuración de campo de valor', 'Solo si borras la tabla y empiezas de nuevo', 'Solo mediante fórmulas manuales'],
        correctIndex: 1
      },
      {
        prompt: 'Una ventaja clave de las Tablas Dinámicas es que...',
        options: ['No alteran los datos originales', 'Ocupan poca memoria', 'Tienen colores bonitos por defecto', 'Todas las anteriores'],
        correctIndex: 3
      },
      {
        prompt: 'Insertar > Tabla (con formato de tabla) frente a Tabla dinámica: la dinámica es…',
        options: ['Lo mismo con otro nombre', 'Un resumen pivotable; la Tabla estructura el rango de datos', 'Solo para gráficos', 'Solo para borrar datos'],
        correctIndex: 1
      },
      {
        prompt: 'Si añades filas nuevas al origen de una tabla dinámica, normalmente debes…',
        options: ['Reinstalar Excel', 'Actualizar la tabla dinámica para refrescar el informe', 'Renombrar el archivo', 'Convertir todo a PDF'],
        correctIndex: 1
      },
      {
        prompt: 'Los segmentadores (slicers) en tablas dinámicas sirven sobre todo para…',
        options: ['Cambiar el color de la cinta', 'Filtrar la dinámica de forma visual en presentaciones', 'Escribir macros', 'Proteger con contraseña'],
        correctIndex: 1
      },
      {
        prompt: 'Poner "Monto" en el área Valores de una dinámica suele…',
        options: ['Ocultar los números', 'Resumirlos (a menudo sumando por defecto)', 'Borrar la columna del origen', 'Solo mostrar texto'],
        correctIndex: 1
      }
    ]
  }
};
