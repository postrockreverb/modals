import { useEffect, useReducer, useRef } from 'react';
import { ModalWrap } from './ModalWrap';
import { getActiveStack, isModalActive } from '../stack';
import { getRegisteredModal, getRegistryModalsIds } from '../registry';
import { closeModal, init, onHistory, ROUTER_EVENT_NAME } from '../router';

export const ModalsProvider = () => {
  const isMounted = useRef(false);
  const [, update] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const _update = () => update();
    window.addEventListener(ROUTER_EVENT_NAME, _update);
    window.addEventListener('popstate', onHistory);
    if (!isMounted.current) {
      isMounted.current = true;
      init();
    }
    return () => {
      window.removeEventListener(ROUTER_EVENT_NAME, _update);
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
    const modal = stack.find((modal) => modal.id === modalId);
    if (!modal) {
      return null;
    }
    const isActive = isModalActive(modal.id);
    return (
      <ModalWrap key={modal.id} isOpened={isActive}>
        {(isOpened) => <Component close={() => closeModal(modal.id)} isOpened={isOpened} params={modal.params} />}
      </ModalWrap>
    );
  });

  return <>{modals}</>;
};
