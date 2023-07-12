import { Modal, OpenModalProps } from '../types';
export declare const useModal: (modalId: Modal['id']) => {
    open: (props?: OpenModalProps) => void;
    closeActive: () => void;
    isActive: boolean;
    isOpened: boolean;
};
