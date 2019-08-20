import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ua from './locales/ua.json';

const options = {
  interpolation: {
    excapeValue: false,
  },
  debug: true,
  resources: {
    en: {
      common: en,
    },
    ua: {
      common: ua,
    },
  },
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'defalut',
  },
};

i18n
  .use(initReactI18next)
  .init(options)
  .catch((err) => console.err(err));
i18n
  .changeLanguage('en', (err, t) => {
    if (err) return console.log('something went wrong loading', err);
  })
  .catch((err) => console.err(err));

export default i18n;
