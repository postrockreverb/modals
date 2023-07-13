import { Modal } from './types';

const activeStack: Modal[] = [];

export const getActiveStack = () => activeStack;

export const getHistoryStack = () => window.history.state.modals ?? [];

export const getActiveModal = () => activeStack.at(-1) ?? null;

export const getPreviousModal = () => activeStack.at(-2) ?? null;

export const isActiveModal = (modalId: Modal['id']) => {
  return getActiveModal()?.id === modalId;
};

export const isModalOpened = (modalId: Modal['id']) => {
  return !!activeStack.find((modal) => modal.id === modalId);
};

export const pushModal = (modal: Modal) => {
  activeStack.push(modal);
};

export const popModal = () => {
  activeStack.pop();
};
