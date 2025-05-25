<div align="center">
  
  ![image](https://github.com/user-attachments/assets/b48c018c-695e-407a-8057-5604d43deb33)

  
  # ClickMail Backend 🚀
  
  ### *API REST Robusta para Email Marketing con IA*

  [![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
  [![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

  [🌐 **Frontend**](https://github.com/joseorteha/ClickMail/tree/development) • [📚 **Documentación API**](#-documentación-de-la-api) • [🐛 **Reportar Bug**](https://github.com/joseorteha/ClickMail/issues) • [💡 **Solicitar Feature**](https://github.com/joseorteha/ClickMail/issues)

  ---

  Backend potente y escalable para **ClickMail**, proporcionando APIs seguras para autenticación, gestión de campañas y generación de contenido con inteligencia artificial.

</div>

## 📑 Tabla de Contenidos

- [✨ Características](#-características)
- [🏗️ Arquitectura](#️-arquitectura)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [💻 Instalación](#-instalación)
- [🔧 Configuración](#-configuración)
- [📚 Documentación de la API](#-documentación-de-la-api)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🗄️ Base de Datos](#️-base-de-datos)
- [🔐 Seguridad](#-seguridad)
- [🌐 Despliegue](#-despliegue)
- [🧪 Testing](#-testing)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

## ✨ Características

<div align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <h3>🔐 Autenticación JWT</h3>
        <p>Sistema seguro de autenticación con tokens JWT, hash de contraseñas y middleware de protección</p>
      </td>
      <td align="center" width="33%">
        <h3>🤖 Integración OpenAI</h3>
        <p>Generación inteligente de contenido de email usando GPT-4 con prompts optimizados</p>
      </td>
      <td align="center" width="33%">
        <h3>📊 API REST Completa</h3>
        <p>Endpoints RESTful bien estructurados con validación, paginación y manejo de errores</p>
      </td>
    </tr>
    <tr>
      <td align="center">
        <h3>🗄️ MongoDB Atlas</h3>
        <p>Base de datos NoSQL escalable con esquemas Mongoose y agregaciones optimizadas</p>
      </td>
      <td align="center">
        <h3>⚡ Performance</h3>
        <p>Middleware optimizado, caché en memoria y consultas eficientes para máximo rendimiento</p>
      </td>
      <td align="center">
        <h3>🔒 Seguridad Avanzada</h3>
        <p>Validación de datos, rate limiting, CORS configurado y sanitización de entradas</p>
      </td>
    </tr>
  </table>
</div>

### 🎯 Funcionalidades Principales

- **👤 Gestión de Usuarios**: Registro, login, perfiles y autenticación
- **📧 Campañas de Email**: CRUD completo para campañas de marketing
- **🤖 IA Generativa**: Creación automática de contenido personalizado
- **📈 Analytics**: Métricas y estadísticas de campañas
- **🔔 Notificaciones**: Sistema de alertas y notificaciones push
- **📄 Gestión de Archivos**: Upload y procesamiento de imágenes/documentos
- **🌐 APIs Externas**: Integración con servicios de terceros

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │────│   Backend API   │────│   MongoDB       │
│   (React)       │    │   (Node.js)     │    │   (Atlas)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              │
                    ┌─────────────────┐
                    │   OpenAI API    │
                    │   (GPT-4)       │
                    └─────────────────┘
```

### Patrones de Diseño
- **MVC (Model-View-Controller)**: Separación clara de responsabilidades
- **Middleware Pattern**: Para autenticación, validación y logging
- **Repository Pattern**: Abstracción de acceso a datos
- **Factory Pattern**: Para creación de objetos complejos

## 🚀 Inicio Rápido

### Opción 1: Docker (Recomendado)
```bash
# Clona el repositorio
git clone -b backend-node https://github.com/joseorteha/ClickMail.git
cd ClickMail

# Ejecuta con Docker
docker-compose up -d
```

### Opción 2: Instalación Local
```bash
# Clona e instala
git clone -b backend-node https://github.com/joseorteha/ClickMail.git
cd ClickMail
npm install

# Configura variables de entorno
cp .env.sample .env
# Edita .env con tus credenciales

# Inicia el servidor
npm run dev
```

## 💻 Instalación

### Prerrequisitos
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 o **yarn** >= 1.22.0
- **MongoDB Atlas** cuenta (o MongoDB local)
- **OpenAI API Key**
- **Git**

### Pasos Detallados

1. **Clona el repositorio**
   ```bash
   git clone -b backend-node https://github.com/joseorteha/ClickMail.git
   cd ClickMail
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura la base de datos**
   - Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Crea un nuevo cluster
   - Obtén la URL de conexión

4. **Obtén API Keys necesarias**
   - [OpenAI API Key](https://platform.openai.com/api-keys)
   - Configuraciones de email (si usas servicios externos)

5. **Configura variables de entorno**
   ```bash
   cp .env.sample .env
   ```

6. **Inicia el servidor**
   ```bash
   # Desarrollo
   npm run dev
   
   # Producción
   npm start
   ```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` basándote en `.env.sample`:

```env
# 🗄️ Base de Datos
MONGODB_URI=mongodb+srv://username:password@example.example.net/
MONGODB_TEST_URI=mongodb+srv://username:password@example.example.net

# 🔐 Autenticación
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

# 🤖 OpenAI
OPENAI_API_KEY=sk-tu_clave_openai_aqui
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=2000

# 🌐 Servidor
PORT=3000
NODE_ENV=development
API_VERSION=v1

# 📧 Email (Opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password

# 🔒 Seguridad
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# 📊 Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

### Configuración por Entorno

| Variable | Desarrollo | Producción | Descripción |
|----------|------------|------------|-------------|
| `NODE_ENV` | `development` | `production` | Entorno de ejecución |
| `LOG_LEVEL` | `debug` | `error` | Nivel de logging |
| `CORS_ORIGIN` | `http://localhost:5173` | `https://tu-dominio.com` | Origen permitido para CORS |

## 📚 Documentación de la API

### Base URL
```
Desarrollo: http://localhost:3000/api/v1
Producción: https://api.clickmail.com/v1
```

### 🔐 Autenticación

#### Registro de Usuario
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "company": "Mi Empresa"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f1b2c3d4e5f6789a0b1c2d",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "company": "Mi Empresa",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Inicio de Sesión
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
```

#### Perfil de Usuario
```http
GET /api/v1/auth/me
Authorization: Bearer {token}
```

### 📧 Campañas

#### Crear Campaña
```http
POST /api/v1/campaigns
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Campaña de Primavera",
  "description": "Promoción de productos de primavera",
  "targetAudience": "Mujeres 25-40 años interesadas en moda",
  "product": {
    "name": "Vestidos de Primavera",
    "category": "Moda",
    "price": 49.99
  }
}
```

#### Listar Campañas
```http
GET /api/v1/campaigns?page=1&limit=10&status=active
Authorization: Bearer {token}
```

#### Actualizar Campaña
```http
PUT /api/v1/campaigns/{campaignId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Nuevo nombre de campaña",
  "status": "paused"
}
```

#### Eliminar Campaña
```http
DELETE /api/v1/campaigns/{campaignId}
Authorization: Bearer {token}
```

### 🤖 Generación de Email con IA

```http
POST /api/v1/campaigns/{campaignId}/generate-email
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "promotional",
  "tone": "friendly",
  "length": "medium",
  "includeDiscount": true,
  "customInstructions": "Incluir llamada a la acción fuerte"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "subject": "🌸 ¡Nueva Colección de Primavera Ya Disponible!",
    "content": "Estimada cliente,\n\nNos emociona presentarte nuestra nueva colección...",
    "previewText": "Descubre los vestidos más elegantes de la temporada",
    "estimatedReadTime": "2 minutos",
    "aiMetrics": {
      "sentimentScore": 0.8,
      "engagementPrediction": "high"
    }
  }
}
```

### 📊 Analytics

#### Estadísticas de Campaña
```http
GET /api/v1/campaigns/{campaignId}/analytics
Authorization: Bearer {token}
```

#### Dashboard General
```http
GET /api/v1/analytics/dashboard
Authorization: Bearer {token}
```

### 🔒 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | ✅ Operación exitosa |
| `201` | ✅ Recurso creado |
| `400` | ❌ Petición inválida |
| `401` | ❌ No autenticado |
| `403` | ❌ No autorizado |
| `404` | ❌ Recurso no encontrado |
| `422` | ❌ Error de validación |
| `429` | ❌ Demasiadas peticiones |
| `500` | ❌ Error interno del servidor |

## 🛠️ Stack Tecnológico

### Core Backend
- **🟢 Node.js 18+** - Runtime de JavaScript
- **⚡ Express.js 4.18** - Framework web minimalista
- **📘 TypeScript 5.0** - Tipado estático
- **🗄️ MongoDB 6.0** - Base de datos NoSQL
- **🍃 Mongoose 7.0** - ODM para MongoDB

### Autenticación y Seguridad
- **🔐 JSON Web Token (JWT)** - Autenticación stateless
- **🔒 bcryptjs** - Hash de contraseñas
- **🛡️ Helmet** - Headers de seguridad
- **🚫 express-rate-limit** - Rate limiting
- **🔍 express-validator** - Validación de datos

### Integración IA
- **🤖 OpenAI API** - GPT-4 para generación de contenido
- **📝 Prompt Engineering** - Optimización de prompts

### Utilidades y Middleware
- **📊 Morgan** - HTTP request logger
- **🔄 CORS** - Cross-Origin Resource Sharing
- **📄 Multer** - Upload de archivos
- **⏰ node-cron** - Tareas programadas
- **📧 Nodemailer** - Envío de emails

### Desarrollo y Test
- **🔧 Nodemon** - Auto-restart en desarrollo
- **🧪 Jest** - Framework de testing
- **📊 Supertest** - Testing de APIs HTTP
- **📈 ESLint** - Linting de código
- **🎯 Prettier** - Formateo de código

## 🗄️ Base de Datos

### Esquema de Datos

#### Usuario
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  company: String,
  role: String (default: 'user'),
  isEmailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  settings: {
    theme: String,
    notifications: Boolean,
    language: String
  }
}
```

#### Campaña
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  description: String,
  status: String (enum: ['draft', 'active', 'paused', 'completed']),
  targetAudience: String,
  product: {
    name: String,
    category: String,
    price: Number,
    description: String
  },
  emails: [{
    subject: String,
    content: String,
    previewText: String,
    generatedAt: Date,
    aiMetrics: {
      sentimentScore: Number,
      engagementPrediction: String
    }
  }],
  analytics: {
    sent: Number,
    opened: Number,
    clicked: Number,
    converted: Number,
    revenue: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Índices de Rendimiento
```javascript
// Usuarios
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "createdAt": -1 })

// Campañas
db.campaigns.createIndex({ "userId": 1, "status": 1 })
db.campaigns.createIndex({ "createdAt": -1 })
db.campaigns.createIndex({ "product.category": 1 })
```

## 🔐 Seguridad

### Medidas Implementadas

| Medida | Descripción | Estado |
|--------|-------------|--------|
| **🔐 JWT Authentication** | Tokens seguros con expiración | ✅ |
| **🔒 Password Hashing** | bcrypt con 12 rounds | ✅ |
| **🛡️ Input Validation** | express-validator en todos los endpoints | ✅ |
| **🚫 Rate Limiting** | 100 requests por 15 min por IP | ✅ |
| **🔍 Data Sanitization** | Limpieza de datos de entrada | ✅ |
| **🌐 CORS Configuration** | Origen específico configurado | ✅ |
| **📄 Security Headers** | Helmet middleware | ✅ |
| **🔒 HTTPS Only** | Forzar HTTPS en producción | ✅ |

### Mejores Prácticas
- Variables de entorno para datos sensibles
- Logs de seguridad detallados
- Validación estricta de tipos
- Sanitización de consultas MongoDB
- Headers de seguridad configurados

## 🌐 Despliegue

### Railway (Recomendado)
```bash
# Conecta tu repositorio a Railway
# Las variables de entorno se configuran en el dashboard
# Deploy automático desde la rama backend-node
```

### Heroku
```bash
# Instala Heroku CLI
npm install -g heroku

# Login y crea app
heroku login
heroku create clickmail-backend

# Configura variables de entorno
heroku config:set MONGODB_URI=tu_mongodb_uri
heroku config:set JWT_SECRET=tu_jwt_secret
heroku config:set OPENAI_API_KEY=tu_openai_key

# Deploy
git push heroku backend-node:main
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Variables de Entorno en Producción
```bash
# Configurar en el proveedor de hosting
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=super_secret_key
OPENAI_API_KEY=sk-...
PORT=3000
```

## 🧪 Testing

### Ejecutar Tests
```bash
# Todos los tests
npm test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch

# Tests específicos
npm test -- --grep "auth"
```

### Estructura de Tests
```
tests/
├── 🔐 auth/
│   ├── register.test.js
│   ├── login.test.js
│   └── middleware.test.js
├── 📧 campaigns/
│   ├── crud.test.js
│   └── generation.test.js
├── 🛠️ utils/
│   └── helpers.test.js
└── 🧪 fixtures/
    └── testData.js
```

### Coverage Objetivo
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 85%
- **Lines**: > 80%

## 🤝 Contribuir

### Proceso de Desarrollo

1. **Fork** el repositorio
2. **Crea** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Desarrolla** siguiendo las convenciones
4. **Tests** - Añade tests para tu código
5. **Commit** con mensajes descriptivos
6. **Push** y crea un Pull Request

### Convenciones de Código

```javascript
// ✅ Buenas prácticas
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return user;
  } catch (error) {
    logger.error('Error al obtener usuario:', error);
    throw error;
  }
};

// ❌ Evitar
function getUser(id) {
  return User.findById(id);
}
```

### Checklist para PRs
- [ ] Código sigue las convenciones del proyecto
- [ ] Tests añadidos/actualizados
- [ ] Documentación actualizada
- [ ] No hay console.logs olvidados
- [ ] Variables de entorno documentadas
- [ ] Manejo de errores implementado

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. Ver [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**⭐ ¿Te parece útil?** ¡Dale una estrella al repositorio!

**🤝 ¿Quieres contribuir?** Lee nuestra [guía de contribución](#-contribuir)

**🚀 ¿Listo para usar la API?** Consulta la [documentación completa](#-documentación-de-la-api)

---

*Desarrollado con ❤️ por el equipo backend de ClickMail*

[⬆️ Volver al inicio](#clickmail-backend-)

</div>
