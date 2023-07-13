import { ComponentType } from 'react';
import { closeModal, openModal } from './router';
import { Dict, ModalProps } from './types';

const registry: Record<string, ComponentType<ModalProps>> = {};

export const getRegistryModalsIds = () => Object.keys(registry);

export const getRegisteredModal = (id: string): ComponentType<ModalProps> | null => {
  return registry[id] ?? null;
};

export const registerModal = <ModalParams extends Dict<string>>(id: string, Modal: ComponentType<ModalProps>) => {
  registry[id] = Modal;
  const open = (params?: ModalParams) => openModal({ id, params });
  const close = () => closeModal(id);
  return [open, close];
};
