import React, { useEffect } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/uk';
import 'moment/locale/en-ie';

import { setLanguage } from 'containers/Profile/actions';
import { addNotification } from 'components/Notifications/actions';
import { RootState } from 'store/types';

import styles from '../styles.module.scss';

const LanguageForm = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const language = useSelector((state: RootState) => state.profile.language);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = async (value: boolean, language: 'ua' | 'en') => {
    if (value) {
      dispatch(setLanguage({ language }));
      await i18n.changeLanguage(language);
      language === 'ua' ? moment.locale('uk') : moment.locale('en');

      dispatch(
        addNotification(
          `${
            language === 'ua'
              ? t('Notifications.messages.setUaLanguage')
              : t('Notifications.messages.setEnLanguage')
          }`,
        ),
      );
    }
  };

  return (
    <div className={'opacity-50 absolute bottom-0 left-0 flex z-10'}>
      <label
        className={cn(
          styles['language-checkbox-styled'],
          language === 'en' && styles.checked,
          'cursor-pointer',
          'bg-transparent',
          'hover:bg-teal-300',
          'text-white',
          'py-1',
          'px-4',
          'border-1',
          'border-gray-700',
          'hover:border-transparent',
          'rounded',
        )}
      >
        <input
          type='checkbox'
          name='english'
          value='English'
          checked={language === 'en'}
          onChange={(ev) => changeLanguage(ev.target.checked, 'en')}
        />
        <span>EN</span>
      </label>
      <label
        className={cn(
          styles['language-checkbox-styled'],
          language === 'ua' && styles.checked,
          'cursor-pointer',
          'bg-transparent',
          'hover:bg-teal-300',
          'text-white',
          'py-1',
          'px-4',
          'border-1',
          'border-gray-700',
          'hover:border-transparent',
          'rounded',
        )}
      >
        <input
          type='checkbox'
          name='ukrainian'
          value='Ukrainian'
          checked={language === 'ua'}
          onChange={(ev) => changeLanguage(ev.target.checked, 'ua')}
        />
        <span>UA</span>
      </label>
    </div>
  );
};

export default LanguageForm;
