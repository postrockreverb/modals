import { useCallback, useEffect, useReducer, useRef } from 'react';
import { Modal, OpenModalProps } from './types';
import { closeModal, generateSid, openModal } from './router';
import { isActiveModal, isModalOpened } from './stack';
import { ACTIVE_MODAL_UPDATE_EVENT_NAME } from './event';
import { mountModal, unmountModal } from './registry';

export const useModal = (modalId: Modal['id']) => {
  const [, update] = useReducer((x) => x + 1, 0);

  const sidRef = useRef<number>(generateSid());

  useEffect(() => {
    const _sid = sidRef.current;
    mountModal(modalId, _sid);
    window.addEventListener(ACTIVE_MODAL_UPDATE_EVENT_NAME, update);
    return () => {
      unmountModal(_sid);
      window.removeEventListener(ACTIVE_MODAL_UPDATE_EVENT_NAME, update);
    };
  }, []);

  const open = useCallback(
    (props?: OpenModalProps) => {
      const modal: Modal = {
        id: modalId,
        params: props?.params,
        onClose: props?.onClose,
        _sid: sidRef.current,
      };
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
