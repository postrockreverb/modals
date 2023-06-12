import { createContext, ReactNode, useEffect, useReducer, useRef } from 'react';
import { closeModal, init, onHistoryPopState } from './router';
import { getRegisteredModal } from './registry';
import { getActiveStack } from './stack';
import { ACTIVE_MODAL_UPDATE_EVENT_NAME } from './event';

const ModalsContext = createContext(undefined);

interface ModalsContextProviderProps {
  children: ReactNode;
}

export const ModalsProvider = ({ children }: ModalsContextProviderProps) => {
  const isMounted = useRef(false);
  const [, update] = useReducer((x) => x + 1, 0);
  const stack = getActiveStack();

  useEffect(() => {
    window.addEventListener(ACTIVE_MODAL_UPDATE_EVENT_NAME, update);
    window.addEventListener('popstate', onHistoryPopState);
    return () => {
      window.removeEventListener(ACTIVE_MODAL_UPDATE_EVENT_NAME, update);
      window.removeEventListener('popstate', onHistoryPopState);
    };
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      init();
      isMounted.current = true;
    }
  }, []);

  const modals = stack.map((modal, i) => {
    const Component = getRegisteredModal(modal.id);
    if (!Component) {
      return null;
    }

    const onCurrentModalClose = () => {
      closeModal(modal._sid);
      modal.onClose?.();
    };

    return <Component key={i} onClose={onCurrentModalClose} params={modal.params} />;
  });

  return (
    <ModalsContext.Provider value={undefined}>
      {children}
      {modals}
    </ModalsContext.Provider>
  );
};
