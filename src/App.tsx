import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Páginas principales
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetails from './pages/campaign/CampaignDetails';
import EmailSender from './pages/campaign/EmailSender';
import Profile from './pages/Profile';
import EmailSettings from './pages/EmailSettings';
import NotFound from './pages/NotFound';

// Páginas de producto
import Features from './pages/product/Features';
import Integrations from './pages/product/Integrations';
import Pricing from './pages/product/Pricing';
import Updates from './pages/product/Updates';

// Páginas de recursos
import Resources from './pages/resources/Resources';
import Blog from './pages/resources/Blog';
import Templates from './pages/resources/Templates';

// Páginas de soporte
import HelpCenter from './pages/support/HelpCenter';
import Contact from './pages/support/Contact';

// Páginas de la empresa
import Terms from './pages/company/Terms';
import Privacy from './pages/company/Privacy';
import Cookies from './pages/company/Cookies';

// Páginas de checkout
import Checkout from './pages/checkout/Checkout';

// Inicializar Stripe con la clave pública
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
console.log('CLAVE STRIPE:', stripeKey);
const stripePromise = loadStripe(stripeKey);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={
                    <ProtectedRoute requireAuth={false}>
                      <Landing />
                    </ProtectedRoute>
                  } />
                  <Route path="/login" element={
                    <ProtectedRoute requireAuth={false}>
                      <Login />
                    </ProtectedRoute>
                  } />
                  <Route path="/register" element={
                    <ProtectedRoute requireAuth={false}>
                      <Register />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/campaign/create" element={
                    <ProtectedRoute>
                      <CreateCampaign />
                    </ProtectedRoute>
                  } />
                  <Route path="/campaign/:campaignId" element={
                    <ProtectedRoute>
                      <CampaignDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/campaign/:campaignId/send" element={
                    <ProtectedRoute>
                      <EmailSender />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/email-settings" element={
                    <ProtectedRoute>
                      <EmailSettings />
                    </ProtectedRoute>
                  } />
                  
                  {/* Rutas para páginas de producto */}
                  <Route path="/product/features" element={<Features />} />
                  <Route path="/product/integrations" element={<Integrations />} />
                  <Route path="/product/pricing" element={<Pricing />} />
                  <Route path="/product/updates" element={<Updates />} />
                  
                  {/* Rutas para páginas de recursos */}
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/resources/blog" element={<Blog />} />
                  <Route path="/resources/templates" element={<Templates />} />
                  
                  {/* Rutas para páginas de soporte */}
                  <Route path="/support/help-center" element={<HelpCenter />} />
                  <Route path="/support/contact" element={<Contact />} />
                  
                  {/* Rutas para páginas legales y de empresa */}
                  <Route path="/company/terms" element={<Terms />} />
                  <Route path="/company/privacy" element={<Privacy />} />
                  <Route path="/company/cookies" element={<Cookies />} />
                  
                  {/* Rutas para páginas de checkout */}
                  <Route path="/checkout" element={<Checkout />} />
                  
                  {/* Ruta comodín para páginas no encontradas */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              </div>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </Elements>
  );
}

export default App;
