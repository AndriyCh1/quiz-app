import React from 'react';
import { Link } from 'react-router-dom';

import Header from './header';
import Button from './button';
import { ILink } from '../common/interfaces/header';

import { UserRoutes as Routes } from '../common/enums';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { authActions } from '../store/auth';

const links: ILink[] = [
  { display: 'Quizzes', to: Routes.Quizzes },
  { display: 'Creator', to: Routes.CreateQuiz },
  { display: 'History', to: Routes.History },
];

const UserHeader = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

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
        <Button className="header__nav__btns__item" onClick={handleLogout}>
          Log out
        </Button>
      </Header.Buttons>
    </Header>
  );
};

export default UserHeader;
