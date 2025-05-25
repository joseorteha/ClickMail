import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MailIcon, EditIcon, TrashIcon, InfoIcon } from '../ui/Icons';

interface Campaign {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  sentDate?: string;
  emailContent?: string;
}

interface CampaignCardProps {
  campaign: Campaign;
  onView: (id: string) => void;
  onEdit: (id: string, content: string, campaign: Campaign) => void;
  onSendTest: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
  renderStatusBadge: (status: string) => React.ReactNode;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onView,
  onEdit,
  onSendTest,
  onDelete,
  renderStatusBadge
}) => {
  const campaignId = campaign._id || campaign.id || '';
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Sin fecha';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Sin fecha';
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <motion.div 
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 truncate">
              {campaign.name}
            </h3>
            {renderStatusBadge(campaign.status)}
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {campaign.description}
          </p>
          
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Creada: {formatDate(campaign.createdAt)}
            {campaign.sentDate && (
              <span className="ml-2">• Enviada: {formatDate(campaign.sentDate)}</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 4px 20px 0 rgba(59,130,246,0.15)' }}
            whileTap={{ scale: 0.95 }}
            className="group p-0.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            onClick={() => onView(campaignId)}
            title="Ver detalles"
          >
            <span className="flex items-center justify-center w-11 h-11">
              <InfoIcon size={26} className="text-blue-500 group-hover:text-blue-700 transition-colors" />
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 4px 20px 0 rgba(59,130,246,0.15)' }}
            whileTap={{ scale: 0.95 }}
            className="group p-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
            onClick={() => onEdit(campaignId, campaign.emailContent || '', campaign)}
            title="Editar email"
          >
            <span className="flex items-center justify-center w-11 h-11">
              <EditIcon size={26} className="text-blue-600 group-hover:text-blue-800 transition-colors" />
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 4px 20px 0 rgba(16,185,129,0.15)' }}
            whileTap={{ scale: 0.95 }}
            className="group p-0.5 rounded-full bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-800/40 transition-colors"
            onClick={() => onSendTest(campaign)}
            title="Enviar prueba"
          >
            <span className="flex items-center justify-center w-11 h-11">
              <MailIcon size={26} className="text-green-600 group-hover:text-green-800 transition-colors" />
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 4px 20px 0 rgba(239,68,68,0.15)' }}
            whileTap={{ scale: 0.95 }}
            className="group p-0.5 rounded-full bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800/40 transition-colors"
            onClick={() => onDelete(campaignId)}
            title="Eliminar campaña"
          >
            <span className="flex items-center justify-center w-11 h-11">
              <TrashIcon size={26} className="text-red-600 group-hover:text-red-800 transition-colors" />
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
