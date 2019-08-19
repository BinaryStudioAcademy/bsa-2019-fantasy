import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Autosuggest from 'react-autosuggest';

import { searchPublicLeagues, joinLeague } from '../actions';
import { RootState } from 'store/types';

import styles from './styles.module.scss';

type Props = {
  searchPublicLeagues: typeof searchPublicLeagues;
  joinLeague: typeof joinLeague;
  suggestions: any;
};

const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;
const getSuggestionValue = (suggestion) => suggestion.name;

const PublicLeagues = ({ searchPublicLeagues, suggestions, joinLeague }: Props) => {
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

  return (
    <div className={`${styles['join-league-item']} w-full md:w-1/2 px-6`}>
      <h3 className={`${styles.title} text-secondary mb-4 font-bold`}>
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
            !value || isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type='submit'
          disabled={!value || isLoading}
        >
          {isLoading ? t('LeaguesPage.wait') : t('LeaguesPage.joinLeague.public.join')}
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  suggestions: rootState.league.suggestions,
});

const actions = { searchPublicLeagues, joinLeague };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublicLeagues);
