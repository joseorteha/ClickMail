const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const emailRoutes = require('./routes/emailProviderRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Endpoint para crear una sesión de pago con Stripe
app.post('/api/create-checkout-session', async (req, res) => {
  const { plan, period } = req.body;
  
  // Definir los productos y precios
  const products = {
    starter: {
      name: 'Plan Starter',
      description: 'Ideal para emprendedores y pequeños negocios',
      prices: {
        monthly: {
          amount: 1500,
          interval: 'month'
        },
        annual: {
          amount: 15000,
          interval: 'year'
        }
      }
    },
    pro: {
      name: 'Plan Pro',
      description: 'Para equipos en crecimiento',
      prices: {
        monthly: {
          amount: 3900,
          interval: 'month'
        },
        annual: {
          amount: 39000,
          interval: 'year'
        }
      }
    },
    enterprise: {
      name: 'Plan Enterprise',
      description: 'Solución completa para empresas',
      prices: {
        monthly: {
          amount: 9900,
          interval: 'month'
        },
        annual: {
          amount: 99000,
          interval: 'year'
        }
      }
    }
  };

  try {
    const product = products[plan];
    const price = product.prices[period];

    // Crear o recuperar el producto en Stripe
    let stripeProduct = await stripe.products.search({
      query: `name:'${product.name}'`
    });

    if (stripeProduct.data.length === 0) {
      stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description
      });
    } else {
      stripeProduct = stripeProduct.data[0];
    }

    // Crear o recuperar el precio en Stripe
    let stripePrice = await stripe.prices.search({
      query: `product:'${stripeProduct.id}' AND unit_amount:${price.amount} AND recurring[interval]:'${price.interval}'`
    });

    if (stripePrice.data.length === 0) {
      stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: price.amount,
        currency: 'usd',
        recurring: {
          interval: price.interval
        }
      });
    } else {
      stripePrice = stripePrice.data[0];
    }

    // Crear la sesión de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: stripePrice.id,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/pricing`,
      customer_email: req.body.email,
      metadata: {
        plan,
        period
      }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error al crear la sesión de Stripe:', error);
    res.status(500).json({ 
      error: 'Error al procesar el pago',
      details: error.message 
    });
  }
});

// Webhook para manejar eventos de Stripe
app.post('/api/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Error en webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar el evento
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Aquí puedes actualizar tu base de datos con la información de la suscripción
      console.log('Pago completado:', session);
      break;
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      // Manejar actualización de suscripción
      console.log('Suscripción actualizada:', subscription);
      break;
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      // Manejar cancelación de suscripción
      console.log('Suscripción cancelada:', deletedSubscription);
      break;
  }

  res.json({received: true});
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: 'La ruta solicitada no existe'
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Promesa rechazada no manejada:', err);
  process.exit(1);
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
