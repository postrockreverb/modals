import { Modal } from './types';

const activeStack: Modal[] = [];

export const getActiveStack = () => activeStack;

export const getPreviousModal = () => activeStack.at(-2) ?? null;

export const pushModal = (modal: Modal) => {
  activeStack.push(modal);
};

export const popModal = () => {
  activeStack.pop();
};
