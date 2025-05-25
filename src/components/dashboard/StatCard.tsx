import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md hover:-translate-y-1">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
      
      {trend && (
        <div className={`text-xs ${trend.isPositive !== false ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'} mt-1 flex items-center`}>
          <span>{trend.value}</span>
          {trend.isPositive !== false && (
            <svg className="h-4 w-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
            </svg>
          )}
        </div>
      )}
      
      {icon && (
        <div className="absolute top-3 right-3 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatCard;
