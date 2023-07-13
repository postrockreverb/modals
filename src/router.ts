import { Modal } from './types';
import { getActiveModal, getActiveStack, getHistoryStack, getPreviousModal, isModalActive, popModal, pushModal } from './stack';
import { getModalFromUrl, pushHistory, replaceHistory } from './helpers';

export const ROUTER_EVENT_NAME = 'modalrouterevent';

const routerEvent = new Event(ROUTER_EVENT_NAME);
const collectEvent = () => dispatchEvent(routerEvent);

export const openModal = (modal: Modal) => {
  const active = getActiveModal();
  pushModal(modal);
  pushHistory(active, modal);
  collectEvent();
};

export const closeModal = (modalId: Modal['id']) => {
  const isActive = isModalActive(modalId);
  if (isActive) {
    const active = getActiveModal();
    const previous = getPreviousModal();

    popModal();
    pushHistory(active, previous);
    collectEvent();
  }
};

export const onHistory = () => {
  const historyStack = getHistoryStack();
  const activeStack = getActiveStack();

  const lastSameIndex = Math.min(historyStack.length, activeStack.length);
  const modal = historyStack.slice(lastSameIndex).at(-1) ?? null;
  if (modal) {
    pushModal(modal);
  } else {
    popModal();
  }
  collectEvent();
};

export const init = () => {
  const modal = getModalFromUrl();
  if (modal) {
    pushModal(modal);
    replaceHistory(null, modal);
    collectEvent();
  }
};
