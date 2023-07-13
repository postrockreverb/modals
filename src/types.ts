export type Dict<T = any> = Record<string, T>;

export interface Modal {
  id: string;
  params?: Dict<string>;
}

export interface ModalProps {
  opened: boolean;
  close: () => void;
  params?: Dict<string>;
}
