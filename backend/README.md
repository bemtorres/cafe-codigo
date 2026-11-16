# ☕ Café y Código — Backend (NestJS + PostgreSQL)

Backend robusto, modular y tipado para la plataforma **Café y Código**, diseñado para sincronizarse con la nueva versión de cursos interactivos (`/app`), autenticación de estudiantes, gamificación y sistema de correos transaccionales vía SMTP.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** [NestJS 11](https://nestjs.com/) (Node.js + TypeScript).
- **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) con [Prisma ORM](https://www.prisma.io/).
- **Autenticación:**
  - Login / Registro tradicional (Email + Password cifrado con `bcrypt`).
  - **Google OAuth 2.0 & Google One Tap** (`passport-google-oauth20` y `google-auth-library`).
  - Tokens seguros **JWT** (`passport-jwt`).
- **Sistema de Correos (SMTP):**
  - Envío transaccional mediante `nodemailer` usando tus credenciales SMTP.
  - Correos de bienvenida, verificación de email y recuperación de contraseña en diseño *Neobrutalista*.
- **Documentación:** Swagger / OpenAPI interactivo en `/api/docs`.

---

## 🚀 Puesta en Marcha

### 1. Instalar dependencias
Dentro de la carpeta `backend`:
```bash
npm install
```

### 2. Configurar Variables de Entorno
Copia el archivo `.env.example` a `.env` (si aún no existe) y define tus valores:
```env
PORT=3001
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/cafeycodigo?schema=public"

JWT_SECRET="clave-secreta-jwt"
JWT_EXPIRES_IN="7d"

GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3001/api/auth/google/callback"

FRONTEND_URL="http://localhost:4321"

# Servidor de Correo SMTP
SMTP_HOST="smtp.tuservidor.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER="tu-usuario-smtp@tudominio.com"
SMTP_PASS="tu-contraseña-smtp"
SMTP_FROM="\"Café y Código\" <no-reply@cafeycodigo.org>"
```

### 3. Generar el Cliente de Prisma y Sincronizar PostgreSQL
```bash
# Genera los tipos de Prisma
npm run prisma:generate

# Sincroniza el esquema con tu base de datos PostgreSQL
npm run prisma:push
```

*(Opcional) Si quieres abrir la interfaz gráfica de administración de la base de datos:*
```bash
npm run prisma:studio
```

### 4. Iniciar el Servidor de Desarrollo
```bash
npm run start:dev
```

El servidor estará escuchando en:
- **API Base:** `http://localhost:3001/api`
- **Swagger Docs:** `http://localhost:3001/api/docs`

---

## 📚 Módulos y Endpoints Principales

### 🔐 Autenticación (`/api/auth`)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registro de estudiante con Email, Nombre y Password. |
| `POST` | `/api/auth/login` | Login tradicional retornando JWT. |
| `POST` | `/api/auth/google/token` | Login directo con el token de Google One Tap del frontend. |
| `GET` | `/api/auth/google` | Redirección al consentimiento de Google OAuth2. |
| `GET` | `/api/auth/google/callback` | Callback de Google que redirige al frontend con el token. |
| `GET` | `/api/auth/me` | Retorna los datos del usuario logueado (protegido con Bearer Token). |
| `POST` | `/api/auth/forgot-password` | Envía email con enlace de recuperación vía SMTP. |
| `POST` | `/api/auth/reset-password` | Restablece contraseña con el token recibido. |
| `GET` | `/api/auth/verify-email` | Confirma el email del usuario. |

### 📖 Cursos y Contenidos `/app` (`/api/courses`)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/courses` | Guarda/actualiza el documento completo JSON del curso con módulos y widgets. |
| `GET` | `/api/courses` | Lista el catálogo de cursos disponibles. |
| `GET` | `/api/courses/:courseId` | Obtiene el documento completo del curso para el aula o creador. |
| `PATCH` | `/api/courses/:courseId/status` | Cambia el estado (DRAFT, PUBLISHED, ARCHIVED). |
| `GET` | `/api/courses/:courseId/revisions` | Historial de versiones y cambios del curso. |

### 🏆 Progreso y Gamificación (`/api/progress`)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/progress/:courseId` | Consulta el avance del usuario en el curso. |
| `POST` | `/api/progress/:courseId/complete` | Marca un contenido como completado y otorga CoffeeCoins / Puntos. |
| `POST` | `/api/progress/:courseId/quiz` | Registra intentos de cuestionarios/desafíos y actualiza nivel. |
| `GET` | `/api/progress/leaderboard` | Tabla de clasificación general de estudiantes. |

