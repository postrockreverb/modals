import { Modal } from './types';
export declare const getActiveStack: () => Modal[];
export declare const getPreviousModal: () => Modal | null;
export declare const pushModal: (modal: Modal) => void;
export declare const popModal: () => void;
