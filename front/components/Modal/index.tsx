import React, { FC, useCallback } from 'react';
import { CreateModal } from '@components/Modal/styles';
import { CloseModalButton } from '@components/Menu/styles';

interface Props {
  show: boolean;
  onCloseModal: () => void;
}

const Modal: FC<React.PropsWithChildren<{}> & Props> = ({ children, show, onCloseModal }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        {<CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
