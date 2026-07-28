import type { Slide } from '../../../types/slides';

export const manejoArchivosSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '17. Manejo de Archivos: Cafetería ☕',
    subtitle: 'Persistencia de datos en disco con open(), modos r/w/a y el bloque with',
    badge: 'Python · Lección 17',
    content: 'Hasta ahora todos los datos en memoria se perdían al cerrar el programa. El manejo de archivos otorga **persistencia real** a tus datos.',
    bulletPoints: [
      '📄 Modos de apertura: `"r"` (lectura), `"w"` (escritura), `"a"` (anexar al final)',
      '🛡️ Context Manager `with open(...) as archivo:` para cierre seguro automático',
      '📖 Lectura con `.read()`, `.readline()` y bucles `for linea in archivo:`',
      '☕ Proyecto real: Registro de ventas de cafetería en archivo CSV / TXT'
    ],
    keyTakeaway: 'Guardar información en disco es la clave para crear programas que no pierden su estado.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Modos de Apertura y el Bloque with',
    badge: 'Fundamentos',
    content: 'El administrador de contexto `with` asegura que el archivo se cierre correctamente en el sistema operativo, incluso si ocurre un error.',
    bulletPoints: [
      '`"r"`: Lectura (Lanza `FileNotFoundError` si el archivo no existe)',
      '`"w"`: Escritura (Crea el archivo o SOBREESCRIBE su contenido por completo)',
      '`"a"`: Anexar / Append (Agrega nuevo contenido al final sin borrar lo anterior)'
    ],
    codeSnippet: {
      filename: 'abrir_archivo.py',
      lang: 'python',
      code: `# Escritura de datos usando 'w'
with open("notas.txt", "w", encoding="utf-8") as archivo:
    archivo.write("Línea 1: Registro inicial\\n")
    archivo.write("Línea 2: Café y Código ☕\\n")

# Al salir del bloque 'with', el archivo se cierra automáticamente`,
      explanation: 'El parámetro encoding="utf-8" previene problemas con tildes y caracteres especiales.'
    },
    keyTakeaway: 'Usa SIEMPRE el bloque `with open(...)` para evitar fugas de recursos en el sistema.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Lectura de Archivos Texto y CSV',
    badge: 'Lectura',
    content: 'Existen múltiples maneras de leer contenido guardado en un archivo.',
    codeSnippet: {
      filename: 'leer_archivo.py',
      lang: 'python',
      code: `# Lectura completa con bucle for (eficiente en memoria)
with open("ventas.csv", "r", encoding="utf-8") as f:
    for linea in f:
        datos = linea.strip().split(",")
        print(f"Producto: {datos[0]} | Precio: \\\${datos[1]}")`,
      explanation: 'Iterar el archivo línea por línea en un bucle for procesa archivos gigantes sin saturar la RAM.'
    },
    keyTakeaway: 'Iterar sobre el objeto de archivo en un bucle `for` es el método más limpio y eficiente.'
  },
  {
    id: 4,
    type: 'project',
    title: '💻 Proyecto Cafetería: Log de Ventas Persistente',
    badge: 'Proyecto Práctico',
    content: 'Script para registrar ventas en un archivo `ventas_cafeteria.txt` usando el modo de anexar `"a"`.',
    codeSnippet: {
      filename: 'cafeteria_log.py',
      lang: 'python',
      code: `def registrar_venta(producto, precio):
    with open("ventas_cafeteria.txt", "a", encoding="utf-8") as f:
        f.write(f"{producto},{precio:.2f}\\n")
    print(f"✅ Venta de {producto} guardada en disco.")

def ver_total_ventas():
    total = 0.0
    try:
        with open("ventas_cafeteria.txt", "r", encoding="utf-8") as f:
            for linea in f:
                prod, precio = linea.strip().split(",")
                total += float(precio)
        print(f"💰 Total Recaudado en Disco: \\\${total:.2f}")
    except FileNotFoundError:
        print("⚠️ No hay ventas registradas aún.")

registrar_venta("Espresso", 2.50)
registrar_venta("Capuchino", 3.20)
ver_total_ventas()`,
      explanation: 'Usa modo a para guardar cada venta sin borrar las anteriores.'
    },
    keyTakeaway: '¡Felicidades! Tus datos ahora sobreviven al reinicio de la aplicación.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de Manejo de Archivos 🎯',
    badge: 'Resumen',
    content: 'Puntos clave del módulo:',
    bulletPoints: [
      '✅ `with open(path, modo) as f:` administra el cierre automático',
      '✅ Modos: `"r"` (leer), `"w"` (sobrescribir), `"a"` (anexar al final)',
      '✅ Especifica `encoding="utf-8"` para soportar tildes y eñes',
      '✅ Recorre archivos grandes línea a línea con `for linea in f:`'
    ],
    keyTakeaway: '¡Excelente! Ahora tus programas en Python cuentan con almacenamiento persistente.'
  }
];
