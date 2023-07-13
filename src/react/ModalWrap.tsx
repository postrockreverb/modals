import { ReactNode, useEffect, useState } from 'react';

interface ModalWrapProps {
  children: (isOpened: boolean) => ReactNode;
  isOpened: boolean;
}

export const ModalWrap = ({ children, isOpened: _isOpened }: ModalWrapProps) => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsOpened(_isOpened));
    return () => {
      setIsOpened(false);
    };
  }, [_isOpened]);

  return <>{children(isOpened)}</>;
};
