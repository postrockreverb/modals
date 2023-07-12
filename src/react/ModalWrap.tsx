import { ReactNode, useEffect, useState } from 'react';

interface ModalWrapProps {
  children: (opened: boolean) => ReactNode;
  opened: boolean;
}

export const ModalWrap = ({ children, opened: _opened }: ModalWrapProps) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setTimeout(() => setOpened(_opened));
    return () => {
      setOpened(false);
    };
  }, [_opened]);

  return <>{children(opened)}</>;
};
