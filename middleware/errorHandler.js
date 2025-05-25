const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Errores de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Error de validación',
      details: Object.values(err.errors).map(error => error.message)
    });
  }

  // Errores de autenticación
  if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'No autorizado',
      message: 'Token inválido o expirado'
    });
  }

  // Errores de base de datos
  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Error de duplicación',
        message: 'Ya existe un registro con estos datos'
      });
    }
    return res.status(500).json({
      success: false,
      error: 'Error de base de datos',
      message: 'Error al procesar la solicitud'
    });
  }

  // Errores personalizados
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.name,
      message: err.message
    });
  }

  // Error por defecto
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: 'Ha ocurrido un error inesperado'
  });
};

module.exports = errorHandler; 