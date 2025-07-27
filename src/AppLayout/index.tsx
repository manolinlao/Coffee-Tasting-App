import { useIsMobile } from '../hooks/useIsMobile';
import { Alert } from '../shared/components/Alert';
import { ConfirmModal } from '../shared/components/ConfirmModal';
import { DesktopLayout } from './DesktopLayout';
import { MobileLayout } from './MobileLayout';

export const AppLayout = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
      <Alert />
      <ConfirmModal />
    </>
  );
};
