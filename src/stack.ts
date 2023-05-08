import { Modal } from './types';

const activeStack: Modal[] = [];

export const getActiveStack = () => activeStack;

export const getPreviousModal = () => activeStack.at(-2) ?? null;

export const isActiveModal = (modalSid: Modal['_sid']) => getActiveStack().at(-1)?._sid === modalSid;

export const isModalOpened = (modalSid: Modal['_sid']) => !!activeStack.findLast((modal) => modal._sid === modalSid);

export const pushModal = (modal: Modal) => {
  const isOpened = isModalOpened(modal._sid);
  if (isOpened) {
    return;
  }
  activeStack.push(modal);
};

export const popModal = () => {
  activeStack.pop();
};
