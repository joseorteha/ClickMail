# ClickMail - Rama Backend

## ¿Qué es ClickMail?

ClickMail es una aplicación web para crear campañas de email marketing de forma rápida y sencilla usando inteligencia artificial (IA). Este proyecto está en sus primeras etapas, y en esta rama nos enfocamos en el backend, que incluye un API para conectar las vistas del frontend y generar contenido con IA.

## Vistas del Frontend (HTML)

Hemos creado 5 vistas HTML simples que muestran cómo funcionará ClickMail. Cada una representa un paso para crear una campaña de email:

1. **`step-0.html` (Inicio)**  
   - Muestra un mensaje de bienvenida y un botón para empezar.  
   - Tiene un ícono de sobre y un botón azul ("Empezar").  
   - Llama al endpoint `/start` para iniciar el proceso.

2. **`step-1.html` (Describir Producto/Servicio)**  
   - Pide al usuario que describa su producto o servicio en un cuadro de texto.  
   - Incluye un ícono de documento y botones para "Regresar" o "Continuar".  
   - Envía la descripción al endpoint `/describe`.

3. **`step-2.html` (Definir Audiencia y Objetivo)**  
   - Permite elegir la audiencia (por ejemplo, "Clientes actuales") y el objetivo (por ejemplo, "Promoción de producto").  
   - Tiene un ícono de diana y dos menús desplegables.  
   - Envía los datos al endpoint `/define`.

4. **`step-3.html` (Generar y Editar)**  
   - Muestra el email generado por la IA y tiene botones para editar, copiar, descargar o enviar (algunos botones aún no funcionan).  
   - Incluye un ícono de video y un área para previsualizar el email.  
   - Llama al endpoint `/generate` para obtener el contenido.

5. **`step-error.html` (Error)**  
   - Muestra un mensaje de error si algo sale mal, con un botón para intentar de nuevo.  
   - Tiene un borde rojo para resaltar el error.  
   - Llama al endpoint `/error` para obtener el mensaje de error.

Estas vistas tienen un diseño limpio con fondo blanco, botones azules (#4B91F1) y texto gris oscuro (#333333), inspirado en un diseño de Figma.

## Backend (API)

El backend está hecho con **FastAPI**, un framework de Python para crear APIs. Por ahora, guarda los datos en memoria (más adelante usaremos una base de datos). También simula una integración con IA para generar el contenido del email.

Los endpoints del API son:

- **`/start` (POST)**: Inicia el proceso y limpia los datos.
- **`/describe` (POST)**: Guarda la descripción del producto o servicio.
- **`/define` (POST)**: Guarda la audiencia y el objetivo.
- **`/generate` (POST)**: Genera el email usando IA (por ahora simulado).
- **`/error` (POST)**: Muestra un mensaje de error.

El código está en el archivo `main.py`.

## Estructura del Proyecto en Python

Proponemos esta estructura simple para organizar el proyecto y facilitar su crecimiento:

```
clickmail-backend/
│
├── src/
│   ├── main.py             # Archivo principal del API (FastAPI)
│   ├── endpoints.py        # Define los endpoints del API
│   ├── models.py           # Modelos para guardar datos (futuro: base de datos)
│   └── ai_service.py       # Conexión con el servicio de IA
│
├── static/
│   ├── step-0.html         # Vistas HTML
│   ├── step-1.html
│   ├── step-2.html
│   ├── step-3.html
│   └── step-error.html
│
├── requirements.txt        # Dependencias de Python
└── README.md               # Este archivo
```

### Explicación de la Estructura

- **`src/`**: Código del backend.
  - `main.py`: Inicia el API con FastAPI.
  - `endpoints.py`: Tiene los endpoints (`/start`, `/describe`, etc.).
  - `models.py`: Define cómo se guardan los datos (por ahora en memoria).
  - `ai_service.py`: Maneja la conexión con la IA (por ahora simulada).
- **`static/`**: Archivos HTML (en el futuro, esto podría estar en otro repositorio).
- **`requirements.txt`**: Lista de paquetes necesarios (como `fastapi`, `uvicorn`, `httpx`).

## Cómo Probar el Proyecto

### Requisitos
- Python 3.9 o superior
- Instalar dependencias: `pip install fastapi uvicorn httpx`

### Pasos
1. Clona el repositorio:
   ```
   git clone <url-del-repositorio>
   cd clickmail-backend
   ```
2. Instala las dependencias:
   ```
   pip install -r requirements.txt
   ```
3. Inicia el API:
   ```
   python src/main.py
   ```
   El API estará en `http://localhost:8000`.

4. Sirve los archivos HTML:
   ```
   cd static
   python -m http.server 8080
   ```
   Abre `http://localhost:8080/step-0.html` en tu navegador.

## Próximos Pasos

- Agregar una base de datos para guardar los datos (por ejemplo, SQLite o PostgreSQL).
- Conectar con un servicio real de IA (como xAI API en https://x.ai/api).
- Mejorar las vistas HTML (quizás usando un framework como React).
- Agregar pruebas para el API.