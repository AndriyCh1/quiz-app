import React from 'react';

interface IProps {
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children?: React.ReactNode;
  tooltip?: string;
}

const Button: React.FC<IProps> = (props) => {
  const { className = '', type = 'button', disabled = false, onClick, children, tooltip } = props;

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`button ${className}`}>
      {children}
      {tooltip ? <span className="button__tooltip">{tooltip}</span> : null}
    </button>
  );
};

export default Button;
