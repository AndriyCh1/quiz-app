import React from 'react';
import { Link } from 'react-router-dom';

import Header from './header';
import Button from './button';
import { ILink } from '../common/interfaces/header';

import { UserRoutes as Routes } from '../common/enums';
import { QuizzesPageType } from '../common/enums/router';

const links: ILink[] = [
  { display: 'Quizzes', to: Routes.Quizzes },
  { display: 'Creator', to: Routes.CreateQuiz },
  { display: 'History', to: Routes.History },
];

const UserHeader = () => {
  return (
    <Header>
      <Header.Links>
        {links.map((item, index) => (
          <Link
            key={index}
            className="header__nav__links__item"
            to={item.to.replace(':type', QuizzesPageType.All)}
          >
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
