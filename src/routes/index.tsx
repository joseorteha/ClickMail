import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

const CreateCampaign = React.lazy(() => import('../pages/CreateCampaign'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
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