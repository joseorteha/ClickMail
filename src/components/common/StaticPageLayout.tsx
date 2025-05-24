import React, { ReactNode } from 'react';

interface StaticPageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  imageSrc?: string;
}

const StaticPageLayout: React.FC<StaticPageLayoutProps> = ({ 
  title, 
  subtitle, 
  children,
  imageSrc 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Header con imagen de fondo opcional */}
      <div className={`rounded-2xl overflow-hidden mb-10 ${imageSrc ? 'relative shadow-xl' : 'shadow-md'}`}>
        {imageSrc && (
          <div className="absolute inset-0">
            <img 
              src={imageSrc} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/70 to-blue-800/80 mix-blend-multiply" />
          </div>
        )}
        
        <div className={`${imageSrc 
          ? 'relative py-16 px-8 text-white' 
          : 'py-10 px-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 text-gray-900 dark:text-white border dark:border-gray-700'}`}>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 dark:text-white">{title}</h1>
          {subtitle && <p className={`text-lg ${imageSrc ? 'text-blue-100' : 'text-blue-600 dark:text-blue-300'} max-w-3xl`}>{subtitle}</p>}
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="prose prose-blue dark:prose-invert max-w-none dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white dark:prose-li:text-gray-300 dark:prose-a:text-blue-300 hover:dark:prose-a:text-blue-200">
        {children}
      </div>
    </div>
  );
};

export default StaticPageLayout;
