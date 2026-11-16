import type { Slide } from '../../../types/slides';

export const crudProductosExpendedoraSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '13. Proyecto Integrador: Mantenedor de Productos 🍫',
    subtitle: 'Implementación completa de operaciones CRUD en consola',
    badge: 'Python · Lección 13',
    content: 'En esta lección aplicaremos el patrón CRUD (Create, Read, Update, Delete) para administrar el inventario de una máquina expendedora de snacks.',
    bulletPoints: [
      '➕ **Create**: Agregar nuevos productos al catálogo',
      '📖 **Read**: Listar e inspeccionar stock y precios',
      '✏️ **Update**: Actualizar precios o reponer inventario',
      '🗑️ **Delete**: Dar de baja productos descontinuados'
    ],
    keyTakeaway: 'CRUD es el patrón fundamental detrás de casi todas las aplicaciones empresariales y APIs.'
  },
  {
    id: 2,
    type: 'project',
    title: 'Modelado del Inventario',
    badge: 'Estructura de Datos',
    content: 'Almacenaremos los productos en un diccionario donde la clave es el código del producto (ID) y el valor es un diccionario con sus detalles.',
    codeSnippet: {
      filename: 'inventario_modelo.py',
      lang: 'python',
      code: `inventario = {
    "A1": {"nombre": "Chocolatina", "precio": 1.50, "stock": 10},
    "B2": {"nombre": "Papas Fritas", "precio": 2.00, "stock": 8},
    "C3": {"nombre": "Bebida Cola", "precio": 1.80, "stock": 15}
}`,
      explanation: 'El diccionario por código permite búsquedas directas con O(1) de complejidad.'
    },
    keyTakeaway: 'Usar IDs únicos como claves de diccionario optimiza el acceso y la actualización.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Operaciones Create & Read',
    badge: 'Funciones C & R',
    content: 'Funciones para listar el inventario y registrar nuevos items.',
    codeSnippet: {
      filename: 'crud_crear_leer.py',
      lang: 'python',
      code: `def listar_productos(inv):
    print("\n--- INVENTARIO EXPENDEDORA 🍫 ---")
    for codigo, p in inv.items():
        print(f"[{codigo}] {p['nombre']} - \${p['precio']:.2f} (Stock: {p['stock']})")

def agregar_producto(inv):
    codigo = input("Código (ej. D4): ").strip().upper()
    if codigo in inv:
        print("❌ El código ya existe en el inventario.")
        return
    nombre = input("Nombre del producto: ").strip()
    precio = float(input("Precio: "))
    stock = int(input("Stock inicial: "))
    
    inv[codigo] = {"nombre": nombre, "precio": precio, "stock": stock}
    print(f"✅ {nombre} agregado con éxito.")`,
      explanation: 'Verifica la existencia del código antes de insertar para evitar sobreescrituras accidentales.'
    },
    keyTakeaway: 'La comprobación previa `codigo in inv` garantiza la unicidad del catálogo.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Operaciones Update & Delete',
    badge: 'Funciones U & D',
    content: 'Funciones para modificar el stock y eliminar items descontinuados.',
    codeSnippet: {
      filename: 'crud_actualizar_eliminar.py',
      lang: 'python',
      code: `def reponer_stock(inv):
    codigo = input("Código a reponer: ").strip().upper()
    if codigo in inv:
        cantidad = int(input("Cantidad a agregar: "))
        inv[codigo]["stock"] += cantidad
        print(f"✅ Nuevo stock de {inv[codigo]['nombre']}: {inv[codigo]['stock']}")
    else:
        print("❌ Producto no encontrado.")

def eliminar_producto(inv):
    codigo = input("Código a eliminar: ").strip().upper()
    if codigo in inv:
        eliminado = inv.pop(codigo)
        print(f"🗑️ Producto {eliminado['nombre']} eliminado.")
    else:
        print("❌ Producto no encontrado.")`,
      explanation: 'pop() remueve la clave del diccionario e inyecta confirmación limpia.'
    },
    keyTakeaway: 'pop() permite eliminar elementos de un diccionario retornando su contenido.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen del Proyecto CRUD 🎯',
    badge: 'Resumen',
    content: 'Lo que hemos logrado con este proyecto:',
    bulletPoints: [
      '✅ Diseño de diccionario en memoria como base de datos liviana',
      '✅ Implementación de las 4 operaciones esenciales de software: CRUD',
      '✅ Normalización de entradas con `.strip().upper()`',
      '✅ Manejo modular con funciones independientes'
    ],
    keyTakeaway: '¡Excelente! El patrón CRUD que aplicaste aquí es idéntico al usado en APIs empresariales.'
  }
];
