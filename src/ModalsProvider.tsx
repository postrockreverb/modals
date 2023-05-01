import { createContext, ReactNode, useEffect, useReducer, useRef } from 'react';
import { closeModal, init, onHistoryPopState } from './router';
import { getRegisteredModal } from './registry';
import { getActiveStack } from './stack';

const ModalsContext = createContext(undefined);

interface ModalsContextProviderProps {
  children: ReactNode;
}

export const ModalsProvider = ({ children }: ModalsContextProviderProps) => {
  const isMounted = useRef(false);
  const [, update] = useReducer((x) => x + 1, 0);
  const stack = getActiveStack();

  useEffect(() => {
    window.addEventListener('activemodalupdate', update);
    window.addEventListener('popstate', onHistoryPopState);
    return () => {
      window.removeEventListener('activemodalupdate', update);
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
    return <Component key={i} onClose={() => closeModal()} params={modal.params} />;
  });

  return (
    <ModalsContext.Provider value={undefined}>
      {children}
      {modals}
    </ModalsContext.Provider>
  );
};
