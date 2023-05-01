import { ComponentType } from 'react';
import { ModalProps } from './types';

const registry: Record<string, ComponentType<ModalProps>> = {};
export const getRegisteredModal = (id: string) => registry[id] ?? null;
export const registerModal = (id: string, Modal: ComponentType<ModalProps>) => {
  registry[id] = Modal;
};
