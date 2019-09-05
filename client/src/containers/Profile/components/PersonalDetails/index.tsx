import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { feedback } from 'react-feedbacker';
import moment from 'moment';
import 'moment/locale/uk';
import 'moment/locale/en-ie';
import validator from 'validator';

import { RootState } from 'store/types';

import Spinner from 'components/Spinner';
import { forgotPassword, setLanguage } from 'containers/Profile/actions';
import { addNotification } from 'components/Notifications/actions';
import * as imageService from 'services/imageService';
import Button from 'components/Button';
import { updateUser } from '../../actions';

import { generateImageSrc } from 'helpers/avatar';
import styles from './styles.module.scss';
import { Submit } from './Submit';

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

  const [initialUsername, initialEmail] = user ? [user.name, user.email] : ['', ''];
  const [intialImageId, initialImageLink] =
    user && user.image ? [user.image.id, user.image.link] : ['', ''];

  const [imageId, setImageId] = useState<string>(intialImageId);
  const [imageLink, setImageLink] = useState<string>(initialImageLink);
  const [isUploading, setIsUploading] = useState<true | false>(false);
  const [username, setUsername] = useState<string>(initialUsername);
  const [email, setEmail] = useState<string>(initialEmail);
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [toChangePassword, setToChangePassword] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (
      user &&
      (username !== user.name ||
        email !== user.email ||
        (user.image && imageId !== user.image.id))
    )
      setCanSubmit(true);
  }, [username, email, imageId]);

  if (!user) return <Spinner />;

  const usernameChanged = (name: string) => {
    setUsername(name);
    setIsUsernameValid(true);
  };

  const emailChanged = (email: string) => {
    setEmail(email);
    setIsEmailValid(true);
  };

  const validateUsername = () => {
    const isNameValid = validator.isByteLength(username, { min: 5, max: undefined });
    setIsUsernameValid(isNameValid);
    return isNameValid;
  };

  const validateEmail = () => {
    const isEmailValid = validator.isEmail(email);
    setIsEmailValid(isEmailValid);
    return isEmailValid;
  };

  const uploadImage = (file) => imageService.uploadImage(file);

  const handleUploadFile = async ({ target }) => {
    setIsUploading(true);
    try {
      const { id, link } = await uploadImage(target.files[0]);
      setImageId(id);
      setImageLink(link);
    } catch {
      feedback.error('Could not upload the file');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const valid = [validateEmail(), validateUsername()].every(Boolean);

    if (!valid) {
      return;
    }

    dispatch(updateUser(imageId, username, email));
  };

  const onPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setToChangePassword(true);
    dispatch(forgotPassword({ email: user.email }));
    // history.push('/profile/set/password');
  };

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

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  let validInputClass = 'w-full px-4 py-2 bg-gray-100 shadow rounded-sm';

  return (
    <form className='flex flex-col' onSubmit={onSubmit}>
      <h2 className='text-5xl font-bold mb-12'>{t('Profile.personalDetails.title')}</h2>

      <div className='flex justify-end'>
        <img
          style={{ height: 180, width: 180 }}
          className='rounded-full mb-2 '
          src={generateImageSrc(user, imageLink)}
          alt='avatar'
        />
      </div>

      <div className={styles.items}>
        <label className='mb-8 flex'>
          <div className='w-1/4 font-bold'>
            {t('Profile.personalDetails.username')}
            <p className='font-bold text-red-500 text-sm'>
              {`* ${t('Profile.personalDetails.required')}`}
            </p>
          </div>
          <div className='w-2/4'>
            <input
              className={
                isUsernameValid
                  ? validInputClass
                  : (validInputClass += ` ${styles.error}`)
              }
              type='text'
              placeholder='Username'
              value={username}
              onChange={onUsernameChange}
              onBlur={validateUsername}
              autoComplete='off'
            />
            {!isUsernameValid && (
              <p className='mt-1 text-red-500 text-xs italic text-justify'>
                {t('AuthForms.atLeastName')}
              </p>
            )}
          </div>
        </label>
        <label className='mb-8 flex'>
          <div className='w-1/4 font-bold'>{t('Profile.personalDetails.email')}</div>
          <div className='w-2/4'>
            <input
              className={
                isEmailValid ? validInputClass : validInputClass + ` ${styles.error}`
              }
              type='text'
              placeholder={t('Profile.personalDetails.email')}
              value={email}
              onChange={onEmailChange}
              onBlur={validateEmail}
              autoComplete='off'
            />
            {!isEmailValid && (
              <p className='mt-1 text-red-500 text-xs italic text-justify'>
                {t('AuthForms.invalidEmail')}
              </p>
            )}
          </div>
        </label>
        <div className='mb-8 flex'>
          <div className='w-1/4 font-bold'>{t('Profile.personalDetails.password')}</div>
          <button
            type='button'
            className='hover:text-teal-400 text-secondary font-bold'
            onClick={onPasswordClick}
          >
            {t('Profile.personalDetails.setPassword')}
          </button>
          {toChangePassword && (
            <p className='text-primary text-red-500 text-sm font-bold mx-4'>
              {t('ChangePasswordForms.success.forgot')}
            </p>
          )}
        </div>

        <div className='mb-8 flex'>
          <div className='w-1/4 font-bold'>{t('Profile.personalDetails.avatar')}</div>
          <Button
            loading={isUploading}
            disabled={isUploading}
            styling='primary'
            className='text-sm xl:text-base mr-4'
            type='label'
          >
            {t('Profile.personalDetails.changeAvatar')}
            <input
              name='image'
              accept='.jpg, .png, .jpeg'
              type='file'
              onChange={handleUploadFile}
              hidden
            />
          </Button>
        </div>

        <div className='mb-8 flex'>
          <div className='w-1/4 font-bold'>{t('Profile.personalDetails.language')}</div>
          <div className='flex items-center'>
            <label
              className={cn(
                styles['checkbox-styled'],
                language === 'en' && styles.checked,
                'cursor-pointer',
                'bg-transparent',
                'hover:bg-teal-300',
                'text-secondary',
                'hover:text-white',
                'py-2',
                'px-6',
                'border-2',
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
            <p className='mx-3'>{t('LeaguesPage.createLeague.or')}</p>
            <label
              className={cn(
                styles['checkbox-styled'],
                language === 'ua' && styles.checked,
                'cursor-pointer',
                'bg-transparent',
                'hover:bg-teal-300',
                'text-secondary',
                'hover:text-white',
                'py-2',
                'px-6',
                'border-2',
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
        </div>

        <Submit
          className='mt-4 py-2 px-16 text-lg max-w-xs rounded shadow bg-primary text-secondary font-bold'
          disabled={!canSubmit}
        >
          {t('submit')}
        </Submit>
      </div>
    </form>
  );
});

export default PersonalDetails;
