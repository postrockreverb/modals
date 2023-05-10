import { Modal } from './types';
export declare const openModal: (modal: Modal) => void;
export declare const closeModal: (modalSid: Modal['_sid']) => void;
export declare const onHistoryPopState: () => void;
export declare const init: () => void;
export declare function generateSid(): number;
