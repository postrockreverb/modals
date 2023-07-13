import { useEffect, useReducer, useRef } from 'react';
import { ModalWrap } from './ModalWrap';
import { getActiveStack, isActiveModal } from '../stack';
import { getRegisteredModal, getRegistryModalsIds } from '../registry';
import { closeModal, init, onHistory, ROUTER_EVENT_NAME } from '../router';

export const ModalsProvider = () => {
  const isMounted = useRef(false);
  const [, update] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    window.addEventListener(ROUTER_EVENT_NAME, update);
    window.addEventListener('popstate', onHistory);
    if (!isMounted.current) {
      isMounted.current = true;
      init();
    }
    return () => {
      window.removeEventListener('popstate', onHistory);
    };
  }, []);

  const modalsIds = getRegistryModalsIds();
  const stack = getActiveStack();
  const modals = modalsIds.map((modalId) => {
    const Component = getRegisteredModal(modalId);
    if (!Component) {
      return null;
    }
    const isActive = isActiveModal(modalId);
    const params = stack.find((modal) => modal.id === modalId)?.params;
    return (
      <ModalWrap key={modalId} opened={isActive}>
        {(opened) => <Component close={() => closeModal(modalId)} opened={opened} params={params} />}
      </ModalWrap>
    );
  });

  return <>{modals}</>;
};
