import { createContext, ReactNode, useEffect, useReducer, useRef } from 'react';
import { init, onHistoryPopState } from './router';
import { getRegisteredModal } from './registry';
import { getActiveStack } from './stack';
import { activeModalUpdateEventName } from './event';

const ModalsContext = createContext(undefined);

interface ModalsContextProviderProps {
  children: ReactNode;
}

export const ModalsProvider = ({ children }: ModalsContextProviderProps) => {
  const isMounted = useRef(false);
  const [, update] = useReducer((x) => x + 1, 0);
  const stack = getActiveStack();

  useEffect(() => {
    window.addEventListener(activeModalUpdateEventName, update);
    window.addEventListener('popstate', onHistoryPopState);
    return () => {
      window.removeEventListener(activeModalUpdateEventName, update);
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
    return <Component key={i} onClose={modal.onClose} params={modal.params} />;
  });

  return (
    <ModalsContext.Provider value={undefined}>
      {children}
      {modals}
    </ModalsContext.Provider>
  );
};
