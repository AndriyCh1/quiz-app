import React from 'react';

import { GrClose as CloseIcon } from 'react-icons/gr';

import Button from './button';

interface IProps {
  show: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonText?: string;
  onSubmit?: () => void;
  closeButton?: boolean;
  footer?: boolean;
}

const Modal: React.FC<IProps> = ({
  show,
  onClose,
  title,
  children,
  className,
  buttonText,
  onSubmit,
  footer = false,
}) => {
  return (
    <div
      className={`modal-container ${show ? 'show' : ''}`}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <div className={`modal ${show ? 'show' : ''} ${className || ''}`}>
        <div className="modal__header">
          <h2 className="modal__header__title">{title}</h2>
          <div className="modal__header__close" onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="modal__body">{children}</div>
        {footer && (
          <div className="modal__footer">
            <Button className="modal__footer__submit-button" onClick={onSubmit}>
              {buttonText || 'Save'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
