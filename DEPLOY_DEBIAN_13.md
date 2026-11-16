# 🚀 Guía de Despliegue en Servidor: Debian 13 (Trixie) + Nginx + PostgreSQL + SSL

Esta guía paso a paso detalla la instalación, configuración y puesta en producción de **Café y Código** (Frontend Astro + Backend NestJS + PostgreSQL) en un servidor con **Debian 13**, sirviendo el sistema bajo el dominio y subdominio **`www.cafeycodigo.org`** (y `cafeycodigo.org`) con **Nginx**, **PM2** y certificados **SSL gratuitos con Let's Encrypt**.

---

## 🏗️ Arquitectura en Producción

```mermaid
flowchart LR
    User["🌐 Usuario / Navegador\n(https://www.cafeycodigo.org)"] --> Nginx["🛡️ Nginx (Puerto 80 / 443 SSL)"]
    
    subgraph Servidor Debian 13
        Nginx -->|Rutas Frontend /| Static["📁 Astro Build (/var/www/cafeycodigo/dist)\n(Archivos estáticos en caché ultra-rápida)"]
        Nginx -->|Rutas API /api/*| PM2["⚙️ PM2: NestJS Daemon\n(http://127.0.0.1:3001/api)"]
        PM2 --> DB[("🐘 PostgreSQL 16/17\n(Base de datos local cafeycodigo)")]
    end
```

* **Frontend:** Nginx sirve directamente los archivos compilados de Astro (`/var/www/cafeycodigo/dist`) con compresión `gzip`, `cache-control` y latencia mínima.
* **Backend:** Nginx actúa como Reverse Proxy para las peticiones a `/api/`, derivándolas a **NestJS** corriendo en `127.0.0.1:3001` administrado por **PM2**.
* **Ventaja de esta arquitectura:** Al compartir el mismo dominio (`www.cafeycodigo.org`), no existen problemas de CORS ni cookies bloqueadas entre frontend y backend.

---

## 📋 Requisitos Previos

1. Servidor VPS o dedicado con **Debian 13**.
2. Acceso como usuario `root` o con privilegios `sudo`.
3. Registros DNS configurados en tu proveedor de dominio (Cloudflare, Namecheap, GoDaddy, etc.):
   * **Tipo A:** `cafeycodigo.org` $\rightarrow$ `IP_DE_TU_SERVIDOR`
   * **Tipo A (o CNAME):** `www.cafeycodigo.org` $\rightarrow$ `IP_DE_TU_SERVIDOR`

---

## 🛠️ Paso 1: Actualizar el Sistema e Instalar Paquetes Base

Conéctate a tu servidor por SSH y actualiza los repositorios:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential ufw software-properties-common ca-certificates gnupg
```

---

## 🟢 Paso 2: Instalar Node.js (v22 o v24 LTS)

Instalaremos Node.js mediante el repositorio oficial de NodeSource:

```bash
# Descargar e importar clave GPG de NodeSource
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Configurar repositorio para Node.js 22 LTS
NODE_MAJOR=22
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

# Actualizar e instalar Node.js
sudo apt update
sudo apt install -y nodejs

# Verificar versiones instaladas
node -v    # v22.x.x o v24.x.x
npm -v     # 10.x.x
```

Instalar **PM2** globalmente para administrar el proceso de NestJS en segundo plano:

```bash
sudo npm install -g pm2
```

---

## 🐘 Paso 3: Instalar y Configurar PostgreSQL

Instalar PostgreSQL y sus utilidades:

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### Crear Base de Datos y Usuario para Café y Código:

Accede a la consola de PostgreSQL:
```bash
sudo -u postgres psql
```

Dentro del prompt interactivo de PostgreSQL (`postgres=#`), ejecuta las siguientes sentencias SQL (reemplaza `TU_PASSWORD_SUPER_SEGURO` por una clave real):

```sql
CREATE DATABASE cafeycodigo;
CREATE USER cafeycodigo_user WITH ENCRYPTED PASSWORD 'TU_PASSWORD_SUPER_SEGURO';
GRANT ALL PRIVILEGES ON DATABASE cafeycodigo TO cafeycodigo_user;
ALTER DATABASE cafeycodigo OWNER TO cafeycodigo_user;
\c cafeycodigo
GRANT ALL ON SCHEMA public TO cafeycodigo_user;
\q
```

---

## 📂 Paso 4: Clonar el Proyecto y Preparar Directorios

Ubicaremos el proyecto en `/var/www/cafeycodigo`:

```bash
# Crear directorio y asignar permisos a tu usuario (ej. debian o tu usuario no-root)
sudo mkdir -p /var/www/cafeycodigo
sudo chown -R $USER:$USER /var/www/cafeycodigo

# Clonar tu repositorio (o copiar los archivos de tu proyecto)
git clone <URL_DE_TU_REPOSITORIO_GIT> /var/www/cafeycodigo
cd /var/www/cafeycodigo
```

