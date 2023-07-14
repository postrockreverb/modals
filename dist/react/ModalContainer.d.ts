/// <reference types="react" />
interface ModalNestProps {
    modalId: string;
    isActive: boolean;
}
declare const ModalContainer: import("react").MemoExoticComponent<({ modalId, isActive }: ModalNestProps) => JSX.Element | null>;
export { ModalContainer };
