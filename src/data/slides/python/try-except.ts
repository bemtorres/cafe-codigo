import type { Slide } from '../../../types/slides';

export const tryExceptSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '10. Errores Controlados: try y except 🛡️',
    subtitle: 'Manejo de excepciones, robustez, bloques else/finally y raise',
    badge: 'Python · Lección 10',
    content: 'El manejo de excepciones evita que tu aplicación colapse ante entradas inválidas o fallos inesperados.',
    bulletPoints: [
      '🛡️ Captura de excepciones con `try` y `except`',
      '🎯 Manejo específico de errores (`ValueError`, `ZeroDivisionError`, `KeyError`)',
      '🔄 Bloques `else` (ejecución sin error) y `finally` (ejecución garantizada)',
      '🚨 Disparo explícito de excepciones con `raise`'
    ],
    keyTakeaway: 'Un programa profesional maneja errores elegantemente sin mostrar tracebacks crudos al usuario.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Sintaxis Esencial: try y except',
    badge: 'Manejo de Errores',
    content: 'El bloque `try` intenta ejecutar el código. Si ocurre un fallo del tipo indicado en `except`, Python ejecuta esa rama en lugar de romper el programa.',
    bulletPoints: [
      '`try:` Contiene el código propenso a fallar (ej. lecturas de teclado o conversiones)',
      '`except TipoError:` Captura la falla específica y reacciona de forma segura',
      'Evita usos masivos de `except:` a secas sin especificar el tipo de error'
    ],
    codeSnippet: {
      filename: 'try_basico.py',
      lang: 'python',
      code: `try:
    edad_txt = input("Ingresa tu edad: ")
    edad = int(edad_txt)
    print(f"Tienes {edad} años")
except ValueError:
    print("❌ Error: Debes ingresar un número entero válido.")`,
      explanation: 'Si el usuario escribe "veinte", int() lanza ValueError y el bloque except captura la falla.'
    },
    keyTakeaway: '`try...except` previene el cierre abrupto de tus aplicaciones.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Múltiples Bloques except',
    badge: 'Excepciones Específicas',
    content: 'Puedes encadenar múltiples cláusulas `except` para responder de forma personalizada según el tipo de fallo.',
    bulletPoints: [
      '`ValueError`: Conversiones de tipos incompatibles',
      '`ZeroDivisionError`: Intentos de división entre cero',
      '`KeyError`: Intento de acceder a una clave que no existe en un diccionario',
      '`IndexError`: Intento de acceder a un índice fuera de rango en una lista'
    ],
    codeSnippet: {
      filename: 'multiples_except.py',
      lang: 'python',
      code: `datos = {"saldo": 100}

try:
    clave = input("¿Qué propiedad deseas consultar? ")
    monto = datos[clave]
    divisor = int(input("Dividir entre: "))
    print(f"Resultado: {monto / divisor}")
except KeyError:
    print("❌ La propiedad consultada no existe.")
except ZeroDivisionError:
    print("❌ No se puede dividir entre cero.")
except ValueError:
    print("❌ Debes ingresar un número para el divisor.")`,
      explanation: 'Cada bloque gestiona una falla distinta con un mensaje claro para el usuario.'
    },
    keyTakeaway: 'Sé específico en tus excepciones para facilitar la depuración (debugging).'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Estructura Completa: try, except, else y finally',
    badge: 'Flujo Completo',
    content: 'Python permite complementar con los bloques opcionales `else` y `finally`.',
    bulletPoints: [
      '`else`: Se ejecuta ÚNICAMENTE si el bloque `try` finalizó sin ningún error',
      '`finally`: Se ejecuta SIEMPRE (haya ocurrido un error o no), ideal para cerrar recursos o archivos'
    ],
    codeSnippet: {
      filename: 'try_else_finally.py',
      lang: 'python',
      code: `def dividir(a, b):
    try:
        resultado = a / b
    except ZeroDivisionError:
        print("❌ Error de división por cero.")
        return None
    else:
        print("✅ Operación realizada con éxito.")
        return resultado
    finally:
        print("🧹 Limpieza: Intento de cálculo finalizado.")

dividir(10, 2)
dividir(10, 0)`,
      explanation: 'finally se ejecuta independientemente del resultado de la división.'
    },
    keyTakeaway: 'Usa `finally` para asegurar el cierre de conexiones, sockets o archivos abiertos.'
  },
  {
    id: 5,
    type: 'code',
    title: 'Disparar Excepciones con raise',
    badge: 'Validación de Negocio',
    content: 'Puedes forzar una excepción con `raise` cuando se violen reglas de negocio de tu sistema.',
    codeSnippet: {
      filename: 'raise_ejemplo.py',
      lang: 'python',
      code: `def registrar_usuario(edad):
    if edad < 0:
        raise ValueError("La edad no puede ser negativa")
    if edad < 18:
        raise PermissionError("Debes ser mayor de edad para registrarte")
    print("✅ Usuario registrado exitosamente")

try:
    registrar_usuario(-5)
except ValueError as e:
    print(f"⚠️ Validación fallida: {e}")`,
      explanation: 'raise interrumpe el flujo normal notificando la violación de la regla.'
    },
    keyTakeaway: '`raise` permite notificar errores de reglas de negocio a las capas superiores.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen de try / except 🎯',
    badge: 'Resumen',
    content: 'Puntos clave del manejo de errores:',
    bulletPoints: [
      '✅ `try` rodea el código sensible a errores',
      '✅ `except ExcepcionEspecifica:` atrapa fallas concretas',
      '✅ `else` ejecuta código si NO ocurrieron errores',
      '✅ `finally` ejecuta SIEMPRE al finalizar para limpiar recursos',
      '✅ `raise TipoError("mensaje")` lanza una excepción manualmente'
    ],
    keyTakeaway: '¡Excelente! Ahora tus programas en Python son inmunes a cierres inesperados por entradas inválidas.'
  }
];
