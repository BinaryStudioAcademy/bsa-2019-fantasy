import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import cn from 'classnames';

import Autosuggest from 'react-autosuggest';

import { searchPublicLeagues, joinLeague, resetLeaguesData } from '../actions';
import { RootState } from 'store/types';

import styles from './styles.module.scss';
import { withRouter } from 'react-router';
import { addNotification } from 'components/Notifications/actions';

type Props = {
  searchPublicLeagues: typeof searchPublicLeagues;
  joinLeague: typeof joinLeague;
  resetLeaguesData: typeof resetLeaguesData;
  addNotification: typeof addNotification;
  suggestions: any;
  leagues: any;
  history: any;
  success: null | string;
};

const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;
const getSuggestionValue = (suggestion) => suggestion.name;

const PublicLeagues = ({
  searchPublicLeagues,
  suggestions,
  resetLeaguesData,
  joinLeague,
  addNotification,
  leagues,
  history,
  success,
}: Props) => {
  const { t } = useTranslation();

  const [value, setValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    searchPublicLeagues({ filter: inputValue });
  };

  const onSuggestionsClearRequested = () => {
    suggestions = [];
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }

    setLoading(true);

    /* eslint-disable */
    try {
      await joinLeague({ code: value, private: false });
      addNotification(t('Notifications.messages.joinPublicLeague'));
    } catch {
      console.log('Something went wrong!');
    } finally {
      setLoading(false);
    }
    /* eslint-enable */
  };

  const inputProps = {
    value,
    onChange: handleInputChange,
  };

  if (success) {
    resetLeaguesData();
    history.push('/leagues');
  }

  return (
    <div className={cn(styles['join-league-item'], 'w-full', 'md:w-1/2', 'px-6')}>
      <h3 className={cn(styles.title, 'text-secondary', 'mb-4', 'font-bold')}>
        {t('LeaguesPage.joinLeague.public.title')}
      </h3>
      <p className='mb-2'>{t('LeaguesPage.joinLeague.public.message')}</p>
      <p className='font-bold mb-8'>{t('LeaguesPage.joinLeague.public.note')}</p>

      <form className='w-full max-w-lg' onSubmit={handleSubmit}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3'>
            <label
              htmlFor='public-league-name'
              className='block uppercase text-gray-700 text-xs font-bold mb-2'
            >
              {t('LeaguesPage.joinLeague.public.name')}
            </label>
            <Autosuggest
              suggestions={suggestions.slice(0, 4)}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              id='public-league-name'
            />
          </div>
        </div>
        <button
          className={`w-48 shadow bg-primary hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${
            !value || isLoading || leagues.public.length >= 3
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          type='submit'
          disabled={!value || isLoading || leagues.public.length >= 3}
        >
          {isLoading ? t('wait') : t('LeaguesPage.joinLeague.public.join')}
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  suggestions: rootState.league.suggestions,
  leagues: rootState.league.leagues,
  success: rootState.league.success,
});

const actions = { searchPublicLeagues, joinLeague, resetLeaguesData, addNotification };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default withRouter(
  // @ts-ignore
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PublicLeagues),
);
