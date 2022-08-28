import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ILink } from '../common/interfaces/header';

import Header from './header';
import Button from './button';

import { VisitorRoutes as Routes } from '../common/enums/router';

const links: ILink[] = [{ display: 'Quizzes', to: Routes.PublicQuizzes }];

const VisitorHeader = () => {
  const navigate = useNavigate();

  return (
    <Header>
      <Header.Links>
        {links.map((item, index) => (
          <Link key={index} className="header__nav__links__item" to={item.to}>
            <li>{item.display}</li>
          </Link>
        ))}
      </Header.Links>
      <Header.Buttons>
        <Button className="header__nav__btns__item" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button className="header__nav__btns__item" onClick={() => navigate('/signup')}>
          Sign up
        </Button>
      </Header.Buttons>
    </Header>
  );
};

export default VisitorHeader;
