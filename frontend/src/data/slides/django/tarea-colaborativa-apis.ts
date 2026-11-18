import type { Slide } from '../../../types/slides';

export const tareaColaborativaApisSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '10. Tarea Colaborativa: APIs que Trabajan en Equipo 🤝🍷',
    subtitle: 'Django REST Framework + requests · Tres actividades progresivas (Calculadora y Distribuidora de Vino)',
    badge: 'Django · Módulo 10 · 20 Puntos',
    content: 'Conecta programas de distintos compañeros en la misma red local mediante solicitudes HTTP POST. Cada participante asume un rol: enviar datos, validar, calcular o transformar resultados en cadena.',
    bulletPoints: [
      '🎯 Objetivo: Conectar servidores de compañeros con POST y JSON sin base de datos ni serializers',
      '🛠️ Preparación común: ALLOWED_HOSTS con IP LAN, runserver 0.0.0.0:8000 y api/utiles.py (leer_numero)',
      '🖩 Actividad 1 (2 compañeros): Cliente A → API Calculadora B (/api/calcular/)',
      '🛡️ Actividad 2 (3 compañeros): Cliente A → Validador B (/api/validar/) → Calculadora C',
      '🍷 Actividad 3 (3 compañeros): Distribuidora de Vino en cadena (A → B → C → B → A)',
      '📋 Entrega del equipo, preguntas de reflexión y rúbrica de evaluación (20 puntos)'
    ],
    keyTakeaway: 'Cuando un backend llama a otro backend con requests.post(), ambos servidores trabajan como eslabones de una cadena distribuida.'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. Las Tres Actividades y Acuerdos del Equipo',
    badge: 'Arquitectura Colaborativa',
    content: 'Flujo general: Cliente → POST con JSON → API → procesamiento → respuesta JSON → cliente. Todos los equipos deben respetar estos acuerdos:',
    visualChart: {
      headers: ['Actividad / Regla', 'Flujo entre Compañeros', 'Regla Clave de HTTP y Red'],
      rows: [
        ['🖩 Actividad 1 (2 personas)', '`A (cliente) → B (calculadora) → A`', 'Operaciones: `suma`, `resta`, `multiplicacion`, `division`'],
        ['🛡️ Actividad 2 (3 personas)', '`A (cliente) → B (validador) → C (calculadora) → B → A`', 'Si falla validación, B responde `400` sin llamar a C; si C no responde, B devuelve `502`'],
        ['🍷 Actividad 3 (3 personas)', '`A (recepción) → B (extracción) → C (transformación) → B (copas) → A`', 'B hace 2 intervenciones en una misma petición síncrona'],
        ['🤝 Acuerdos de Red', 'Misma red LAN (o puertos `8000` y `8001` en 1 PC)', 'Todas las llamadas son `POST` con `json=...` y `timeout`']
      ]
    },
    keyTakeaway: 'Cada servidor devuelve 400 Bad Request para datos de entrada inválidos y 502 Bad Gateway cuando falla la comunicación con el siguiente servidor.'
  },
  {
    id: 3,
    type: 'code',
    title: '2. Preparación Común y Validador Numérico (api/utiles.py)',
    badge: 'Preparación Común',
    content: 'Todos los servidores (B y C) instalan django, djangorestframework y requests, configuran ALLOWED_HOSTS con su IP real y crean el archivo api/utiles.py:',
    bulletPoints: [
      'leer_numero(datos, campo) verifica que el cuerpo sea un diccionario JSON válido',
      'Usa type(valor) not in (int, float) para aceptar números como 12 o 2.5 y rechazar textos como "12" o booleanos True/False',
      'Comprueba con math.isfinite(numero) que el valor no sea infinito ni NaN',
      'Al iniciar cada servidor ejecuta: python manage.py runserver 0.0.0.0:8000'
    ],
    codeSnippet: {
      filename: 'api/utiles.py',
      lang: 'python',
      code: `import math


def leer_numero(datos, campo):
    if not isinstance(datos, dict):
        raise ValueError("El cuerpo debe ser un objeto JSON")
    valor = datos.get(campo)
    if type(valor) not in (int, float):
        raise ValueError(f"{campo} debe ser un número JSON")
    try:
        numero = float(valor)
    except (ValueError, OverflowError):
        raise ValueError(f"{campo} está fuera de rango")
    if not math.isfinite(numero):
        raise ValueError(f"{campo} debe ser finito")
    return numero`,
      explanation: 'En Python bool es subclase de int; por eso usamos type(valor) not in (int, float) en vez de isinstance para rechazar True y False.'
    },
    keyTakeaway: 'Centralizar la validación numérica en api/utiles.py garantiza que todos los servidores del equipo validen con el mismo rigor.'
  },
  {
    id: 4,
    type: 'code',
    title: '3. Actividad 1: Calculadora entre Dos Compañeros (Compañero B)',
    badge: 'Actividad 1 · Servidor B',
    content: 'El Compañero B publica el endpoint POST /api/calcular/. Recibe valor1, valor2 y operacion, valida división por cero y devuelve el resultado:',
    bulletPoints: [
      'Operaciones permitidas: suma, resta, multiplicacion y division',
      'El orden importa: valor1 - valor2 y valor1 / valor2',
      'Si b == 0 en división o la operación no existe, lanza ValueError y responde 400 Bad Request',
      'En api/urls.py de B se registra: urlpatterns = [path("calcular/", calcular)]'
    ],
    codeSnippet: {
      filename: 'Compañero B — api/views.py',
      lang: 'python',
      code: `@api_view(["POST"])
def calcular(request):
    try:
        a = leer_numero(request.data, "valor1")
        b = leer_numero(request.data, "valor2")
        operacion = request.data.get("operacion")
        if operacion == "suma":
            resultado = a + b
        elif operacion == "resta":
            resultado = a - b
        elif operacion == "multiplicacion":
            resultado = a * b
        elif operacion == "division":
            if b == 0:
                raise ValueError("No se puede dividir entre cero")
            resultado = a / b
        else:
            raise ValueError("Operación no permitida")
        if not math.isfinite(resultado):
            raise ValueError("Resultado fuera de rango")
    except ValueError as error:
        return Response({"error": str(error)}, status=400)

    return Response({
        "operacion": operacion, "valor1": a, "valor2": b, "resultado": resultado
    })`,
      explanation: 'Cualquier error de formato o regla matemática se captura en el bloque except ValueError y retorna HTTP 400.'
    },
    keyTakeaway: 'Pruebas obligatorias con 12 y 4: suma -> 16, resta -> 8, multiplicacion -> 48, division -> 3; división por 0 o texto "hola" -> 400.'
  },
  {
    id: 5,
    type: 'code',
    title: '4. Actividad 1: Cliente del Compañero A (cliente.py)',
    badge: 'Actividad 1 · Cliente A',
    content: 'El Compañero A escribe cliente.py para enviar los dos números y la operación al servidor del Compañero B mediante requests.post():',
    bulletPoints: [
      'Reemplaza la IP 192.168.1.30 por la dirección IPv4 real del compañero B',
      'json=datos serializa el diccionario y agrega el encabezado Content-Type: application/json',
      'timeout=10 evita que el programa espere indefinidamente si hay un problema de red',
      'Respuesta esperada (200 OK): {"operacion": "division", "valor1": 12.0, "valor2": 4.0, "resultado": 3.0}'
    ],
    codeSnippet: {
      filename: 'Compañero A — cliente.py',
      lang: 'python',
      code: `import requests

URL = "http://192.168.1.30:8000/api/calcular/"
datos = {"valor1": 12, "valor2": 4, "operacion": "division"}

try:
    respuesta = requests.post(URL, json=datos, timeout=10)
    print("Código HTTP:", respuesta.status_code)
    print("Respuesta:", respuesta.json())
except (requests.RequestException, ValueError) as error:
    print("No se pudo obtener una respuesta JSON:", error)`,
      explanation: 'El compañero A no necesita levantar Django; solo ejecuta python cliente.py en su terminal.'
    },
    keyTakeaway: 'En la Actividad 2, el compañero A reutiliza este mismo archivo cliente.py cambiando únicamente la URL para apuntar a /api/validar/ de B.'
  },
  {
    id: 6,
    type: 'code',
    title: '5. Actividad 2: Calculadora entre Tres Compañeros (Validador B)',
    badge: 'Actividad 2 · A → B → C',
    content: 'Ahora participan 3 compañeros: A envía a B (/api/validar/), B valida y reenvía a C (/api/calcular/). Si los datos son inválidos, B responde 400 SIN llamar a C:',
    bulletPoints: [
      'C reutiliza exactamente la vista calcular de la Actividad 1',
      'B verifica que valor1 y valor2 sean números, que la operación sea válida y que no se divida entre cero',
      'Si la validación pasa, B llama a C con requests.post(URL_CALCULO, json=..., timeout=5)',
      'Si el servidor C está apagado o falla la red, B captura RequestException y responde 502 Bad Gateway'
    ],
    codeSnippet: {
      filename: 'Compañero B (Validador) — api/views.py',
      lang: 'python',
      code: `URL_CALCULO = "http://192.168.1.30:8000/api/calcular/"

@api_view(["POST"])
def validar(request):
    try:
        a = leer_numero(request.data, "valor1")
        b = leer_numero(request.data, "valor2")
        operacion = request.data.get("operacion")
        permitidas = ["suma", "resta", "multiplicacion", "division"]
        if operacion not in permitidas:
            raise ValueError("Operación no permitida")
        if operacion == "division" and b == 0:
            raise ValueError("No se puede dividir entre cero")
    except ValueError as error:
        return Response({"error": str(error)}, status=400)

    try:
        respuesta = requests.post(
            URL_CALCULO,
            json={"valor1": a, "valor2": b, "operacion": operacion},
            timeout=5
        )
        salida = respuesta.json()
    except (requests.RequestException, ValueError):
        return Response({"error": "No se pudo contactar con C"}, status=502)

    if respuesta.status_code not in (200, 400):
        return Response({"error": "Respuesta inesperada de C"}, status=502)
    return Response(salida, status=respuesta.status_code)`,
      explanation: 'Al detener el servidor C y enviar datos válidos desde A, comprobarás que B devuelve HTTP 502.'
    },
    keyTakeaway: 'Validar en B antes de llamar a C ahorra tráfico de red y protege al servidor de cálculo de recibir solicitudes basura.'
  },
  {
    id: 7,
    type: 'comparison',
    title: '6. Actividad 3: Distribuidora de Vino — Fórmulas y Recorrido 🍇🍷',
    badge: 'Actividad 3 · Reglas y Fórmulas',
    content: 'Flujo completo: A (recepción) → B (extracción: 70% jugo, 30% residuo) → C (transformación: 80% vino, 10% vinagre, 10% merma) → B (copas de 0.150 L) → A (informe final):',
    visualChart: {
      headers: ['Etapa / Producto', 'Fórmula Matemática', 'Lote de 100 kg de uva', 'Lote de 50 kg de uva'],
      rows: [
        ['1. Jugo extraído (B)', '`kg_uva × 0.70`', '`70 kg` (`70 L` a 1 kg/L)', '`35 kg` (`35 L` a 1 kg/L)'],
        ['2. Residuo sólido (B)', '`kg_uva × 0.30`', '`30 kg` (en kilogramos)', '`15 kg` (en kilogramos)'],
        ['3. Vino producido (C)', '`litros_jugo × 0.80`', '`56 L`', '`28 L`'],
        ['4. Vinagre y Merma (C)', '`litros_jugo × 0.10` c/u', '`7 L` vinagre y `7 L` merma', '`3.5 L` vinagre y `3.5 L` merma'],
        ['5. Copas completas (B)', '`floor(litros_vino ÷ 0.150)`', '`373 copas` (de 150 mL)', '`186 copas` (de 150 mL)'],
        ['6. Vino sobrante (B)', '`vino − (copas × 0.150)`', '`0.050 L` (`50 mL`)', '`0.100 L` (`100 mL`)']
      ]
    },
    keyTakeaway: '¡Cuidado con las unidades! El residuo de extracción está en kilogramos (masa sólida) y la merma de transformación en litros (volumen líquido); nunca se suman entre sí.'
  },
  {
    id: 8,
    type: 'code',
    title: '7. Actividad 3: Compañero C — API de Transformación (/api/transformar/)',
    badge: 'Actividad 3 · Servidor C',
    content: 'El Compañero C recibe los litros de jugo enviados por B, verifica que estén entre 0 y 7 000 litros y distribuye la producción en vino (80%), vinagre (10%) y merma (10%):',
    bulletPoints: [
      'Ruta en api/urls.py de C: path("transformar/", transformar)',
      'Valida 0 < litros <= 7000 (que corresponde al 70% del lote máximo de 10 000 kg de uva)',
      'Devuelve un objeto JSON con litros_vino, litros_vinagre y litros_merma_proceso',
      'La suma de los tres volúmenes devueltos es igual a litros_jugo'
    ],
    codeSnippet: {
      filename: 'Compañero C — api/views.py',
      lang: 'python',
      code: `from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utiles import leer_numero


@api_view(["POST"])
def transformar(request):
    try:
        litros = leer_numero(request.data, "litros_jugo")
        if not 0 < litros <= 7000:
            raise ValueError("litros_jugo debe ser mayor que 0 y hasta 7000")
    except ValueError as error:
        return Response({"error": str(error)}, status=400)

    return Response({
        "litros_vino": litros * 0.80,
        "litros_vinagre": litros * 0.10,
        "litros_merma_proceso": litros * 0.10
    })`,
      explanation: 'C actúa como especialista de bodega: recibe litros de jugo y devuelve la partición líquida exacta a B.'
    },
    keyTakeaway: 'C no llama de vuelta a B en otra URL; simplemente retorna el Response de la solicitud POST que B abrió.'
  },
  {
    id: 9,
    type: 'code',
    title: '8. Actividad 3: Compañero B — Extracción y Cálculo de Copas (/api/procesar-lote/)',
    badge: 'Actividad 3 · Servidor B',
    content: 'El Compañero B realiza dos intervenciones en la misma función procesar_lote: primero extrae el jugo y llama a C; luego calcula las copas completas con math.floor y responde a A:',
    bulletPoints: [
      '1ª etapa: valida 0 < kg <= 10000 y calcula kg_jugo (70%), kg_residuo (30%) y litros_jugo',
      'Llama a C con requests.post(URL_TRANSFORMACION, json={"litros_jugo": litros_jugo}, timeout=5)',
      'Verifica el balance líquido con math.isclose(vino + vinagre + merma, litros_jugo)',
      '2ª etapa: calcula copas = math.floor(round(vino / 0.150, 9)) y el vino sobrante'
    ],
    codeSnippet: {
      filename: 'Compañero B — api/views.py',
      lang: 'python',
      code: `@api_view(["POST"])
def procesar_lote(request):
    try:
        kg = leer_numero(request.data, "kg_uva")
        if not 0 < kg <= 10000:
            raise ValueError("kg_uva debe ser mayor que 0 y hasta 10000")
    except ValueError as error:
        return Response({"error": str(error)}, status=400)

    kg_jugo = kg * 0.70
    kg_residuo = kg * 0.30
    litros_jugo = kg_jugo / 1.0

    try:
        respuesta = requests.post(URL_TRANSFORMACION, json={"litros_jugo": litros_jugo}, timeout=5)
        respuesta.raise_for_status()
        datos = respuesta.json()
        vino = leer_numero(datos, "litros_vino")
        vinagre = leer_numero(datos, "litros_vinagre")
        merma = leer_numero(datos, "litros_merma_proceso")
        if min(vino, vinagre, merma) < 0 or not math.isclose(vino + vinagre + merma, litros_jugo):
            raise ValueError("Volumen inválido")
    except (requests.RequestException, ValueError):
        return Response({"error": "C no respondió con un resultado válido"}, status=502)

    copas = math.floor(round(vino / 0.150, 9))
    sobrante = max(0.0, vino - copas * 0.150)

    return Response({
        "kg_uva": kg, "kg_jugo_extraido": round(kg_jugo, 3),
        "kg_residuo_extraccion": round(kg_residuo, 3), "litros_jugo": round(litros_jugo, 3),
        "litros_vino": round(vino, 3), "litros_vinagre": round(vinagre, 3),
        "litros_merma_proceso": round(merma, 3), "ml_por_copa": 150,
        "copas_completas": copas, "litros_vino_sobrante": round(sobrante, 3)
    })`,
      explanation: 'round(vino / 0.150, 9) corrige imprecisiones binarias de coma flotante antes de aplicar math.floor.'
    },
    keyTakeaway: 'Para 100 kg de uva se obtienen 56 L de vino -> 373 copas completas de 0.150 L (55.95 L) y sobran 0.05 L (50 mL).'
  },
  {
    id: 10,
    type: 'summary',
    title: '9. Entrega del Equipo, Reflexión y Evaluación (20 Puntos) 🏆',
    badge: 'Pauta de Evaluación',
    content: 'Revisa los criterios de evaluación (20 puntos) y asegúrate de incluir todas las pruebas y respuestas de reflexión:',
    bulletPoints: [
      '🖩 Actividad 1 (4 puntos): Calculadora entre 2 compañeros con las 4 operaciones y errores 400.',
      '🛡️ Actividad 2 (5 puntos): Cadena A -> B -> C validando en B (400 sin llamar a C) y probando caída de C (502).',
      '🍷 Actividad 3 (7 puntos): Distribuidora de vino probada con 100 kg (373 copas), 50 kg (186 copas), errores 400 y 502.',
      '📊 Evidencias, unidades y explicación del flujo (4 puntos): Esquema de IPs/puertos/rutas, código completo, capturas de terminales B y C, tabla con unidades (kg vs L) y las 4 preguntas de reflexión.'
    ],
    keyTakeaway: '¡Excelente trabajo en equipo! Continúa con los desafíos interactivos para repasar cada detalle de la Tarea Colaborativa.'
  }
];
