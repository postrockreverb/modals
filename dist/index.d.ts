/// <reference types="react" />
import { ComponentType } from 'react';

declare const ModalsProvider: () => JSX.Element;

type Dict<T = any> = Record<string, T>;
interface Modal {
    id: string;
    _sid: Readonly<number>;
    params?: Dict<string>;
    onClose?: () => void;
}
interface ModalProps {
    opened: boolean;
    close: () => void;
    params?: Dict<string>;
}
interface OpenModalProps {
    onClose?: () => void;
    params?: Dict<string>;
}

declare const useModal: (modalId: Modal['id']) => {
    open: (props?: OpenModalProps) => void;
    closeActive: () => void;
    isActive: boolean;
    isOpened: boolean;
};

declare const registerModal: (id: string, Modal: ComponentType<ModalProps>) => void;

export { ModalProps, ModalsProvider, registerModal, useModal };
