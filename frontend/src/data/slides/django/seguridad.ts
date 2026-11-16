import type { Slide } from '../../../types/slides';

export const seguridadSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '7. Autenticación, Permisos y Seguridad Web 🛡️',
    subtitle: 'Sistema de usuarios nativo, control de acceso basado en roles (RBAC) y blindaje para producción',
    badge: 'Django · Lección 7',
    content: 'Aprende a proteger tus aplicaciones con el sistema de autenticación de Django. Implementaremos control de acceso estricto, gestión de contraseñas con hashing criptográfico y el checklist de seguridad para producción.',
    bulletPoints: [
      '👤 El modelo User de django.contrib.auth: Atributos y métodos clave',
      '🔒 Control de acceso: @login_required y LoginRequiredMixin',
      '👥 Grupos y Permisos (RBAC): Asignación de privilegios granulares',
      '🛡️ Las 4 murallas de Django: CSRF, XSS, Clickjacking e Inyección SQL',
      '🚀 Checklist de seguridad para producción: DEBUG=False y variables de entorno'
    ],
    keyTakeaway: 'Django incluye el sistema de autenticación más maduro de la industria web: nunca guardes contraseñas ni inventes criptografía por tu cuenta.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Anatomía del Modelo User de Django',
    badge: 'Modelo de Identidad',
    content: 'El modelo User integrado (django.contrib.auth.models.User) contiene todo lo necesario para gestionar identidades:',
    visualChart: {
      headers: ['Campo / Atributo', 'Tipo', 'Propósito', 'Regla de Seguridad'],
      rows: [
        ['`username`', '`CharField(150)`', 'Nombre de usuario único para iniciar sesión', 'Alfanumérico y obligatorio'],
        ['`password`', '`CharField(128)`', 'Contraseña cifrada con algoritmo PBKDF2 + SHA256', '¡Nunca almacena texto plano!'],
        ['`is_active`', '`BooleanField`', 'Permite deshabilitar cuentas sin borrar su historial', 'Soft delete de usuarios'],
        ['`is_staff`', '`BooleanField`', 'Determina si el usuario puede ingresar a /admin/', 'Acceso a gestión operativa'],
        ['`is_superuser`', '`BooleanField`', 'Concede todos los permisos sin necesidad de asignarlos', 'Reservado para administradores totales']
      ]
    },
    keyTakeaway: 'Para crear usuarios siempre usa "User.objects.create_user(username, email, password)" para que la contraseña sea hasheada correctamente.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Protección de Vistas: @login_required y LoginRequiredMixin',
    badge: 'Control de Acceso',
    content: 'Bloquear accesos no autorizados es tan simple como aplicar un decorador o heredar de un mixin:',
    codeSnippet: {
      filename: 'cuentas/views.py',
      lang: 'python',
      code: `from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView
from django.shortcuts import render
from .models import Factura

# 1. En Vistas Basadas en Funciones (FBV):
@login_required(login_url='login')
def mi_perfil_privado(request):
    # request.user está garantizado como un usuario autenticado
    return render(request, 'perfil.html', {'usuario': request.user})

# 2. En Vistas Basadas en Clases (CBV):
# LoginRequiredMixin DEBE ir antes que ListView en la herencia:
class MisFacturasView(LoginRequiredMixin, ListView):
    model = Factura
    template_name = 'facturas.html'
    login_url = 'login'

    def get_queryset(self):
        # Filtra únicamente las facturas del usuario autenticado
        return Factura.objects.filter(cliente=self.request.user)`,
      explanation: 'Si un usuario no autenticado intenta entrar, Django lo redirige a login_url guardando la ruta previa (?next=/mi-perfil/).'
    },
    keyTakeaway: 'El parámetro ?next asegura que tras iniciar sesión, el usuario sea devuelto a la página que intentaba ver.'
  },
  {
    id: 4,
    type: 'comparison',
    title: 'Control Basado en Roles: Grupos vs Permisos',
    badge: 'RBAC en Django',
    content: 'No asignes permisos usuario por usuario. Crea Grupos y asigna permisos a cada grupo:',
    visualChart: {
      headers: ['Nivel de Control', 'Ejemplo en Negocio', 'Método en Código', 'Resultado'],
      rows: [
        ['Autenticado', 'Cualquier cliente con cuenta', '`request.user.is_authenticated`', 'Puede ver su historial de compras'],
        ['Grupo: Operador', 'Recepcionistas de taller', '`user.groups.filter(name="Operadores")`', 'Pueden cambiar estado de vehículos'],
        ['Permiso Granular', 'Aprobar pagos contables', '`@permission_required("pagos.can_approve")`', 'Solo usuarios con el permiso específico'],
        ['Superusuario', 'Director de Tecnología (CTO)', '`user.is_superuser`', 'Acceso ilimitado a todo el sistema']
      ]
    },
    keyTakeaway: 'Asigna roles mediante Grupos; si entra un nuevo empleado, solo agrégalo al grupo correspondiente.'
  },
  {
    id: 5,
    type: 'concept',
    title: 'Las 4 Murallas de Seguridad Activa de Django',
    badge: 'Blindaje Técnico',
    content: 'Django neutraliza los ataques web más peligrosos del Top 10 de OWASP de forma nativa:',
    bulletPoints: [
      '1. Cross-Site Request Forgery (CSRF): La etiqueta {% csrf_token %} impide que páginas externas ejecuten acciones a nombre de tus usuarios.',
      '2. Inyección SQL (SQLi): El ORM parametriza automáticamente todos los valores, neutralizando sentencias maliciosas como "\' OR 1=1 --".',
      '3. Cross-Site Scripting (XSS): El motor DTL escapa automáticamente caracteres como <script> evitando inyecciones de código en el navegador.',
      '4. Clickjacking: El middleware X-Frame-Options: DENY impide que tu sitio sea incrustado en iframes transparentes para robar clics.'
    ],
    keyTakeaway: 'Con Django, la seguridad viene activada por defecto; no tienes que instalar librerías extras para estar protegido.'
  },
  {
    id: 6,
    type: 'code',
    title: 'El Checklist Crítico para Pasar a Producción',
    badge: 'settings.py Seguro',
    content: 'Antes de publicar tu proyecto en internet, estos parámetros en settings.py son obligatorios:',
    codeSnippet: {
      filename: 'config/settings_prod.py',
      lang: 'python',
      code: `import os

# 1. ¡NUNCA dejes DEBUG=True en internet! (Revelaría contraseñas y código fuente)
DEBUG = False

# 2. Tu clave secreta debe venir de variables de entorno (.env)
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

# 3. Solo responde peticiones que apunten a tu dominio registrado:
ALLOWED_HOSTS = ['flotaexpress.cl', 'www.flotaexpress.cl']

# 4. Forzar HTTPS y cookies seguras:
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# 5. Ejecutar la auditoría de seguridad de Django en consola:
# $ python manage.py check --deploy`,
      explanation: 'El comando "python manage.py check --deploy" audita automáticamente tu configuración antes de subirla a un servidor real.'
    },
    keyTakeaway: 'Ejecuta siempre "python manage.py check --deploy" antes de publicar tu sitio.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen de la Lección: Aplicación Blindada y Controlada',
    badge: 'Conclusiones del Módulo',
    content: 'Has aprendido a gestionar identidades y proteger tu backend contra ataques cibernéticos:',
    bulletPoints: [
      '✅ Utilizas el modelo User con contraseñas seguras mediante PBKDF2.',
      '✅ Proteges vistas con @login_required y LoginRequiredMixin.',
      '✅ Diseñas esquemas de permisos basados en roles con Grupos.',
      '✅ Comprendes cómo Django neutraliza CSRF, SQLi y XSS.',
      '✅ Conoces el checklist de seguridad con DEBUG=False y check --deploy.'
    ],
    keyTakeaway: 'En el Módulo 8 aprenderemos a exponer estos datos mediante APIs RESTful seguras para aplicaciones móviles y SPAs.'
  }
];
