import { Modal } from './types';
import { collectEvent } from './event';
import { getActiveModal, getActiveStack, getPreviousModal, isActiveModal, popModal, pushModal } from './stack';
import { pushHistoryState, replaceHistoryState } from './historyState';
import { mountModal } from './registry';

let initModalSid: number | null = null;

export const openModal = (modal: Modal) => {
  pushModal(modal);
  pushHistoryState(getPreviousModal(), modal);
  collectEvent();
};

export const closeModal = (modalSid: Modal['_sid']) => {
  const isActive = isActiveModal(modalSid);
  if (isActive) {
    const hasPrevious = modalSid !== initModalSid;
    if (!hasPrevious) {
      // go forward
      const active = getActiveModal();
      const previous = getPreviousModal();

      popModal();
      pushHistoryState(active, previous);
      collectEvent();
      return;
    }
    window.history.back();
  }
};

export const onHistoryPopState = () => {
  const stateStack = window.history.state.modals ?? [];
  const currentStack = getActiveStack();

  if (Math.abs(stateStack.length - currentStack.length) === 1) {
    const lastSameIndex = Math.min(stateStack.length, currentStack.length);
    const modal = stateStack.slice(lastSameIndex).at(-1) ?? null;
    if (modal) {
      pushModal(modal);
    } else {
      popModal();
    }
  }

  collectEvent();
};

export const init = () => {
  const modal = getModalFromUrl();
  if (!modal) {
    return;
  }

  pushModal(modal);
  mountModal(modal.id, modal._sid);
  initModalSid = modal._sid;
  replaceHistoryState(null, modal);
  collectEvent();
};

function getModalFromUrl(): Modal | null {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const { modal: id, ...modalParams } = params;
  if (!id) {
    return null;
  }

  return {
    id: `${id}`,
    params: modalParams,
    _sid: generateSid(),
  };
}

export function generateSid(): number {
  return Math.floor(Math.random() * 1_000_000);
}
