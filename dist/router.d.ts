import { Modal } from './types';
export declare const ROUTER_EVENT_NAME = "modalrouterevent";
export declare const openModal: (modal: Modal) => void;
export declare const closeModal: (modalId: Modal['id']) => void;
export declare const onHistory: () => void;
export declare const init: () => void;
