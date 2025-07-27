import { useUnit } from 'effector-react';
import {
  confirmModalModelEvents,
  confirmModalModelStores
} from '../../model/confirmModalModel';

export const ConfirmModal = () => {
  const modal = useUnit(confirmModalModelStores.$confirmModal);
  const hideConfirmModal = useUnit(confirmModalModelEvents.hideConfirmModal);

  return (
    <dialog id="confirm_modal" className="modal" open={!!modal}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmar acción</h3>
        <p className="py-4">{modal?.message}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn" onClick={() => hideConfirmModal()}>
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                modal?.onConfirm?.();
                hideConfirmModal();
              }}
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
