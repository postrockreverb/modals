import { Modal } from './types';
import { collectEvent } from './event';
import { getActiveStack, getPreviousModal, popModal, pushModal } from './stack';
import { pushHistoryState, replaceHistoryState } from './historyState';

export const openModal = (modal: Modal) => {
  pushModal(modal);
  pushHistoryState(getPreviousModal(), modal);
  collectEvent();
};

export const closeModal = () => {
  window.history.back();
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
