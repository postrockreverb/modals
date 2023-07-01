import { Modal } from './types';
export declare const getActiveStack: () => Modal[];
export declare const getActiveModal: () => Modal | null;
export declare const getPreviousModal: () => Modal | null;
export declare const isActiveModal: (modalSid: Modal['_sid']) => boolean;
export declare const isModalOpened: (modalSid: Modal['_sid']) => boolean;
export declare const pushModal: (modal: Modal) => void;
export declare const popModal: () => void;
