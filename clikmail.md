**Especificación de Requisitos del Software (ERS)**

**ClickMail**

Autor: Equipo de Desarrollo Fecha: 20 de mayo de 2025

1  **Introducción**
1. **Propósito del documento**

Este documento define los requisitos funcionales y no funcionales del sistema **ClickMail**, una herramienta SaaS que utiliza inteligencia artificial (IA) para generar campañas de email marketing personalizadas. Su objetivo es proporcionar una guía clara para el equi- po de desarrollo, diseñadores y *stakeholders*, asegurando que el sistema cumpla con las expectativas de funcionalidad, usabilidad y rendimiento.

2. **Alcance del sistema**

ClickMail es una plataforma web que permite a emprendedores y pequeñas empresas crear campañas de email marketing de manera sencilla, utilizando IA (GPT-3) para generar correos electrónicos personalizados basados en información del producto o servicio. El sis- tema incluirá funcionalidades de registro, creación y gestión de campañas, y visualización de historial, con un enfoque en usabilidad y escalabilidad.

3. **Definiciones y acrónimos**
- **IA**: Inteligencia Artificial.
- **UI**: Interfaz de Usuario.
- **UX**: Experiencia de Usuario.
- **GPT-3**: Modelo de lenguaje de OpenAI para generación de texto.
- **SaaS**: Software como Servicio.
- **MVP**: Producto Mínimo Viable.
2  **Descripción general**
1. **Perspectiva del producto**

ClickMail es una solución SaaS que automatiza la creación de campañas de email mar- keting mediante IA, diseñada para emprendedores y pequeñas empresas sin experiencia técnica en marketing digital. A diferencia de herramientas tradicionales, ClickMail utiliza GPT-3 para generar contenido personalizado y sugerencias de segmentación de audiencia, reduciendo el tiempo y esfuerzo necesario para crear campañas efectivas.

2. **Funciones principales**
- Registro e inicio de sesión de usuarios con autenticación segura.
- Creación de campañas de email marketing con formularios intuitivos.
- Generación automática de correos electrónicos personalizados mediante IA.
- Gestión (edición/eliminación) y visualización del historial de campañas.
- Sugerencias de segmentación de audiencia basadas en los datos ingresados.
3. **Características del usuario**
- **Emprendedores y pequeñas empresas**: Usuarios con conocimientos técnicos limi- tados que buscan automatizar campañas de email marketing.
- **Equipos de marketing**: Profesionales que desean optimizar el tiempo en la creación de contenido.
- **Usuarios finales**: Personas con acceso a internet, familiarizadas con navegadores web y dispositivos móviles.
4. **Suposiciones, dependencias y restricciones**
1. **Suposiciones**
- Los usuarios tienen acceso a una conexión a internet estable.
- Los usuarios proporcionarán datos básicos del producto/servicio (nombre, descripción, público objetivo).
2. **Dependencias**
- Integración con la API de OpenAI (GPT-3) para la generación de contenido.
- Infraestructura en la nube (Vercel, Render, Heroku) para el despliegue.
3. **Restricciones**
- La generación de contenido depende de los límites de la API de OpenAI (cuotas, costos).

2

3  **Requerimientos funcionales**



|**ID**|**Requisito**|**Descripción**|**Prioridad**|
| - | - | - | - |
|RF01|Registro de usuario|<p>El sistema permitirá a los usuarios registrarse proporcionando nombre, correo electrónico y contraseña.</p><p>**Entradas**: Nombre (máx. 50 caracteres), co- rreo electrónico (formato válido), contraseña (mín. 8 caracteres, alfanumérica).</p><p>**Salidas**: Mensaje de confirmación o error (ejemplo: “Correo ya registrado”). **Precondiciones**: El usuario no debe estar registrado.</p><p>**Postcondiciones**: Se crea una cuenta y se envía un correo de verificación.</p>|Must-have|
|RF02|Inicio de se- sión|<p>El sistema autenticará al usuario con correo y contraseña.</p><p>**Entradas**: Correo electrónico, contraseña. **Salidas**: Acceso al panel de control o men- saje de error (ejemplo: “Credenciales inváli- das”).</p><p>**Precondiciones**: El usuario debe estar re- gistrado.</p><p>**Postcondiciones**: El usuario accede al sis- tema.</p>|Must-have|
|RF03|Creación de campaña|<p>El usuario podrá crear una campaña ingre- sando datos del producto/servicio (nombre, descripción, público objetivo).</p><p>**Entradas**: Nombre del producto (máx. 100 caracteres), descripción (máx. 500 caracte- res), público objetivo (selección de opciones predefinidas o texto libre).</p><p>**Salidas**: Campaña guardada en el historial. **Precondiciones**: Usuario autenticado. **Postcondiciones**: La campaña se guarda y está lista para generar un correo.</p>|Must-have|
|RF04|Generación de correo|<p>El sistema generará un correo electrónico personalizado usando GPT-3 basado en los datos de la campaña.</p><p>**Entradas**: Datos de la campaña (producto, descripción, público).</p><p>**Salidas**: Correo generado en formato HTML/texto con opción de vista previa. **Precondiciones**: Campaña creada. **Postcondiciones**: El correo está disponible para edición o envío.</p>|Must-have|
|RF05|Gestión de campañas|<p>El usuario podrá editar o eliminar campañas existentes.</p><p>**Entradas**: Selección de campaña, nuevos da- tos (si es edición),4 confirmación (si es elimi- nación).</p><p>**Salidas**: Campaña actualizada o eliminada. **Precondiciones**: Campaña existente en el</p>|Should- have|


