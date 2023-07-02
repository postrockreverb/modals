import { ComponentType } from 'react';
import { ModalProps } from './types';

const registry: Record<string, ComponentType<ModalProps>> = {};
export const getRegisteredModal = (id: string) => registry[id] ?? null;
export const registerModal = (id: string, Modal: ComponentType<ModalProps>) => {
  registry[id] = Modal;
};

const mounted: { id: string; _sid: number }[] = [];
export const getMountedModals = () => mounted;
export const mountModal = (id: string, _sid: number) => {
  const alreadyMounted = mounted.find((mounted) => mounted._sid === _sid);
  if (alreadyMounted) {
    return;
  }
  return mounted.push({ id, _sid });
};
export const unmountModal = (_sid: number) => mounted.filter((mounted) => mounted._sid !== _sid);
