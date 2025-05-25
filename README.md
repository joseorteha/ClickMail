<div align="center">
  <img src="./public/logo1.svg" alt="ClickMail Logo" width="200" />
  
  # ClickMail 📧
  
  ### *Revoluciona tu Email Marketing con Inteligencia Artificial*

  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://click-mail.netlify.app/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

  [🚀 **Demo en Vivo**](https://click-mail.netlify.app) • [📖 **Documentación**](#-tabla-de-contenidos) • [🐛 **Reportar Bug**](https://github.com/joseorteha/ClickMail/issues) • [💡 **Solicitar Feature**](https://github.com/joseorteha/ClickMail/issues)

  ---

  **ClickMail** es la plataforma de email marketing del futuro. Utiliza inteligencia artificial avanzada para crear campañas de correo electrónico profesionales, personalizadas y altamente efectivas en minutos, no en horas.

  *¿Por qué conformarse con emails genéricos cuando puedes crear campañas que realmente conecten con tu audiencia?*

</div>

## 📑 Tabla de Contenidos

- [✨ Características Principales](#-características-principales)
- [🎯 ¿Por Qué ClickMail?](#-por-qué-clickmail)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [💻 Instalación para Desarrollo](#-instalación-para-desarrollo)
- [🔧 Configuración](#-configuración)
- [📱 Uso de la Aplicación](#-uso-de-la-aplicación)
- [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🌐 Despliegue](#-despliegue)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)
- [🆘 Soporte](#-soporte)

## ✨ Características Principales

<div align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <h3>🤖 IA Avanzada</h3>
        <p>Genera contenido de email personalizado usando OpenAI GPT-4, adaptado a tu audiencia y objetivos específicos</p>
      </td>
      <td align="center" width="33%">
        <h3>📊 Analytics Completo</h3>
        <p>Dashboard intuitivo con métricas en tiempo real, tasas de apertura, clics y conversiones</p>
      </td>
      <td align="center" width="33%">
        <h3>⚡ Flujo Optimizado</h3>
        <p>Crea campañas profesionales en 3 simples pasos: describe, genera y envía</p>
      </td>
    </tr>
    <tr>
      <td align="center">
        <h3>🔐 Seguridad Avanzada</h3>
        <p>Autenticación JWT robusta con encriptación de extremo a extremo</p>
      </td>
      <td align="center">
        <h3>📱 Diseño Responsivo</h3>
        <p>Interfaz adaptable con modo claro/oscuro, optimizada para todos los dispositivos</p>
      </td>
      <td align="center">
        <h3>🎨 Templates Pro</h3>
        <p>Biblioteca extensiva de plantillas profesionales y personalizables</p>
      </td>
    </tr>
  </table>
</div>

### 🎯 Características Detalladas

- **🎨 Editor Visual Avanzado**: Interfaz drag-and-drop para personalizar tus emails
- **📈 Análisis Predictivo**: IA que predice el rendimiento de tus campañas
- **🔄 Automatización Inteligente**: Secuencias de email automáticas basadas en comportamiento
- **👥 Segmentación Avanzada**: Divide tu audiencia automáticamente usando IA
- **📋 A/B Testing**: Optimiza tus campañas con pruebas automáticas
- **🌍 Localización**: Soporte para múltiples idiomas y zonas horarias
- **📊 Reporting Avanzado**: Exporta informes detallados en PDF/Excel
- **🔗 Integraciones**: Conecta con CRM, e-commerce y herramientas populares

## 🎯 ¿Por Qué ClickMail?

| Problema Tradicional | Solución ClickMail |
|---------------------|-------------------|
| ⏰ Horas creando contenido | ⚡ Contenido generado en segundos |
| 📝 Emails genéricos | 🎯 Mensajes personalizados por IA |
| 📊 Métricas básicas | 📈 Analytics predictivo avanzado |
| 🔧 Configuración compleja | 🚀 Setup en 3 pasos |
| 💰 Costos elevados | 💡 Precio justo y transparente |

## 🚀 Inicio Rápido

### Opción 1: Usar la Demo
```bash
# Visita nuestra demo en línea
https://click-mail.netlify.app
```

### Opción 2: Docker (Recomendado)
```bash
# Clona y ejecuta con Docker
git clone https://github.com/joseorteha/ClickMail.git
cd ClickMail
docker-compose up -d
```

### Opción 3: Desarrollo Local
Sigue las instrucciones detalladas en [Instalación para Desarrollo](#-instalación-para-desarrollo).

## 💻 Instalación para Desarrollo

### Prerrequisitos
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 o **yarn** >= 1.22.0
- **Git**

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/joseorteha/ClickMail.git
   cd ClickMail
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Edita el archivo `.env` con tus credenciales:
   ```env
   VITE_OPENAI_KEY=sk-tu_clave_openai_aqui
   VITE_API_URL=http://localhost:3000/api
   VITE_ENVIRONMENT=development
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **¡Listo!** 🎉
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Requerida | Ejemplo |
|----------|-------------|-----------|---------|
| `VITE_OPENAI_KEY` | API Key de OpenAI | ✅ | `sk-...` |
| `VITE_API_URL` | URL del backend | ✅ | `https://api.clickmail.com` |
| `VITE_ENVIRONMENT` | Entorno de ejecución | ❌ | `development/production` |
| `VITE_ANALYTICS_ID` | Google Analytics ID | ❌ | `GA_MEASUREMENT_ID` |

### Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter ESLint
npm run type-check   # Verificación de tipos TypeScript
npm test             # Ejecutar tests
npm run test:coverage # Tests con cobertura
```

## 📱 Uso de la Aplicación

### 1. **Registro y Autenticación**
```
📧 Crea tu cuenta → ✉️ Verifica email → 🔐 Configura perfil
```

### 2. **Crear Primera Campaña**
```
📝 Describe tu producto → 🤖 IA genera contenido → 👀 Preview → 🚀 Enviar
```

### 3. **Gestión de Campañas**
- **Dashboard**: Vista general de todas tus campañas
- **Editor**: Personaliza templates y contenido
- **Analytics**: Métricas detalladas de rendimiento
- **Audiencia**: Gestiona y segmenta tus contactos

### 4. **Funciones Avanzadas**
- **Automatización**: Configura secuencias de email
- **A/B Testing**: Optimiza subject lines y contenido
- **Integraciones**: Conecta con tus herramientas favoritas

## 🏗️ Arquitectura del Proyecto

```
ClickMail/
├── 📁 public/                 # Archivos estáticos
│   ├── 🖼️ logo1.svg
│   └── 📄 favicon.ico
├── 📁 src/
│   ├── 📁 components/         # Componentes React
│   │   ├── 📁 campaign/       # 🎯 Gestión de campañas
│   │   ├── 📁 common/         # 🔄 Componentes reutilizables
│   │   ├── 📁 dashboard/      # 📊 Visualización de datos
│   │   └── 📁 ui/             # 🎨 Componentes de interfaz
│   ├── 📁 context/           # ⚡ Estado global
│   │   ├── 🔐 AuthContext.tsx
│   │   ├── 🎨 ThemeContext.tsx
│   │   └── 🔔 ToastContext.tsx
│   ├── 📁 hooks/             # 🪝 Custom hooks
│   ├── 📁 pages/             # 📄 Páginas principales
│   │   ├── 📁 auth/          # 🔐 Autenticación
│   │   ├── 📁 campaign/      # 📧 Campañas
│   │   ├── 📁 dashboard/     # 📊 Panel principal
│   │   └── 📁 settings/      # ⚙️ Configuración
│   ├── 📁 services/          # 🌐 APIs y servicios
│   │   ├── 🤖 openai.ts
│   │   └── 📡 api.ts
│   ├── 📁 types/             # 📝 Definiciones TypeScript
│   ├── 📁 utils/             # 🛠️ Utilidades
│   └── 📁 styles/            # 🎨 Estilos globales
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
└── 📄 tailwind.config.js
```

## 🛠️ Stack Tecnológico

### Frontend Core
- **⚛️ React 18** - Biblioteca de interfaces de usuario
- **📘 TypeScript 5** - Tipado estático y mejor DX
- **⚡ Vite 5** - Build tool ultrarrápido
- **🎨 Tailwind CSS 3** - Framework CSS utility-first

### Estado y Navegación
- **🗂️ Context API** - Gestión de estado global
- **🛣️ React Router 6** - Enrutamiento SPA
- **🪝 Custom Hooks** - Lógica reutilizable

### APIs y Servicios
- **🤖 OpenAI GPT-4** - Generación de contenido IA
- **🔐 JWT** - Autenticación segura
- **📡 Fetch API** - Comunicación HTTP

### Desarrollo y Build
- **📋 ESLint** - Linting de código
- **🎯 Prettier** - Formateo automático
- **🧪 Vitest** - Testing framework
- **📦 Netlify** - Despliegue automático

## 🌐 Despliegue

### Netlify (Automático)

El proyecto se despliega automáticamente en Netlify desde la rama `development`:

1. **Configuración automática** via `netlify.toml`
2. **Variables de entorno** configuradas en panel de Netlify
3. **Deploy preview** para cada PR
4. **SSL automático** y CDN global

### Manual (Otros Proveedores)

```bash
# Build para producción
npm run build

# Los archivos se generan en /dist
# Sube el contenido de /dist a tu proveedor
```

### Docker

```dockerfile
# Dockerfile incluido para containerización
docker build -t clickmail-frontend .
docker run -p 80:80 clickmail-frontend
```

## 🤝 Contribuir

¡Las contribuciones son muy bienvenidas! 🎉

### Proceso de Contribución

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. **Commit** tus cambios (`git commit -m 'Add amazing feature'`)
4. **Push** a la rama (`git push origin feature/amazing-feature`)
5. **Abre** un Pull Request

### Convenciones

- **Commits**: Usa [Conventional Commits](https://conventionalcommits.org/)
- **Código**: Sigue las reglas de ESLint y Prettier
- **Tests**: Añade tests para nuevas funcionalidades
- **Documentación**: Actualiza README si es necesario

### Areas de Contribución

| Área | Descripción | Dificultad |
|------|-------------|------------|
| 🐛 Bug Fixes | Corregir errores existentes | 🟢 Fácil |
| ✨ Features | Nuevas funcionalidades | 🟡 Medio |
| 📚 Docs | Mejorar documentación | 🟢 Fácil |
| 🎨 UI/UX | Mejoras de diseño | 🟡 Medio |
| ⚡ Performance | Optimizaciones | 🔴 Difícil |
| 🧪 Testing | Añadir tests | 🟡 Medio |

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. Ver [LICENSE](LICENSE) para más detalles.

```
MIT License - Puedes usarlo, modificarlo y distribuirlo libremente.
```

## 🆘 Soporte

### 📞 Contacto

- **🐛 Bug Reports**: [GitHub Issues](https://github.com/joseorteha/ClickMail/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/joseorteha/ClickMail/discussions)
- **📧 Email**: [soporte@clickmail.com](mailto:soporte@clickmail.com)
- **💬 Discord**: [Únete a nuestra comunidad](https://discord.gg/clickmail)

### 📚 Recursos

- [📖 Documentación Completa](https://docs.clickmail.com)
- [🎥 Video Tutoriales](https://youtube.com/clickmail)
- [📝 Blog](https://blog.clickmail.com)
- [❓ FAQ](https://help.clickmail.com)

### 🏷️ Status del Proyecto

![GitHub last commit](https://img.shields.io/github/last-commit/joseorteha/ClickMail)
![GitHub issues](https://img.shields.io/github/issues/joseorteha/ClickMail)
![GitHub pull requests](https://img.shields.io/github/issues-pr/joseorteha/ClickMail)
![GitHub stars](https://img.shields.io/github/stars/joseorteha/ClickMail)

---

<div align="center">

**¿Te gusta ClickMail?** ⭐ ¡Dale una estrella en GitHub!

**¿Quieres contribuir?** 🤝 ¡Lee nuestra [guía de contribución](#-contribuir)!

**¿Necesitas ayuda?** 💬 ¡Únete a nuestra [comunidad](#-soporte)!

---

*Hecho con ❤️ por el equipo de ClickMail*

[⬆️ Volver al inicio](#clickmail-)

</div>