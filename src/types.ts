export type Dict<T = any> = Record<string, T>;

export interface Modal {
  id: string;
  _sid: Readonly<number>;
  params?: Dict<string>;
  onClose?: () => void;
}

export interface ModalProps {
  onClose?: () => void;
  params?: Dict<string>;
}
