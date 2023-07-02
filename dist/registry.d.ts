import { ComponentType } from 'react';
import { ModalProps } from './types';
export declare const getRegisteredModal: (id: string) => ComponentType<ModalProps>;
export declare const registerModal: (id: string, Modal: ComponentType<ModalProps>) => void;
export declare const getMountedModals: () => {
    id: string;
    _sid: number;
}[];
export declare const mountModal: (id: string, _sid: number) => number | undefined;
export declare const unmountModal: (_sid: number) => {
    id: string;
    _sid: number;
}[];