---

## ⚙️ Paso 5: Configurar y Compilar el Backend (NestJS)

Entra a la carpeta `backend/` y crea su archivo `.env` de producción:

```bash
cd /var/www/cafeycodigo/backend
cp .env.example .env
nano .env
```

Configura tu `.env` de producción con los valores reales:

```env
PORT=3001
NODE_ENV=production

# Base de datos local PostgreSQL
DATABASE_URL="postgresql://cafeycodigo_user:TU_PASSWORD_SUPER_SEGURO@localhost:5432/cafeycodigo?schema=public"

# Clave secreta fuerte para JWT
JWT_SECRET="genera-una-cadena-aleatoria-larga-y-segura-2026"
JWT_EXPIRES_IN="7d"

# Google OAuth 2.0 (Configurado en Google Cloud Console para https://www.cafeycodigo.org)
GOOGLE_CLIENT_ID="tu-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"
GOOGLE_CALLBACK_URL="https://www.cafeycodigo.org/api/auth/google/callback"

# URL pública de producción
FRONTEND_URL="https://www.cafeycodigo.org"

# Tus credenciales SMTP reales para envío de correos
SMTP_HOST="smtp.tudominio.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER="no-reply@cafeycodigo.org"
SMTP_PASS="tu-clave-smtp-real"
SMTP_FROM="\"Café y Código\" <no-reply@cafeycodigo.org>"
```

*(Guarda con `Ctrl + O`, Enter y sal con `Ctrl + X`).*

### Instalar dependencias, migrar base de datos y compilar backend:

```bash
# Instalar dependencias
npm install

# Generar cliente de Prisma
npm run prisma:generate

# Aplicar el esquema en PostgreSQL
npm run prisma:push

# (Opcional) Cargar usuarios iniciales de prueba (Admin, Docente, Editor, Alumno, Curso)
npm run prisma:seed

# Compilar NestJS a código de producción (dist/)
npm run build
```

---

## 🚀 Paso 6: Configurar PM2 para el Backend NestJS

Para que el backend corra como servicio persistente y se reinicie automáticamente si el servidor se reinicia o falla:

```bash
cd /var/www/cafeycodigo/backend

# Iniciar NestJS con PM2
pm2 start dist/main.js --name "cafeycodigo-backend"

# Configurar inicio automático al arrancar el servidor Debian
pm2 startup systemd
# (Ejecuta el comando 'sudo env PATH=...' que PM2 te imprima en pantalla si aplica)

# Guardar la lista de procesos activos
pm2 save
```

Verifica el estado del backend:
```bash
pm2 status
pm2 logs cafeycodigo-backend --lines 20
```

---

## 🎨 Paso 7: Compilar el Frontend (Astro)

Ahora compilamos el frontend estático de Astro dentro de `frontend/`:

```bash
cd /var/www/cafeycodigo/frontend

# Instalar dependencias del frontend
npm install

# Crear build optimizado para producción
npm run build
```

Esto generará la carpeta `/var/www/cafeycodigo/frontend/dist` con todos los archivos HTML, CSS, JavaScript y assets estáticos listos para ser servidos por Nginx.

---

## 🌐 Paso 8: Instalar y Configurar Nginx

Instalar Nginx:
```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Crear la configuración del VirtualHost:

Crea el archivo de configuración para el sitio:
```bash
sudo nano /etc/nginx/sites-available/cafeycodigo.conf
```

Pega la siguiente configuración completa optimizada:

```nginx
# 1. Redireccionar http://cafeycodigo.org y http://www.cafeycodigo.org a HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name cafeycodigo.org www.cafeycodigo.org;

    # Ruta para verificación de Let's Encrypt Certbot
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        return 301 https://www.cafeycodigo.org$request_uri;
    }
}

# 2. Servidor Principal (HTTPS)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.cafeycodigo.org;

    # NOTA: Certbot configurará los certificados automáticamente en el Paso 9.
    # Si vas a probar Nginx antes de certbot, comenta temporalmente las 2 líneas ssl_certificate abajo.
    # ssl_certificate /etc/letsencrypt/live/www.cafeycodigo.org/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/www.cafeycodigo.org/privkey.pem;

    # Parámetros de seguridad SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;

    # Compresión Gzip para máxima velocidad
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;

    # Límite de subida (para módulos y recursos de cursos en /app)
    client_max_body_size 25M;

    # Logs del servidor
    access_log /var/log/nginx/cafeycodigo_access.log;
    error_log /var/log/nginx/cafeycodigo_error.log;

    # -------------------------------------------------------------
    # A) REVERSE PROXY PARA LA API DE NESTJS (/api/*)
    # -------------------------------------------------------------
    location /api/ {
        proxy_pass http://127.0.0.1:3001/api/;
        proxy_http_version 1.1;
        
        # Headers para WebSockets y Pass-Through
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts para peticiones largas
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # -------------------------------------------------------------
    # B) FRONTEND ESTÁTICO DE ASTRO (frontend/dist/)
    # -------------------------------------------------------------
    root /var/www/cafeycodigo/frontend/dist;
    index index.html;

    # Caché persistente para assets inmutables (CSS, JS compilado, fuentes, imágenes)
    location ~* \.(?:css|js|woff2?|svg|png|jpg|jpeg|gif|ico|webp)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform, immutable";
        access_log off;
    }

    # Manejo de rutas y 404 de Astro
    location / {
        try_files $uri $uri/ $uri/index.html /404.html =404;
    }
}

