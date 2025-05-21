import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

const CreateCampaign = React.lazy(() => import('../pages/campaign/CreateCampaign'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/campaign/create',
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <CreateCampaign />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
  // TODO: Agregar rutas protegidas para el dashboard y otras páginas
]); 