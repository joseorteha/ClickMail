import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: (
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-3 mx-auto">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </span>
    ),
    title: 'Inteligencia Artificial',
    color: 'text-blue-700',
    desc: 'Genera contenido personalizado optimizado para tu audiencia.'
  },
  {
    icon: (
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-3 mx-auto">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-600">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
        </svg>
      </span>
    ),
    title: 'Fácil de usar',
    color: 'text-purple-700',
    desc: 'Interfaz intuitiva diseñada para maximizar tu productividad.'
  },
  {
    icon: (
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-3 mx-auto">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
    ),
    title: 'Asistencia 24/7',
    color: 'text-green-700',
    desc: 'Obtén ayuda cuando la necesites a través de nuestro centro de soporte.'
  }
];

const InfoPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            {feature.icon}
            <h3 className={`text-lg font-bold mb-2 ${feature.color} dark:text-opacity-90`}>{feature.title}</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default InfoPanel; 