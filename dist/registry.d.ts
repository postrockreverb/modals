import { ComponentType } from 'react';
import { Dict, ModalProps, RegisteredModal } from './types';
export declare const getRegistryModalsIds: () => string[];
export declare const getRegisteredModal: (id: string) => ComponentType<ModalProps<any>> | null;
export declare const registerModal: <ModalParams extends Dict<string> | undefined>(id: string, Modal: ComponentType<ModalProps<ModalParams>>) => RegisteredModal<ModalParams>;
