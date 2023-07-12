import { createContext, useEffect, useReducer, useRef } from 'react';
import { closeModal, init, onHistoryPopState } from './router';
import { getMountedModals, getRegisteredModal } from './registry';
import { getActiveStack } from './stack';
import { ACTIVE_MODAL_UPDATE_EVENT_NAME } from './event';
import { ModalWrap } from './ModalWrap';

const ModalsContext = createContext(undefined);

export const ModalsProvider = () => {
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

  const modals = getMountedModals().map((mounted) => {
    const Component = getRegisteredModal(mounted.id);
    if (!Component) {
      return null;
    }

    const modal = stack.find((modal) => modal._sid === mounted._sid);

    const closeCurrent = () => {
      closeModal(mounted._sid);
      modal?.onClose?.();
    };

    return (
      <ModalWrap key={mounted._sid} opened={!!modal}>
        {(opened) => <Component close={closeCurrent} opened={opened} params={modal?.params} />}
      </ModalWrap>
    );
  });

  return <ModalsContext.Provider value={undefined}>{modals}</ModalsContext.Provider>;
};
