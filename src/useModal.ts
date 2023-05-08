import { Modal, ModalProps } from './types';
import { closeModal, generateSid, openModal } from './router';
import { useRef } from 'react';
import { isActiveModal, isModalOpened } from './stack';

export const useModal = (modalId: Modal['id']) => {
  const sidRef = useRef<number>(generateSid());

  const open = (params: ModalProps) => {
    const modal: Modal = { id: modalId, _sid: sidRef.current, ...params };
    openModal(modal);
  };

  const closeActive = () => {
    closeModal();
  };

  const isActive = () => {
    return isActiveModal(sidRef.current);
  };

  const isOpened = () => {
    return isModalOpened(sidRef.current);
  };

  return {
    open,
    closeActive,
    isActive,
    isOpened,
  };
};
