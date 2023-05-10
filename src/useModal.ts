import { useCallback, useEffect, useReducer, useRef } from 'react';
import { Modal, ModalProps } from './types';
import { closeModal, generateSid, openModal } from './router';
import { isActiveModal, isModalOpened } from './stack';

export const useModal = (modalId: Modal['id']) => {
  const [, update] = useReducer((x) => x + 1, 0);

  const sidRef = useRef<number>(generateSid());

  useEffect(() => {
    window.addEventListener('activemodalupdate', update);
    return () => {
      window.removeEventListener('activemodalupdate', update);
    };
  }, []);

  const open = useCallback(
    (props?: ModalProps) => {
      const modal: Modal = { id: modalId, params: props?.params, onClose: props?.onClose, _sid: sidRef.current };
      openModal(modal);
    },
    [modalId],
  );

  const closeActive = useCallback(() => {
    closeModal(sidRef.current);
  }, []);

  const isActive = isActiveModal(sidRef.current);
  const isOpened = isModalOpened(sidRef.current);

  return {
    open,
    closeActive,
    isActive,
    isOpened,
  };
};
