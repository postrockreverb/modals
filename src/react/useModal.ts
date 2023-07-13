import { useEffect, useReducer } from 'react';
import { Dict, RegisteredModal } from '../types';
import { ROUTER_EVENT_NAME } from '../router';

export const useModal = <ModalParams extends Dict<string> | undefined>(registeredModal: RegisteredModal<ModalParams>) => {
  const [, update] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const _update = () => update();
    window.addEventListener(ROUTER_EVENT_NAME, _update);
    return () => {
      window.addEventListener(ROUTER_EVENT_NAME, _update);
    };
  }, []);

  return {
    open: registeredModal.open,
    close: registeredModal.close,
    isActive: registeredModal.getIsActive(),
    isOpened: registeredModal.getIsOpened(),
  };
};
