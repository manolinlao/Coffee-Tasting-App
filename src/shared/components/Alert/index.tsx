// src/shared/ui/Alert.tsx
import { useUnit } from 'effector-react';
import { $alertMessage, showAlert } from '../../model/alertModel';
import { useEffect } from 'react';

export const Alert = () => {
  const message = useUnit($alertMessage);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        showAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="alert alert-success shadow-lg animate-fade-in">
        <span>{message}</span>
      </div>
    </div>
  );
};
