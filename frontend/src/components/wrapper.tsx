import React from 'react';

interface IProps {
  className?: string;
  children: React.ReactNode;
}
const Wrapper: React.FC<IProps> = ({ children, className = '' }) => {
  return <div className={`wrapper ${className}`}>{children}</div>;
};

export default Wrapper;
