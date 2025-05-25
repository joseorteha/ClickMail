const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { 
  saveEmailProvider,
  getEmailProvider,
  deleteEmailProvider,
  verifyMailgunConfig
} = require('../controllers/emailProviderController');

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas para la configuración del proveedor de email
router.post('/email-provider', saveEmailProvider);
router.get('/email-provider', getEmailProvider);
router.delete('/email-provider', deleteEmailProvider);
router.post('/verify-mailgun', verifyMailgunConfig);

module.exports = router;
