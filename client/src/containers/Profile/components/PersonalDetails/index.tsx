import React, { useEffect } from 'react';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from 'store/types';

import Spinner from 'components/Spinner';
import { forgotPassword, setLanguage } from 'containers/Profile/actions';

import styles from './styles.module.scss';
import { addNotification } from 'components/Notifications/actions';

export const usePersonalDetails = () => {
  const user = useSelector((state: RootState) => state.profile.user);
  const language = useSelector((state: RootState) => state.profile.language);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return { user, language, setLanguage };
};

const PersonalDetails = withRouter(({ history }) => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const { user, language } = usePersonalDetails();
  if (!user) return <Spinner />;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Updating personal details:');
  };

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(forgotPassword({ email: user.email }));
    history.push('/profile/set/password');
  };

  const changeLanguage = async (value: boolean, language: 'ua' | 'en') => {
    if (value) {
      dispatch(setLanguage({ language }));
      await i18n.changeLanguage(language);
      dispatch(
        addNotification(
          `You have changed website language to ${
            language === 'ua' ? 'Ukrainian' : 'English'
          }.`,
        ),
      );
    }
  };

  return (
    <form className='flex flex-col' onSubmit={onSubmit}>
      <h2 className='text-5xl font-bold mb-12'>{t('Profile.personalDetails.title')}</h2>

      <div className={styles.items}>
        <label className='mb-8 flex'>
          <div className='w-1/4 font-bold'>
            {t('Profile.personalDetails.username')}
            <p className='font-bold text-red-500 text-sm'>
              {`* ${t('Profile.personalDetails.required')}`}
            </p>
          </div>
          <input
            className='w-2/4 px-4 py-2 bg-gray-100 shadow rounded-sm'
            type='text'
            placeholder='Username'
            value={user.name}
            onChange={() => {}}
          />
        </label>
        <label className='mb-8 flex'>
          <div className='w-1/4 font-bold'>{t('Profile.personalDetails.email')}</div>
          <input
            className='w-2/4 px-4 py-2 bg-gray-100 shadow rounded-sm'
            type='text'
            placeholder={t('Profile.personalDetails.email')}
            value={user.email}
            onChange={() => {}}
          />
        </label>
        <div className='mb-8 flex'>
          <div className='w-1/4 font-bold'>{t('Profile.personalDetails.password')}</div>
          <button
            type='button'
            className='hover:text-teal-400 text-secondary font-bold'
            onClick={onClick}
          >
            {t('Profile.personalDetails.setPassword')}
          </button>
        </div>

        <div className='mb-8 flex'>
          <div className='w-1/4 font-bold'>{t('Profile.personalDetails.language')}</div>
          <div className='flex items-center'>
            <label
              className={cn(
                styles['checkbox-styled'],
                language === 'en' && styles.checked,
                'cursor-pointer bg-transparent hover:bg-teal-300 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded',
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
            <p className='mx-3'>{t('LeaguesPage.createLeague.or')}</p>
            <label
              className={cn(
                styles['checkbox-styled'],
                language === 'ua' && styles.checked,
                'cursor-pointer bg-transparent hover:bg-teal-300 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded',
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
        </div>

        <button
          type='submit'
          className='mt-4 py-2 px-16 text-lg max-w-xs rounded shadow bg-primary text-secondary font-bold'
        >
          {t('submit')}
        </button>
      </div>
    </form>
  );
});

export default PersonalDetails;
