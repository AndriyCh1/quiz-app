import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  initial: string;
}

const LanguageSwitcher: React.FC<IProps> = ({ initial }) => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select className="language-switcher__select" onChange={handleChangeLanguage}>
      <option value="en">EN</option>
      <option value="ua">UA</option>
    </select>
  );
};

export default LanguageSwitcher;
