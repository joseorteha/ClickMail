const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuración CORS más permisiva para desarrollo
app.use(cors({
  origin: '*',  // Permitir cualquier origen en desarrollo
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware de logging para depuración
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers['content-type']);
  console.log('Auth Header:', req.headers['authorization'] ? 'Present' : 'Missing');
  if (req.headers['authorization']) {
    console.log('Token:', req.headers['authorization'].substring(0, 20) + '...');
  }
  next();
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conexión a MongoDB establecida correctamente');
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
  });

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.json({ message: 'ClickMail API Node.js' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
