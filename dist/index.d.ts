import { ReactNode, ComponentType } from 'react';

interface ModalsContextProviderProps {
    children: ReactNode;
}
declare const ModalsProvider: ({ children }: ModalsContextProviderProps) => JSX.Element;

type Dict<T = any> = Record<string, T>;
interface Modal {
    id: string;
    _sid: Readonly<number>;
    params?: Dict<string>;
    onClose?: () => void;
}
interface ModalProps {
    onClose?: () => void;
    params?: Dict<string>;
}

declare const registerModal: (id: string, Modal: ComponentType<ModalProps>) => void;

declare const openModal: (modal: Modal) => void;
declare const closeModal: (modalSid: Modal['_sid']) => void;
declare const init: () => void;

declare const useModal: (modalId: Modal['id']) => {
    open: (props?: ModalProps) => void;
    closeActive: () => void;
    isActive: boolean;
    isOpened: boolean;
};

export { ModalProps, ModalsProvider, closeModal, init, openModal, registerModal, useModal };
