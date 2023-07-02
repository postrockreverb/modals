export type Dict<T = any> = Record<string, T>;
export interface Modal {
    id: string;
    _sid: Readonly<number>;
    params?: Dict<string>;
    onClose?: () => void;
}
export interface ModalProps {
    opened: boolean;
    close: () => void;
    params?: Dict<string>;
}
export interface OpenModalProps {
    onClose?: () => void;
    params?: Dict<string>;
}
