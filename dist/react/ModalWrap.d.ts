import { ReactNode } from 'react';
interface ModalWrapProps {
    children: (isOpened: boolean) => ReactNode;
    isOpened: boolean;
}
export declare const ModalWrap: ({ children, isOpened: _isOpened }: ModalWrapProps) => JSX.Element;
export {};
