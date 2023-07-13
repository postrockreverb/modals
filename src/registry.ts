import { ComponentType } from 'react';
import { closeModal, openModal } from './router';
import { Dict, ModalProps, RegisteredModal } from './types';
import { isModalActive, isModalOpened } from './stack';

const registry: Record<string, ComponentType<ModalProps<any>>> = {};

export const getRegistryModalsIds = () => Object.keys(registry);

export const getRegisteredModal = (id: string): ComponentType<ModalProps<any>> | null => {
  return registry[id] ?? null;
};

export const registerModal = <ModalParams extends Dict<string> | undefined>(
  id: string,
  Modal: ComponentType<ModalProps<ModalParams>>,
): RegisteredModal<ModalParams> => {
  registry[id] = Modal;
  return {
    open: (params?: ModalParams) => openModal({ id, params: params ?? {} }),
    close: () => closeModal(id),
    getIsActive: () => isModalActive(id),
    getIsOpened: () => isModalOpened(id),
  };
};
