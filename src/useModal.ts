import { Modal, ModalProps } from './types';
import { closeModal, generateSid, openModal } from './router';
import { useCallback, useRef } from 'react';
import { isActiveModal, isModalOpened } from './stack';

export const useModal = (modalId: Modal['id']) => {
  const sidRef = useRef<number>(generateSid());

  const open = useCallback(
    (props?: ModalProps) => {
      const modal: Modal = { id: modalId, params: props?.params, onClose: props?.onClose, _sid: sidRef.current };
      openModal(modal);
    },
    [modalId],
  );

  const closeActive = useCallback(() => {
    closeModal();
  }, []);

  const isActive = useCallback(() => {
    return isActiveModal(sidRef.current);
  }, []);

  const isOpened = useCallback(() => {
    return isModalOpened(sidRef.current);
  }, []);

  return {
    open,
    closeActive,
    isActive,
    isOpened,
  };
};
