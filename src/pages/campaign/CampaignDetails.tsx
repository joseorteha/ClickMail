import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { EditIcon, TrashIcon, MailIcon, ChartIcon } from '../../components/ui/Icons';
import Step3Preview from '../../components/campaign/Step3Preview';
import { getCampaignById, deleteCampaign, updateCampaign } from '../../services/campaignService';
import { useAuth } from '../../context/AuthContext';

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getCampaignById(id);
        if (!data) {
          setError('Campaña no encontrada');
          return;
        }
        setCampaign(data);
      } catch (err) {
        console.error('Error al cargar la campaña:', err);
        setError('No se pudo cargar la campaña. Inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCampaign(id!);
      navigate('/dashboard', { state: { message: 'Campaña eliminada con éxito' } });
    } catch (err) {
      console.error('Error al eliminar la campaña:', err);
      setError('Error al eliminar la campaña');
      setLoading(false);
    }
  };

  const handleChange = (updatedData: any) => {
    setCampaign({ ...campaign, ...updatedData });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateCampaign(id!, campaign);
      setIsEditing(false);
      setLoading(false);
      setNotification('Campaña actualizada con éxito');
    } catch (err) {
      console.error('Error al actualizar la campaña:', err);
      setError('Error al actualizar la campaña');
      setLoading(false);
    }
  };

  if (loading && !campaign) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <div className="min-h-[400px] flex flex-col items-center justify-center">
              <div className="animate-pulse text-indigo-600 dark:text-indigo-300">Cargando...</div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <div className="min-h-[400px] flex flex-col items-center justify-center">
              <div className="text-red-500 dark:text-red-300 mb-4">{error || 'No se encontró la campaña'}</div>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Volver al Dashboard
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <div>
              <Link to="/dashboard" className="text-indigo-500 dark:text-indigo-300">&larr; Volver</Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{campaign.name}</h1>
            </div>
            <div className="flex space-x-2">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-2 flex items-center rounded-md bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                  >
                    <EditIcon size={18} className="mr-1" /> Editar
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(true)}
                    className="px-3 py-2 flex items-center rounded-md bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
                  >
                    <TrashIcon size={18} className="mr-1" /> Eliminar
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-3 py-2 flex items-center rounded-md bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                >
                  {loading ? 'Guardando...' : 'Guardar cambios'}
                </button>
              )}
            </div>
          </div>

          {deleteConfirm && (
            <div className="mb-6 p-4 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/30 rounded-md">
              <p className="text-red-700 dark:text-red-300 mb-3">¿Estás seguro que deseas eliminar esta campaña? Esta acción no se puede deshacer.</p>
              <div className="flex space-x-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  {loading ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Detalles</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={campaign.name}
                      onChange={e => handleChange({ name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="mt-1 text-gray-800 dark:text-gray-200">{campaign.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                  {isEditing ? (
                    <textarea
                      value={campaign.description}
                      onChange={e => handleChange({ description: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      rows={3}
                    />
                  ) : (
                    <p className="mt-1 text-gray-800 dark:text-gray-200">{campaign.description}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Audiencia objetivo</label>
                  {isEditing ? (
                    <textarea
                      value={campaign.targetAudience}
                      onChange={e => handleChange({ targetAudience: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      rows={2}
                    />
                  ) : (
                    <p className="mt-1 text-gray-800 dark:text-gray-200">{campaign.targetAudience}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Información</h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha de creación</h4>
                  <p className="text-gray-800 dark:text-gray-200">
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Etiquetas</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {campaign.tags.map((tag: string) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className="w-full mt-2 flex items-center justify-center py-2 border border-indigo-300 dark:border-indigo-700 rounded-md text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900"
                >
                  <MailIcon size={16} className="mr-1" /> Enviar prueba
                </button>
              </div>
            </div>
          </div>

          {/* Vista previa del Email */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Vista previa del Email</h3>
            {isEditing ? (
              <Step3Preview 
                value={campaign} 
                onChange={handleChange} 
                onBack={() => {}} 
                onError={() => {}}
                onSubmit={handleSave}
                loading={loading}
              />
            ) : (
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 min-h-[120px]">
                <div className="prose max-w-full overflow-x-auto" dangerouslySetInnerHTML={{ __html: campaign.emailContent }} />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetails;
