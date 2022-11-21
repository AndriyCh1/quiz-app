import React from 'react';

interface IBaseProps {
  children: React.ReactNode;
}

type LinksComponent<T> = React.FunctionComponent<T>;
type ButtonsComponent<T> = React.FunctionComponent<T>;
type HeaderComponent<T, Y, K> = React.FunctionComponent<T> & {
  Links: LinksComponent<Y>;
  Buttons: ButtonsComponent<K>;
};

const Header: HeaderComponent<IBaseProps, IBaseProps, IBaseProps> = ({ children }) => {
  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header__nav">{children}</div>
      </header>
    </div>
  );
};

export const Links: React.FC<IBaseProps> = ({ children }) => (
  <ul className="header__nav__links">{children}</ul>
);

export const Buttons: React.FC<IBaseProps> = ({ children }) => {
  return <div className="header__nav__btns">{children}</div>;
};

Header.Links = Links;
Header.Buttons = Buttons;

export default Header;
