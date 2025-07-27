import { Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NoEntries = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
      <Coffee size={48} className="mb-4 text-yellow-600" />
      <p className="mb-2 text-lg font-medium">No hay catas guardadas</p>
      <p className="max-w-sm">
        Aún no has registrado ninguna cata. Comienza añadiendo una nueva para
        guardar tus experiencias y descubrir nuevos sabores.
      </p>
      <button
        className="mt-6 btn btn-primary"
        onClick={() => {
          navigate('/create');
        }}
      >
        Añadir nueva cata
      </button>
    </div>
  );
};
