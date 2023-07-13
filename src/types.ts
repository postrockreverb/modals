export type Dict<T = any> = Record<string, T>;

export interface Modal {
  id: string;
  params: Partial<Dict<string>>;
}

export interface ModalProps<ModalParams extends Dict<string> | undefined> {
  isOpened: boolean;
  close: () => void;
  params: Partial<ModalParams>;
}

export interface RegisteredModal<ModalParams extends Dict<string> | undefined> {
  open: (params: ModalParams) => void;
  close: () => void;
  getIsActive: () => boolean;
  getIsOpened: () => boolean;
}
