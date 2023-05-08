import { Modal, ModalProps } from './types';
export declare const useModal: (modalId: Modal['id']) => {
    open: (params: ModalProps) => void;
    closeActive: () => void;
    isActive: () => boolean;
    isOpened: () => boolean;
};
