import { ComponentType } from 'react';
import { ModalProps } from './types';
export declare const getRegisteredModal: (id: string) => ComponentType<ModalProps>;
export declare const registerModal: (id: string, Modal: ComponentType<ModalProps>) => void;
