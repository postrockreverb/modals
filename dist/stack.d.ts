import { Modal } from './types';
export declare const getActiveStack: () => Modal[];
export declare const getHistoryStack: () => any;
export declare const getActiveModal: () => Modal | null;
export declare const getPreviousModal: () => Modal | null;
export declare const isModalActive: (modalId: Modal['id']) => boolean;
export declare const isModalOpened: (modalId: Modal['id']) => boolean;
export declare const pushModal: (modal: Modal) => void;
export declare const popModal: () => void;
