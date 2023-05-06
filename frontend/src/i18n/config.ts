import i18next from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { Locals } from '../common/enums';
// import store from '../store';
import en from './en.json';
import ua from './ua.json';

export const resources = {
  [Locals.EN]: {
    translation: en,
  },
  [Locals.UA]: {
    translation: ua,
  },
};

i18next
  .use(initReactI18next)
  // .use(LanguageDetector)
  .init(
    {
      resources,
      fallbackLng: Locals.EN,
    },
    () => {
      // store.UI.setLocale(i18next.language);
      console.log(i18next.language, 'i18next.language');
    },
  );

export default i18next;
