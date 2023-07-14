import { memo, useEffect, useState } from 'react';
import { getRegisteredModal } from '../registry';
import { closeModal } from '../router';
import { getActiveStack, isModalActive } from '../stack';

const TIME_TO_UNMOUNT = 2000;

interface ModalNestProps {
  modalId: string;
  isActive: boolean;
}

const ModalContainer = memo(({ modalId, isActive }: ModalNestProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsMounted(true);
    } else if (isMounted) {
      setTimeout(() => {
        const isActive = isModalActive(modalId);
        if (!isActive) {
          setIsMounted(false);
        }
      }, TIME_TO_UNMOUNT);
    }
  }, [isActive]);

  if (!(isMounted || isActive)) {
    return null;
  }

  const Component = getRegisteredModal(modalId);
  if (!Component) {
    return null;
  }

  const params = getActiveStack().find((modal) => modal.id === modalId)?.params ?? {};
  return <Component close={() => closeModal(modalId)} isOpened={isActive && isMounted} params={params} />;
});

ModalContainer.displayName = 'ModalContainer';
export { ModalContainer };
