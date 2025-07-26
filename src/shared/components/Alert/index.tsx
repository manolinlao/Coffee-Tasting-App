import { useUnit } from 'effector-react';
import { $alert, showAlert, type AlertType } from '../../model/alertModel';
import { useEffect } from 'react';

const typeToClass: Record<AlertType, string> = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info'
};

export const Alert = () => {
  const alert = useUnit($alert);

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        showAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (!alert.message) return null;

  const alertClass = typeToClass[alert.type || 'info'];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`alert ${alertClass} shadow-lg animate-fade-in`}>
        <span>{alert.message}</span>
      </div>
    </div>
  );
};
