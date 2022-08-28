import React from 'react';
import Button from './button';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-wrapper">
      <header className="header">
        {/*<div className="header__logo">*/}
        {/*  <img src={logo} alt="" />*/}
        {/*</div>*/}
        <div className="header__nav">
          <ul className="header__nav__links">
            <Link className="header__nav__links__item" to="">
              <li>Quizzes</li>
            </Link>
          </ul>
          <div className="header__nav__btns">
            <Button className="header__nav__btns__item" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button className="header__nav__btns__item" onClick={() => navigate('/signup')}>
              Sign up
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
