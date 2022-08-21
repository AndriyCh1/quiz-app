import React from 'react';

interface IProps {
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<IProps> = ({ children, className = '' }) => {
  return <div className={`container${className}`}>{children}</div>;
};

export default Container;
