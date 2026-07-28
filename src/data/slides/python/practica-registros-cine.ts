import type { Slide } from '../../../types/slides';

export const practicaRegistrosCineSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '12. Proyecto Integrador: Salas de Cine 🍿',
    subtitle: 'Consolidando Listas, Diccionarios, Bucles y Funciones en un sistema real',
    badge: 'Python · Lección 12',
    content: 'En esta lección práctica construiremos un sistema completo de reservas de asientos para salas de cine en consola.',
    bulletPoints: [
      '🍿 Representación del mapa de asientos con matriz 2D o listas de diccionarios',
      '🎟️ Reserva interactiva con validación de disponibilidad',
      '💰 Cálculo de ingresos acumulados y resumen de taquilla',
      '🧩 Arquitectura modular utilizando funciones dedicadas'
    ],
    keyTakeaway: 'Los proyectos integradores consolidan la teoría transformándola en software funcional.'
  },
  {
    id: 2,
    type: 'project',
    title: 'Requerimientos del Sistema de Cine',
    badge: 'Especificación',
    content: 'El cliente requiere una aplicación de consola para gestionar la sala 1 del cine con las siguientes reglas:',
    bulletPoints: [
      '1. Matriz de 3 filas x 4 columnas de asientos (inicialmente libres `[O]`)',
      '2. Menú interactivo: (1) Ver Asientos, (2) Reservar, (3) Ver Recaudación, (4) Salir',
      '3. Al reservar, el asiento seleccionado cambia su estado a ocupado `[X]`',
      '4. El precio por entrada es de $5.000',
      '5. Validar que la fila y columna ingresadas existan y no estén ocupadas previamente'
    ],
    keyTakeaway: 'Analizar los requerimientos antes de programar previene refactorizaciones pesadas.'
  },
  {
    id: 3,
    type: 'code',
    title: '1. Inicialización y Render del Mapa de Asientos',
    badge: 'Estructura de Datos',
    content: 'Representaremos la sala como una lista de listas (matriz 3x4).',
    codeSnippet: {
      filename: 'cine_mapa.py',
      lang: 'python',
      code: `# Matriz de 3 filas x 4 asientos
sala = [
    ["O", "O", "O", "O"],
    ["O", "O", "O", "O"],
    ["O", "O", "O", "O"]
]

def mostrar_mapa(matriz):
    print("\n--- PANGLA DE CINE 🎬 ---")
    for i, fila in enumerate(matriz):
        asientos_str = " ".join([f"[{a}]" for a in fila])
        print(f"Fila {i + 1}: {asientos_str}")
    print("--------------------------")`,
      explanation: 'mostrar_mapa imprime la disposición visual de los asientos libres [O] y ocupados [X].'
    },
    keyTakeaway: 'Las listas anidadas son perfectas para representar grillas y tableros 2D.'
  },
  {
    id: 4,
    type: 'code',
    title: '2. Lógica de Reserva con Validaciones',
    badge: 'Validación de Entradas',
    content: 'Función para solicitar fila/columna y procesar la compra.',
    codeSnippet: {
      filename: 'cine_reserva.py',
      lang: 'python',
      code: `def reservar_asiento(matriz, precio_entrada):
    try:
        f = int(input("Número de fila (1-3): ")) - 1
        c = int(input("Número de asiento (1-4): ")) - 1
        
        if 0 <= f < 3 and 0 <= c < 4:
            if matriz[f][c] == "O":
                matriz[f][c] = "X"
                print(f"✅ ¡Reserva exitosa! Monto a pagar: \${precio_entrada}")
                return precio_entrada
            else:
                print("❌ El asiento ya está ocupado.")
        else:
            print("⚠️ Ubicación fuera de rango.")
    except ValueError:
        print("❌ Error: Debes ingresar números enteros.")
    return 0`,
      explanation: 'Verifica límites de matriz y disponibilidad antes de cambiar el estado a [X].'
    },
    keyTakeaway: 'Valida siempre los índices de matriz para evitar lanzamientos de IndexError.'
  },
  {
    id: 5,
    type: 'code',
    title: '3. Bucle Principal y Menú Interactivo',
    badge: 'Flujo de Ejecución',
    content: 'Ensamblaje del menú interactivo en una función `main()`.',
    codeSnippet: {
      filename: 'cine_main.py',
      lang: 'python',
      code: `def main():
    PRECIO = 5000
    recaudacion = 0
    sala = [["O"] * 4 for _ in range(3)]
    
    while True:
        print("\n🍿 MENÚ CINE 🍿\n1. Ver Sala\n2. Reservar Asiento\n3. Ver Recaudación\n4. Salir")
        opcion = input("Selecciona una opción: ")
        
        if opcion == "1":
            mostrar_mapa(sala)
        elif opcion == "2":
            recaudacion += reservar_asiento(sala, PRECIO)
        elif opcion == "3":
            print(f"💰 Recaudación Total: \${recaudacion}")
        elif opcion == "4":
            print("👋 ¡Gracias por usar el sistema!")
            break

# Ejecución
# main()`,
      explanation: 'Un bucle while True mantiene viva la aplicación hasta que el usuario elija Salir (4).'
    },
    keyTakeaway: '¡Felicitaciones! Has construido una aplicación completa de consola lista para portafolio.'
  }
];
