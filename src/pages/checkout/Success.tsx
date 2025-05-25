import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const Success = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¡Pago Exitoso!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Tu plan ha sido activado. Gracias por confiar en nosotros.</p>
            <Link to="/dashboard" className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg">Ir al Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success; 