/// <reference types="react" />
import { ComponentType } from 'react';

declare const ModalsProvider: () => JSX.Element;

type Dict<T = any> = Record<string, T>;
interface ModalProps<ModalParams extends Dict<string> | undefined = undefined> {
    isOpened: boolean;
    close: () => void;
    params: Partial<ModalParams>;
}
interface RegisteredModal<ModalParams extends Dict<string> | undefined> {
    open: (params?: ModalParams) => void;
    close: () => void;
    getIsActive: () => boolean;
    getIsOpened: () => boolean;
}

declare const useModal: <ModalParams extends Dict<string> | undefined>(registeredModal: RegisteredModal<ModalParams>) => {
    open: (params?: ModalParams | undefined) => void;
    close: () => void;
    isActive: boolean;
    isOpened: boolean;
};

declare const registerModal: <ModalParams extends Dict<string> | undefined>(id: string, Modal: ComponentType<ModalProps<ModalParams>>) => RegisteredModal<ModalParams>;

export { ModalProps, ModalsProvider, registerModal, useModal };
