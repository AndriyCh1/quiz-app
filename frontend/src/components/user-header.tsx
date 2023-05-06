import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from './header';
import Button from './button';
import { ILink } from '../common/interfaces/header';

import { Locals, UserRoutes as Routes, VisitorRoutes } from '../common/enums';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { authActions } from '../store/auth';
import LanguageSwitcher from './language-switcher';
import { useTranslation } from 'react-i18next';

const links: ILink[] = [
  { display: 'quizzes', to: Routes.Quizzes },
  { display: 'creator', to: Routes.SingleChoiceCreator },
  { display: 'profile', to: Routes.Profile },
];

const UserHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('', { keyPrefix: 'userHeader' });

  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate(VisitorRoutes.PublicQuizzes);
  };

  return (
    <Header>
      <Header.Links>
        {links.map((item, index) => (
          <Link key={index} className="header__nav__links__item" to={item.to}>
            <li>{t(item.display)}</li>
          </Link>
        ))}
      </Header.Links>
      <Header.Buttons>
        <LanguageSwitcher initial={Locals.EN} />
        <Button className="header__nav__btns__item" onClick={handleLogout}>
          {t('logOutButton')}
        </Button>
      </Header.Buttons>
      {user?.avatar && <img src={user.avatar} alt="avatar" className="header__avatar" />}
    </Header>
  );
};

export default UserHeader;
