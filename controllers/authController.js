const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
  try {
    console.log('Recibiendo solicitud de registro:', req.body);
    const { name, email, password } = req.body;
    
    // Verificar que todos los campos necesarios estén presentes
    if (!name || !email || !password) {
      console.log('Campos faltantes:', { name, email, password: password ? 'provided' : 'missing' });
      return res.status(400).json({ message: 'Todos los campos son requeridos: nombre, email y contraseña' });
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }
    
    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Crear nuevo usuario
    const user = new User({
      name,
      email,
      hashed_password: hashedPassword
    });
    
    await user.save();
    
    // Respuesta sin devolver la contraseña
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    console.log('Recibiendo solicitud de login:', req.body);
    
    // El frontend envía username (email) y password como FormData
    const email = req.body.username || req.body.email;
    const password = req.body.password;
    
    if (!email || !password) {
      console.log('Campos faltantes en login:', { email: !!email, password: !!password });
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }
    
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    // Generar token JWT
    const token = jwt.sign(
      { id: user._id },  // Cambiado de user_id a id para coincidir con el middleware
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Respuesta con token y datos de usuario
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener perfil del usuario
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    
    const user = await User.findById(userId).select('-hashed_password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
