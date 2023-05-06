import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ILink } from '../common/interfaces/header';

import Header from './header';
import Button from './button';

import { Locals, VisitorRoutes as Routes } from '../common/enums';
import LanguageSwitcher from './language-switcher';
import { useTranslation } from 'react-i18next';

const links: ILink[] = [{ display: 'quizzes', to: Routes.PublicQuizzes }];

const VisitorHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('', { keyPrefix: 'visitorHeader' });

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
        <Button className="header__nav__btns__item" onClick={() => navigate('/login')}>
          {t('logInButton')}
        </Button>
        <Button className="header__nav__btns__item" onClick={() => navigate('/signup')}>
          {t('sinUpButton')}
        </Button>
      </Header.Buttons>
    </Header>
  );
};

export default VisitorHeader;
