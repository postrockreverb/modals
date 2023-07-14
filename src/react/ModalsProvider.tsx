import { useEffect, useReducer, useRef } from 'react';
import { getRegistryModalsIds } from '../registry';
import { init, onHistory, ROUTER_EVENT_NAME } from '../router';
import { ModalContainer } from './ModalContainer';
import { isModalActive } from '../stack';

// попробовать рендерить маунтед стэк столько причем хранить его в юз стейте в теории норм будет

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

  const modals = getRegistryModalsIds().map((modalId) => {
    const isActive = isModalActive(modalId);
    return <ModalContainer key={modalId} modalId={modalId} isActive={isActive} />;
  });

  return <div>{modals}</div>;
};
