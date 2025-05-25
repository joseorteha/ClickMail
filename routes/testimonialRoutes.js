const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// Obtener testimonios aprobados
router.get('/', testimonialController.getTestimonials);

// Crear un nuevo testimonio
router.post('/', testimonialController.createTestimonial);

// Aprobar un testimonio (ejemplo, requiere autenticación de admin en producción)
router.patch('/:id/approve', testimonialController.approveTestimonial);

module.exports = router; 