4  **Requerimientos no funcionales**



|**ID**|**Categoría**|**Descripción**|**Prioridad**|
| - | - | - | - |
|RNF01|Usabilidad|La interfaz debe ser intuitiva, con un tiem- po de aprendizaje menor a 5 minutos para usuarios no técnicos.|Must-have|
|RNF02|Rendimiento|La generación de correos debe completarse en menos de 3 segundos (excluyendo latencia de la API de OpenAI).|Must-have|
|RNF03|Seguridad|Los datos del usuario deben protegerse con HTTPS, cifrado AES-256 para datos sensi- bles y autenticación con JWT.|Must-have|
|RNF04|Compatibilidad|El sistema debe ser compatible con navega- dores modernos (Chrome, Firefox, Safari) y dispositivos móviles (iOS, Android).|Must-have|
|RNF05|Escalabilidad|El sistema debe soportar hasta 1,000 usua- rios concurrentes en la fase inicial, con capa- cidad de escalar a 10,000.|Should- have|
|RNF06|Disponibilidad|El sistema debe garantizar una disponibili- dad del 99.9% (excluyendo mantenimientos programados).|Should- have|
|RNF07|Mantenibilidad|El código debe seguir estándares de docu- mentación (JSDoc para JavaScript, Docs- trings para Python) para facilitar actualiza- ciones.|Nice-to- have|

5  **Requisitos de interfaz de usuario**
1. **UI01: Pantalla de login y registro**
- **Campos**: Correo electrónico, contraseña (login); nombre, correo, contraseña (registro).
- **Botones**: “Iniciar sesión”, “Registrarse”, “Recuperar contraseña”.
- **Validaciones**: Mensajes de error claros (ejemplo: “Correo inválido”).
- **Accesibilidad**: Cumplir con WCAG 2.1 (contraste, soporte para lectores de pantalla).
2. **UI02: Panel de control**
- **Elementos**: Botón para crear campaña, acceso al historial, perfil de usuario.
- **Navegación**: Barra lateral o superior para acceso rápido.
- **Diseño**: Responsive, adaptable a pantallas móviles.
3. **UI03: Formulario de creación de campañas**
- **Campos**: Nombre del producto, descripción, público objetivo (lista desplegable o tex- to).
- **Botones**: “Generar correo”, “Guardar borrador”, “Cancelar”.
- **Validaciones**: Campos obligatorios, límites de caracteres.
4. **UI04: Visualización de correo generado**
- **Elementos**: Vista previa del correo (HTML/texto), botones para “Editar”, “Enviar”, “Descargar”.
- **Interacciones**: Opción de previsualización en diferentes dispositivos.
5. **UI05: Historial de campañas**
- **Elementos**: Tabla con columnas (nombre, fecha, estado), filtros por fecha/nombre.
- **Botones**: “Editar”, “Eliminar”, “Ver detalles”.
6  **Requisitos del sistema**

**Arquitectura**: Sistema basado en arquitectura cliente-servidor con frontend y backend desacoplados.

1. **Frontend**
- **Framework**: React.js con TypeScript para componentes reutilizables.
- **Herramientas**: Vite para compilación, Tailwind CSS para estilos.
- **Despliegue**: Vercel o Netlify.
2. **Backend**
- **Framework**: Node.js con Express o Python con FastAPI.
- **Autenticación**: JWT para sesiones seguras.
- **Despliegue**: Render o Heroku.
3. **Base de datos**
- **Opciones**: Firebase Firestore (NoSQL) o MongoDB.
- **Estructura**: Colecciones para usuarios, campañas y correos generados.

6

