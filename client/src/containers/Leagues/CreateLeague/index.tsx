import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { bindActionCreators, Dispatch } from 'redux';
import validator from 'validator';
import { times } from 'lodash';
import { FaStar } from 'react-icons/fa';

import { createLeagueAction } from '../actions';

import styles from './styles.module.scss';
import header from 'styles/header.module.scss';

type Props = {
  createLeagueAction: typeof createLeagueAction;
};

const CreateLeague = ({ createLeagueAction }: Props) => {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [gameweek, setGameweek] = useState('Gameweek 1');
  const [isNameValid, setValidation] = useState(true);
  const [privacy, setPrivacy] = useState('public');

  const handleChange = (name: string) => {
    setName(name);
    setValidation(true);
  };

  const validateName = () => {
    const isNameValid = validator.isLength(name, { min: 1, max: 30 });
    setValidation(isNameValid);
    return isNameValid;
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const valid = validateName();
    if (!valid || isLoading) {
      return;
    }

    const isPrivate = privacy === 'private';
    setLoading(true);

    try {
      await createLeagueAction({
        name,
        private: isPrivate,
        start_from: Number(gameweek.split(' ')[1]),
      });
    } catch {
      console.log('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const changePrivacy = (value, privacy) => {
    if (value) {
      setPrivacy(privacy);
    }
  };

  return (
    <div className={styles['create-league']}>
      <div className='container'>
        <div className={`${header.jumbotron} ${header.paper} mb-12 rounded`}>
          <div className={`${header['jumbotron-content']} mt-12`}>
            <h2 className={`${header.title} text-secondary`}>
              <div className={`${header.sub} ${header.title} mb-4 flex items-center`}>
                <FaStar />
                {t('LeaguesPage.createLeague.title.sub')}
              </div>
              {t('LeaguesPage.createLeague.title.main')}
            </h2>
          </div>
        </div>
        <div className={header.paper}>
          <form className='w-full max-w-lg' onSubmit={handleSubmit}>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase text-gray-700 text-xs font-bold mb-2'
                  htmlFor='league-name'
                >
                  {t('LeaguesPage.createLeague.name')}
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                    !isNameValid ? 'border-red-500' : ''
                  }`}
                  id='league-name'
                  type='text'
                  name='name'
                  onChange={(ev) => handleChange(ev.target.value)}
                />
                <p
                  className={`text-gray-600 text-xs italic ${
                    !isNameValid ? 'text-red-500' : ''
                  }`}
                >
                  {t('LeaguesPage.createLeague.nameMax')}
                </p>
              </div>
            </div>
            <div className='w-full mb-6'>
              <p className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                {t('LeaguesPage.createLeague.privacy.title')}
              </p>
              <div className='flex items-center'>
                <label
                  className={`${
                    styles['checkbox-styled']
                  } g-transparent hover:bg-teal-300 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded ${
                    privacy === 'public' ? `${styles.checked}` : ''
                  }`}
                >
                  <input
                    type='checkbox'
                    name='public'
                    value='public'
                    checked={privacy === 'public'}
                    onChange={(ev) => changePrivacy(ev.target.checked, 'public')}
                  />
                  <span>{t('LeaguesPage.createLeague.privacy.public')}</span>
                </label>
                <p className='mx-3'>{t('LeaguesPage.createLeague.or')}</p>
                <label
                  className={`${
                    styles['checkbox-styled']
                  } g-transparent hover:bg-teal-300 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded ${
                    privacy === 'private' ? `${styles.checked}` : ''
                  }`}
                >
                  <input
                    type='checkbox'
                    name='private'
                    value='private'
                    checked={privacy === 'private'}
                    onChange={(ev) => changePrivacy(ev.target.checked, 'private')}
                  />
                  <span>{t('LeaguesPage.createLeague.privacy.private')}</span>
                </label>
              </div>
            </div>
            <div className='w-full mb-6'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='league-gameweek'
              >
                {t('LeaguesPage.createLeague.scoring')}
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='league-gameweek'
                  name='gameweek'
                  onChange={(ev) => setGameweek(ev.target.value)}
                  onBlur={(ev) => setGameweek(ev.target.value)}
                  value={gameweek}
                >
                  {times(38, (item) => (
                    <option key={item}>{`Gameweek ${item + 1}`}</option>
                  ))}
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg
                    className='fill-current h-4 w-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>
            </div>
            <button
              className={`w-40 shadow bg-primary hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${
                !name || !isNameValid || isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type='submit'
              disabled={!name || !isNameValid || isLoading}
            >
              {isLoading ? t('wait') : t('LeaguesPage.createLeague.create')}
            </button>
            {!isNameValid && (
              <span className='ml-2 font-bold text-red-600'>
                {t('LeaguesPage.createLeague.error')}
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const actions = { createLeagueAction };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(CreateLeague);
