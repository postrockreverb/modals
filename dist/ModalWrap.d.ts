import { ReactNode } from 'react';
interface ModalWrapProps {
    children: (opened: boolean) => ReactNode;
    opened: boolean;
}
export declare const ModalWrap: ({ children, opened: _opened }: ModalWrapProps) => JSX.Element;
export {};
