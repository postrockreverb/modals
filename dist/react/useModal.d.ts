import { Dict, RegisteredModal } from '../types';
export declare const useModal: <ModalParams extends Dict<string> | undefined>(registeredModal: RegisteredModal<ModalParams>) => {
    open: (params?: ModalParams | undefined) => void;
    close: () => void;
    isActive: boolean;
    isOpened: boolean;
};
