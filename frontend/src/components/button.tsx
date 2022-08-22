import React from 'react';

interface IProps {
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children?: React.ReactNode;
}

const Button: React.FC<IProps> = (props) => {
  return (
    <button {...props} className={`button ${props.className}`}>
      {props.children}
    </button>
  );
};

export default Button;
