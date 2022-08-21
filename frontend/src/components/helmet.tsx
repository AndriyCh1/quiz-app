import React, { useEffect } from 'react';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const Helmet: React.FC<IProps> = ({ title, children }) => {
  document.title = title;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
};

export default Helmet;