# 3. Redirección de cafeycodigo.org (sin www) a https://www.cafeycodigo.org
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name cafeycodigo.org;

    # ssl_certificate /etc/letsencrypt/live/www.cafeycodigo.org/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/www.cafeycodigo.org/privkey.pem;

    return 301 https://www.cafeycodigo.org$request_uri;
}
```

### Activar el sitio y reiniciar Nginx:

```bash
# Desactivar el sitio por defecto de Nginx
sudo rm -f /etc/nginx/sites-enabled/default

# Habilitar el sitio de Café y Código mediante enlace simbólico
sudo ln -sf /etc/nginx/sites-available/cafeycodigo.conf /etc/nginx/sites-enabled/

# Verificar que la sintaxis de Nginx sea correcta
sudo nginx -t

# Recargar Nginx
sudo systemctl reload nginx
```

---

## 🔒 Paso 9: Certificados SSL Gratuitos (Certbot / Let's Encrypt)

Instalar Certbot para Nginx en Debian 13:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Generar y aplicar automáticamente los certificados SSL para ambos dominios:

```bash
sudo certbot --nginx -d cafeycodigo.org -d www.cafeycodigo.org
```

* Ingresa tu correo electrónico para avisos de renovación.
* Acepta los términos de servicio (`Y`).
* Certbot modificará automáticamente tu `/etc/nginx/sites-available/cafeycodigo.conf` para enlazar los certificados y configurará la renovación automática.

### Comprobar renovación automática de certificados:
```bash
sudo certbot renew --dry-run
```
*(Debian 13 incluye un temporizador systemd `certbot.timer` que renueva los certificados cada 60 días sin intervención humana).*

---

## 🛡️ Paso 10: Configurar el Firewall (UFW)

Protege tu servidor Debian 13 permitiendo solo los puertos estrictamente necesarios:

```bash
# Permitir SSH (¡Muy importante antes de activar UFW!)
sudo ufw allow OpenSSH

# Permitir tráfico web Nginx (HTTP 80 y HTTPS 443)
sudo ufw allow 'Nginx Full'

# Activar el firewall
sudo ufw enable
sudo ufw status
```

---

## 🔄 Paso 11: Script de Actualización Automática (Despliegues Futuros)

Crea un script en tu servidor para actualizar el proyecto cada vez que hagas cambios en tu código o git:

```bash
nano /var/www/cafeycodigo/deploy.sh
```

Pega el siguiente script:

```bash
#!/bin/bash
set -e

echo "🚀 Iniciando actualización de Café y Código..."
cd /var/www/cafeycodigo

echo "📥 Descargando últimos cambios de Git..."
git pull origin main

echo "📦 Actualizando Backend..."
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run build
pm2 reload cafeycodigo-backend

echo "🎨 Actualizando Frontend (Astro)..."
cd /var/www/cafeycodigo/frontend
npm install
npm run build

echo "✨ ¡Despliegue completado con éxito en https://www.cafeycodigo.org!"
```

Dale permisos de ejecución:
```bash
chmod +x /var/www/cafeycodigo/deploy.sh
```

Cada vez que quieras actualizar tu servidor a la última versión, solo ejecuta:
```bash
/var/www/cafeycodigo/deploy.sh
```

---

## 🔍 Comandos de Diagnóstico y Mantenimiento

| Tarea | Comando en el Servidor |
| :--- | :--- |
| **Ver logs del Backend en vivo** | `pm2 logs cafeycodigo-backend` |
| **Reiniciar Backend manualmente** | `pm2 restart cafeycodigo-backend` |
| **Ver estado de Nginx** | `sudo systemctl status nginx` |
| **Ver errores de Nginx** | `sudo tail -f /var/log/nginx/cafeycodigo_error.log` |
| **Probar configuración de Nginx** | `sudo nginx -t` |
| **Ver estado de PostgreSQL** | `sudo systemctl status postgresql` |
| **Inspeccionar base con Prisma Studio** | `cd /var/www/cafeycodigo/backend && npx prisma studio --port 5555` |

