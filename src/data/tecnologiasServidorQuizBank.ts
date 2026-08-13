export interface TecnologiasServidorQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface TecnologiasServidorQuizDefinition {
  key: string;
  title: string;
  questions: TecnologiasServidorQuizQuestion[];
}

export const tecnologiasServidorQuizBank: Record<string, TecnologiasServidorQuizDefinition> = {
  'arquitectura-cliente-servidor': {
    key: 'arquitectura-cliente-servidor',
    title: 'Quiz: Arquitectura Cliente-Servidor',
    questions: [
      {
        prompt: '¿Cuál es la función principal del cliente en la arquitectura web?',
        options: ['Almacenar la base de datos', 'Realizar solicitudes (Request) y renderizar la respuesta al usuario', 'Asignar direcciones IP a los servidores', 'Procesar transacciones bancarias en segundo plano'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué componente traduce un nombre de dominio amigable (ej: ejemplo.cl) a una dirección IP numérica?',
        options: ['Servidor Nginx', 'Sistema de Nombres de Dominio (DNS)', 'Certificado SSL', 'Base de datos MySQL'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué elemento identifica de manera única a una computadora o dispositivo conectado a la red?',
        options: ['Dirección IP', 'Número de Puerto', 'Encabezado HTTP', 'Cookie de sesión'],
        correctIndex: 0,
      },
      {
        prompt: 'En el ciclo de comunicación web, ¿qué recibe el cliente como respuesta del servidor?',
        options: ['Una IP estática', 'Una Respuesta HTTP (Response) con código de estado y contenido (HTML, JSON, etc.)', 'El código fuente completo de la base de datos', 'Un nuevo certificado SSL'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué puerto estándar utiliza la comunicación HTTP no cifrada por defecto?',
        options: ['Puerto 80', 'Puerto 443', 'Puerto 22', 'Puerto 3306'],
        correctIndex: 0,
      },
    ],
  },
  'protocolo-http-metodos': {
    key: 'protocolo-http-metodos',
    title: 'Quiz: El Protocolo HTTP y Métodos',
    questions: [
      {
        prompt: '¿Qué método HTTP debe utilizarse para solicitar/obtener información de un servidor sin modificar datos?',
        options: ['POST', 'GET', 'DELETE', 'PUT'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué código de estado HTTP indica que un recurso no fue encontrado en el servidor?',
        options: ['200 OK', '404 Not Found', '500 Internal Server Error', '301 Moved Permanently'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué método HTTP es el más adecuado para enviar un formulario con datos sensibles o crear un nuevo registro?',
        options: ['GET', 'POST', 'TRACE', 'OPTIONS'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué código de estado HTTP representa un error interno del servidor?',
        options: ['500 Internal Server Error', '401 Unauthorized', '403 Forbidden', '201 Created'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué sección de una petición HTTP contiene metadatos como Content-Type, User-Agent o Authorization?',
        options: ['Headers (Encabezados)', 'Body (Cuerpo)', 'Status Line', 'DNS Table'],
        correctIndex: 0,
      },
    ],
  },
  'https-y-certificados-ssl': {
    key: 'https-y-certificados-ssl',
    title: 'Quiz: HTTPS y Certificados SSL/TLS',
    questions: [
      {
        prompt: '¿Cuál es la principal diferencia entre HTTP y HTTPS?',
        options: ['HTTPS es más lento', 'HTTPS cifra la comunicación entre el navegador y el servidor mediante SSL/TLS', 'HTTP requiere una base de datos obligatoria', 'HTTPS solo funciona en teléfonos móviles'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué puerto por defecto utiliza el protocolo cifrado HTTPS?',
        options: ['Puerto 443', 'Puerto 80', 'Puerto 8080', 'Puerto 21'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué autoridad gratuita permite emitir certificados SSL/TLS automatizados?',
        options: ['Let\'s Encrypt', 'Google Chrome', 'Nginx Org', 'Apache Software Foundation'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué sucede si un usuario intenta ingresar a una web por HTTP cuando HTTPS está configurado correctamente?',
        options: ['El servidor envía una redirección (ej: 301) hacia la versión HTTPS', 'Se borra el dominio', 'El navegador se apaga', 'Se muestra un error 500 siempre'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué información verifica un navegador al inspeccionar un certificado SSL?',
        options: ['Dominio válido, fecha de caducidad y Autoridad Certificadora (CA) de confianza', 'Nombre de la base de datos', 'Contraseña del usuario', 'Versión de Python usada'],
        correctIndex: 0,
      },
    ],
  },
  'dns-y-resolucion-ip': {
    key: 'dns-y-resolucion-ip',
    title: 'Quiz: DNS y Resolución IP',
    questions: [
      {
        prompt: '¿Qué tipo de registro DNS apunta un nombre de dominio a una dirección IPv4?',
        options: ['Registro A', 'Registro MX', 'Registro TXT', 'Registro CNAME'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué registro DNS se utiliza para configurar los servidores de correo electrónico de un dominio?',
        options: ['Registro MX', 'Registro AAAA', 'Registro CNAME', 'Registro PTR'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué hace un registro CNAME en DNS?',
        options: ['Crea un alias que apunta a otro nombre de dominio', 'Asigna una dirección IPv6', 'Define los servidores de nombres', 'Establece la contraseña del servidor'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué comando de consola permite consultar la resolución DNS de un dominio?',
        options: ['nslookup o dig', 'ping install', 'http get', 'nginx -s reload'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué tipo de registro DNS se usa para apuntar a una dirección IPv6 de 128 bits?',
        options: ['Registro AAAA', 'Registro A', 'Registro TXT', 'Registro SOA'],
        correctIndex: 0,
      },
    ],
  },
  'dominios-y-subdominios': {
    key: 'dominios-y-subdominios',
    title: 'Quiz: Dominios y Subdominios',
    questions: [
      {
        prompt: 'En la URL "https://api.empresa.cl/productos", ¿cuál es el subdominio?',
        options: ['api', 'empresa.cl', 'https', '/productos'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué significa la sigla TLD en la jerarquía de dominios?',
        options: ['Top-Level Domain (Dominio de Nivel Superior como .cl o .com)', 'Total Location Data', 'Transfer Protocol Level', 'Technical Local Domain'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué son los Nameservers (NS) de un dominio?',
        options: ['Servidores DNS delegados que contienen la zona autoritativa del dominio', 'Bases de datos de usuarios', 'Servidores de archivos estáticos', 'Motores de correo masivo'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cuál es un uso común de los subdominios en empresas?',
        options: ['Separar entornos como api.empresa.cl, admin.empresa.cl o dev.empresa.cl', 'Duplicar el pago del hosting', 'Crear carpetas de Windows', 'Cambiar el lenguaje de programación'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué entidad gestiona los dominios con terminación territorial .cl en Chile?',
        options: ['NIC Chile', 'ICANN Global', 'Amazon Web Services', 'Google Domains'],
        correctIndex: 0,
      },
    ],
  },
  'hosting-vps-y-cloud': {
    key: 'hosting-vps-y-cloud',
    title: 'Quiz: Hosting, VPS y Cloud',
    questions: [
      {
        prompt: '¿En qué consiste el Hosting Compartido?',
        options: ['Varios sitios web comparten los mismos recursos físicos y sistema del servidor', 'Cada cliente es dueño del centro de datos físico', 'Solo permite bases de datos SQLite', 'No requiere acceso a Internet'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué significa la sigla VPS?',
        options: ['Virtual Private Server (Servidor Privado Virtual)', 'Visual Protocol System', 'Variable Power Storage', 'Vector Process Server'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cuál es la principal ventaja de la Nube (Cloud Computing) frente a un servidor físico tradicional?',
        options: ['Escalabilidad bajo demanda y flexibilidad de recursos', 'Es siempre 100% gratuito', 'No requiere nombres de dominio', 'Elimina la necesidad de programar el backend'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué es un Servidor Dedicado?',
        options: ['Un servidor físico completo reservado exclusivamente para una sola organización', 'Un archivo ejecutable de Python', 'Un navegador web configurado', 'Un certificado SSL público'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué permite la Virtualización en servidores?',
        options: ['Dividir un servidor físico en múltiples servidores virtuales aislados', 'Aumentar la velocidad del cable de red', 'Traducir código Python a Java', 'Crear dominios gratis'],
        correctIndex: 0,
      },
    ],
  },
  'servidores-web-nginx-apache': {
    key: 'servidores-web-nginx-apache',
    title: 'Quiz: Servidores Web (Nginx/Apache)',
    questions: [
      {
        prompt: '¿Cuál es el rol principal de un Servidor Web como Nginx o Apache?',
        options: ['Recibir peticiones HTTP/HTTPS y servir archivos o redirigirlas a la aplicación web', 'Diseñar la interfaz gráfica con CSS', 'Ejecutar consultas SQL en la base de datos', 'Registrar dominios en NIC Chile'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué es la función de Reverse Proxy (Proxy Inverso) en Nginx?',
        options: ['Recibir el tráfico público y reenviarlo al puerto donde corre la aplicación (ej: Gunicorn, Node.js)', 'Convertir HTML a PDF', 'Cifrar las contraseñas de los usuarios', 'Apagar el servidor a medianoche'],
        correctIndex: 0,
      },
      {
        prompt: '¿Por qué Nginx es reconocido por su alto rendimiento en peticiones concurrentes?',
        options: ['Usa una arquitectura asíncrona orientada a eventos', 'Usa bases de datos en memoria', 'No utiliza protocolo TCP', 'Solo funciona con archivos de texto'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué archivo de configuración suele utilizar Apache para reglas locales por carpeta?',
        options: ['.htaccess', 'nginx.conf', 'package.json', 'settings.py'],
        correctIndex: 0,
      },
      {
        prompt: '¿En qué puerto suele escuchar Nginx las peticiones seguras con SSL/TLS?',
        options: ['443', '80', '22', '5432'],
        correctIndex: 0,
      },
    ],
  },
  'stack-backend-y-tecnologias': {
    key: 'stack-backend-y-tecnologias',
    title: 'Quiz: Stack Backend y BD',
    questions: [
      {
        prompt: 'En una arquitectura de 3 capas, ¿cuál es el orden de flujo de una petición?',
        options: ['Navegador → Servidor Web (Nginx) → Aplicación Backend → Base de Datos', 'Base de Datos → Navegador → Servidor Web → Backend', 'Navegador → Base de Datos → Nginx → Backend', 'Backend → DNS → Navegador → Nginx'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué combinación representa un framework Backend y su lenguaje correspondiente?',
        options: ['Django con Python / Laravel con PHP / Spring Boot con Java', 'React con C++ / HTML con Python', 'Nginx con SQL / Docker con HTML', 'MySQL con CSS / Flask with Swift'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué rol cumple el WSGI/ASGI (ej: Gunicorn, Uvicorn) en aplicaciones Python?',
        options: ['Servir de puente de interfaz entre el servidor web (Nginx) y la aplicación Python (Flask/Django)', 'Guardar imágenes en el disco', 'Resolver la dirección IP en el DNS', 'Renderizar CSS en el navegador'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué tipo de base de datos relacional suele usarse en entornos de producción web?',
        options: ['PostgreSQL o MySQL', 'LocalStorage de HTML5', 'Archivos de texto .txt', 'CSS Variables'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué ventaja tiene separar el servidor web (Nginx) de la base de datos (Postgres/MySQL)?',
        options: ['Mayor seguridad, aislamiento de recursos y posibilidad de escalar independientemente', 'Es obligatorio para usar HTML', 'Evita la necesidad de usar contraseñas', 'Permite usar dominios sin pagar'],
        correctIndex: 0,
      },
    ],
  },
  'proyecto-despliegue-produccion': {
    key: 'proyecto-despliegue-produccion',
    title: 'Quiz: Proyecto de Despliegue Web',
    questions: [
      {
        prompt: '¿Cuál es el primer paso antes de desplegar una aplicación web a producción en un servidor Linux?',
        options: ['Desarrollar y probar la aplicación en entorno local (localhost)', 'Comprar 10 dominios', 'Desinstalar el sistema operativo', 'Apagar el router de Internet'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué servicio de firewall básico en Linux Ubuntu se utiliza para abrir solo los puertos necesarios (22, 80, 443)?',
        options: ['UFW (Uncomplicated Firewall)', 'Nginx SSL', 'Certbot', 'DNS Resolver'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué herramienta automatiza la obtención e instalación de certificados SSL de Let\'s Encrypt en Nginx?',
        options: ['Certbot', 'npm start', 'pip freeze', 'git clone'],
        correctIndex: 0,
      },
      {
        prompt: 'Para que un dominio como www.mi-proyecto.cl apunte a un nuevo VPS, ¿qué registro DNS debes actualizar?',
        options: ['Apuntar el Registro A a la dirección IP pública del VPS', 'Crear un correo de bienvenida', 'Cambiar el color del sitio', 'Exportar la base de datos'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué comando de consola se usa habitualmente para reiniciar el servicio de Nginx tras modificar su configuración?',
        options: ['sudo systemctl restart nginx', 'python app.py --reload', 'git push origin main', 'chmod 777 /'],
        correctIndex: 0,
      },
    ],
  },
  'diagnostico-y-dev-tools': {
    key: 'diagnostico-y-dev-tools',
    title: 'Quiz: Diagnóstico y Monitoreo Web',
    questions: [
      {
        prompt: '¿Qué pestaña de las Developer Tools (F12) del navegador permite analizar el tiempo de carga y headers de peticiones?',
        options: ['Red (Network)', 'Elementos (Elements)', 'Consola (Console)', 'Aplicación (Application)'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué información puedes inspeccionar en el detalle de una petición HTTP en la pestaña Network?',
        options: ['Headers de Request y Response, Status Code, Payload y Tiempo de Respuesta', 'El código binario del procesador del servidor', 'La contraseña de root de la base de datos', 'El historial personal del usuario'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué comando de consola permite medir la latencia de respuesta o conectividad hacia un servidor?',
        options: ['ping o curl', 'git status', 'mkdir build', 'ls -la'],
        correctIndex: 0,
      },
      {
        prompt: '¿Para qué sirve el comando `curl -I https://ejemplo.cl`?',
        options: ['Para obtener únicamente los encabezados HTTP (Headers) de la respuesta', 'Para formatear el disco duro', 'Para reiniciar el servidor Nginx', 'Para instalar un certificado SSL'],
        correctIndex: 0,
      },
      {
        prompt: '¿Por qué es vital auditar las Cookies y encabezados de seguridad (CORS, CSP, HSTS) en producción?',
        options: ['Para prevenir vulnerabilidades como Cross-Site Scripting (XSS) e inyecciones de datos', 'Para reducir el tamaño de las imágenes', 'Para aumentar el número de visitas en Google', 'Para evitar usar servidores DNS'],
        correctIndex: 0,
      },
    ],
  },
};
