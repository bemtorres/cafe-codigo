import type { Slide } from '../../../types/slides';

export const diccionariosSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '8. Diccionarios Clave-Valor 🔑',
    subtitle: 'Estructuras asociativas, búsqueda rápida y formato JSON',
    badge: 'Python · Lección 8',
    content: 'Los diccionarios (`dict`) permiten estructurar datos organizados por parejas de Clave y Valor para accesos ultra rápidos.',
    bulletPoints: [
      '🔑 Sintaxis con llaves `{ "clave": valor }`',
      '⚡ Búsqueda directa por clave `dict["clave"]` o consulta segura con `.get()`',
      '🔄 Iteración con `.keys()`, `.values()` e `.items()`',
      '🌐 Representación nativa idéntica a objetos JSON'
    ],
    keyTakeaway: 'Los diccionarios representan información estructurada como registros de base de datos o APIs.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Acceso Directo vs Consulta Segura con .get()',
    badge: 'Manejo de Claves',
    content: 'Acceder a una clave inexistente con corchetes genera un `KeyError`. Usar `.get()` evita que el programa se detenga.',
    bulletPoints: [
      '`dict["clave"]`: Rápido, pero lanza `KeyError` si la clave no existe',
      '`dict.get("clave", valor_defecto)`: Retorna `None` o el valor por defecto asignado sin lanzar error',
      'Las claves deben ser inmutables (Strings, Números, Tuplas)'
    ],
    codeSnippet: {
      filename: 'diccionario_get.py',
      lang: 'python',
      code: `usuario = {"nombre": "Ana", "rol": "Desarrollador", "nivel": 5}

# Acceso directo por clave
print(usuario["nombre"])  # 'Ana'

# Consulta segura con .get()
correo = usuario.get("email", "sin_correo@empresa.com")
print(correo)  # 'sin_correo@empresa.com'`,
      explanation: '.get() evita que el script falle por KeyError cuando la clave no existe.'
    },
    keyTakeaway: 'Usa `.get()` siempre que leas propiedades opcionales recibidas de un formulario o API.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Modificación, Eliminación e Iteración',
    badge: 'Operaciones CRUD en dict',
    content: 'Puedes agregar o modificar pares clave-valor asignando directamente. Para iterar usa `.items()`.',
    bulletPoints: [
      'Agregar/Actualizar: `dict["nueva_clave"] = valor`',
      'Eliminar: `del dict["clave"]` o `dict.pop("clave")`',
      'Iterar pares: `for clave, valor in dict.items():`'
    ],
    codeSnippet: {
      filename: 'iterar_dict.py',
      lang: 'python',
      code: `producto = {"id": 101, "nombre": "Café Espresso", "precio": 2.50}

# Modificar y agregar
producto["precio"] = 2.99
producto["stock"] = 50

# Iteración limpia con .items()
for clave, valor in producto.items():
    print(f"📌 {clave.upper()}: {valor}")`,
      explanation: '.items() retorna tuplas (clave, valor) en cada vuelta del bucle.'
    },
    keyTakeaway: '`.items()` te da acceso simultáneo a la clave y a su valor durante la iteración.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Diccionarios Anidados (Estructuras JSON)',
    badge: 'Estructuras Complejas',
    content: 'Los diccionarios pueden contener otros diccionarios y listas dentro, modelando estructuras de datos complejas.',
    codeSnippet: {
      filename: 'dict_anidado.py',
      lang: 'python',
      code: `empresa = {
    "nombre": "Tech Corp",
    "empleados": [
        {"nombre": "Luis", "puesto": "Backend"},
        {"nombre": "María", "puesto": "Frontend"}
    ]
}

# Acceso encadenado
print(empresa["empleados"][0]["nombre"]) # 'Luis'`,
      explanation: 'Acceso por índice en la lista interna y por clave en el diccionario anidado.'
    },
    keyTakeaway: 'Los diccionarios anidados son la base para manipular respuestas de APIs REST en Python.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de Diccionarios 🎯',
    badge: 'Resumen',
    content: 'Puntos clave repasados en este módulo:',
    bulletPoints: [
      '✅ `dict`: Colección mutable basada en parejas Clave-Valor `{k: v}`',
      '✅ Usa `.get("clave", defecto)` para prevenir `KeyError`',
      '✅ Revisa claves con `in`: `if "precio" in producto:`',
      '✅ Métodos de recorrido: `.keys()`, `.values()`, `.items()`'
    ],
    keyTakeaway: '¡Excelente! Los diccionarios te permiten modelar cualquier entidad del mundo real en Python.'
  }
];