4. **API de integración**
1. **OpenAI GPT-3**
- **Endpoint**: /completions para generación de texto.
- **Parámetros**: Prompt con datos de la campaña, modelo text-davinci-003 o similar.
- **Respuesta**: Texto del correo en formato JSON.
2. **Endpoints internos**
- POST /api/campaigns: Crear campaña.
- GET /api/campaigns: Listar campañas.
- PUT /api/campaigns/:id: Editar campaña.
- DELETE /api/campaigns/:id: Eliminar campaña.
7  **Casos de uso**
1. **Caso de uso 1: Registro e inicio de sesión**

**Actor**: Usuario no registrado/registrado.

**Descripción**: El usuario se registra o inicia sesión para acceder al sistema.

1. **Flujo principal**
1. El usuario accede a la pantalla de registro/login.
1. Ingresa los datos requeridos (correo, contraseña, nombre para registro).
1. El sistema valida los datos.
1. El sistema redirige al panel de control.
2. **Flujos alternativos**
- **A1**: Correo ya registrado → Mostrar mensaje de error.
- **A2**: Contraseña incorrecta → Mostrar mensaje de error.
3. **Excepciones**
- Fallo en la conexión a la base de datos → Mostrar mensaje de error genérico.
2. **Caso de uso 2: Creación de campaña**

**Actor**: Usuario autenticado.

**Descripción**: El usuario crea una nueva campaña de email marketing.

1. **Flujo principal**
1. El usuario selecciona “Crear campaña” en el panel.
1. Completa el formulario (nombre, descripción, público).
1. El sistema valida los datos y guarda la campaña.
1. El sistema redirige a la generación del correo.
2. **Flujos alternativos**
   1. **A1**: Campos incompletos → Mostrar mensaje de error.
2. **Excepciones**
- Error en la API → Mostrar mensaje de fallo.
3. **Caso de uso 3: Generación de correo**

**Actor**: Usuario autenticado.

**Descripción**: El sistema genera un correo personalizado usando GPT-3.

1. **Flujo principal**
1. El usuario selecciona una campaña existente.
1. El sistema envía los datos de la campaña a la API de GPT-3.
1. La API genera el contenido del correo.
1. El sistema muestra una vista previa del correo.
2. **Flujos alternativos**
   1. **A1**: Error en la API → Mostrar mensaje de error y sugerir reintento.
2. **Excepciones**
- Límite de cuota de API alcanzado → Notificar al administrador.
4. **Caso de uso 4: Visualización y gestión de campañas**

**Actor**: Usuario autenticado.

**Descripción**: El usuario visualiza y gestiona campañas anteriores.

1. **Flujo principal**
1. El usuario accede al historial de campañas.
1. Aplica filtros (fecha, nombre) si lo desea.
1. Selecciona una campaña para editar o eliminar.
1. El sistema actualiza o elimina la campaña según la acción.
2. **Flujos alternativos**
   1. **A1**: Sin campañas disponibles → Mostrar mensaje “No hay campañas”.
2. **Excepciones**
- Error en la base de datos → Mostrar mensaje de error.
8  **Riesgos y mitigación**



|**Riesgo**|**Impacto**|**Probabilida**|**dMitigación**|
| - | - | - | - |
|Límite de cuotas en API de Ope- nAI|Retrasos en la generación de correos|Media|Implementar caché para res- puestas frecuentes, negociar plan empresarial con Ope- nAI.|
|Problemas de es- calabilidad|Caída del siste- ma con muchos usuarios|Baja|Usar infraestructura escala- ble (Render/Heroku), reali- zar pruebas de carga.|
|Errores de usabi- lidad|Usuarios aban- donan la plata- forma|Media|Realizar pruebas de usabili- dad con prototipos en Fig- ma.|
|Brechas de segu- ridad|Pérdida de datos de usuarios|Baja|Implementar HTTPS, cifra- do AES-256, auditorías de seguridad regulares.|

9  **Cronograma preliminar**



|**Fase**|**Tarea**|**Responsable**|**Fecha estima- da**|
| - | - | - | :- |
|Planificació|nRefinar *user flow*|Flor|20/05/2025|
|Diseño|Prototipo en Figma|Flor|25/05/2025|
|Desarrollo|Estructura inicial frontend (React)|José|30/05/2025|
|Desarrollo|Estructura ini- cial backend (No- de.js/FastAPI)|Josué, Nahuel|30/05/2025|
|Integración|Conexión frontend- backend|José, Josué|05/06/2025|
|Pruebas|Testing básico y des- pliegue MVP|Equipo|10/06/2025|

10  **Apéndices**
- **Diagrama UML de casos de uso**: Disponible en el prototipo de Figma (en desarrollo por Flor).
- **Mockups de interfaz**: Referenciar prototipo en Figma.
- **Repositorio**: https://github.com/joseorteha/ClickMail
10
