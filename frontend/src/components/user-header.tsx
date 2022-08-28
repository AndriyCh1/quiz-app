import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from './header';
import Button from './button';
import { ILink } from '../common/interfaces/header';

import { UserRoutes as Routes } from '../common/enums';

const links: ILink[] = [
  { display: 'Public quizzes', to: Routes.PublicQuizzes },
  { display: 'Create quizzes', to: Routes.CreateQuiz },
  { display: 'See created', to: Routes.CreatedQuizzes },
  { display: 'History', to: Routes.History },
];

const UserHeader = () => {
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
        <Button className="header__nav__btns__item"> Log out</Button>
      </Header.Buttons>
    </Header>
  );
};

export default UserHeader;
