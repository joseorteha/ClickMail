# ClickMail Backend (Node.js)

Backend para la aplicación ClickMail desarrollado con Node.js, Express y MongoDB.

## Requisitos

- Node.js 14.x o superior
- MongoDB Atlas (o MongoDB local)
- Cuenta de OpenAI para la generación de emails

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto basándote en `.env.sample`
2. Asegúrate de tener una cuenta en MongoDB Atlas y actualiza la URL de conexión en el archivo `.env`
3. Configura tu API key de OpenAI

## Instalación

```bash
npm install
```

## Ejecución

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

## API Endpoints

### Autenticación

- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/me` - Perfil del usuario (requiere autenticación)

### Campañas

- `POST /api/campaigns` - Crear campaña (requiere autenticación)
- `GET /api/campaigns` - Listar campañas (requiere autenticación)
- `PUT /api/campaigns/:campaignId` - Actualizar campaña (requiere autenticación)
- `DELETE /api/campaigns/:campaignId` - Eliminar campaña (requiere autenticación)
- `POST /api/campaigns/:campaignId/generate-email` - Generar email (requiere autenticación)
