import { Modal, ModalProps } from './types';
export declare const useModal: (modalId: Modal['id']) => {
    open: (props?: ModalProps) => void;
    closeActive: () => void;
    isActive: () => boolean;
    isOpened: () => boolean;
};
