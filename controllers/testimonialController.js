const Testimonial = require('../models/Testimonial');

// Obtener testimonios aprobados
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener testimonios' });
  }
};

// Crear un nuevo testimonio
exports.createTestimonial = async (req, res) => {
  try {
    const { name, company, position, avatarUrl, message } = req.body;
    const testimonial = new Testimonial({ name, company, position, avatarUrl, message, approved: false });
    await testimonial.save();
    res.status(201).json({ message: 'Testimonio enviado y pendiente de aprobación.' });
  } catch (err) {
    res.status(400).json({ error: 'Error al enviar testimonio' });
  }
};

// Aprobar un testimonio (solo admin, ejemplo básico)
exports.approveTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndUpdate(id, { approved: true }, { new: true });
    if (!testimonial) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Testimonio aprobado', testimonial });
  } catch (err) {
    res.status(400).json({ error: 'Error al aprobar testimonio' });
  }
}; 