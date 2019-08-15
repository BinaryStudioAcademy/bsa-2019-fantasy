import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import validator from 'validator';
import { times } from 'lodash';
import { FaStar } from 'react-icons/fa';

import { createLeagueAction } from '../actions';
import { RootState } from 'store/types';

type Props = {
  isLoading: boolean;
  error: string | null;
  success: string | null;
  createLeagueAction: typeof createLeagueAction;
};

const CreateLeague = ({ isLoading, error, success, createLeagueAction }: Props) => {
  const [name, setName] = useState('');
  const [gameweek, setGameweek] = useState('Gameweek 1');
  const [isNameValid, setValidation] = useState(true);

  const handleChange = (name: string) => {
    setName(name);
    setValidation(true);
  };

  const validateName = () => {
    const isNameValid = validator.isLength(name, { min: 1, max: 30 });
    setValidation(isNameValid);
    return isNameValid;
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    validateName();

    createLeagueAction({ name });
  };

  return (
    <div className='create-league'>
      <div className='container'>
        <div className='jumbotron paper mb-12 rounded'>
          <div className='jumbotron-content mt-12'>
            <h2 className='title text-secondary'>
              <div className='sub title mb-4 flex items-center'>
                <FaStar />
                Create a League
              </div>
              Create a new classic league
            </h2>
          </div>
        </div>
        <div className='paper'>
          <form className='w-full max-w-lg' onSubmit={handleSubmit}>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase text-gray-700 text-xs font-bold mb-2'
                  htmlFor='league-name'
                >
                  Name
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
                  Maximum 30 characters
                </p>
              </div>
            </div>
            <div className='w-full mb-6'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='league-gameweek'
              >
                Scoring starts
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
              className={`w-40 shadow bg-primary hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${(!name ||
                !isNameValid) &&
                'opacity-50 cursor-not-allowed'}`}
              type='submit'
              disabled={!name || !isNameValid || isLoading}
            >
              {isLoading ? 'Wait' : 'Create league'}
            </button>
            {!isNameValid && (
              <span className='ml-2 font-bold text-red-600'>
                Maximum length exceeded!
              </span>
            )}
            {success && <span className='ml-2 font-bold text-teal-600'>{success}</span>}
            {error && <span className=' ml-2 font-bold text-red-600'>{error}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  isLoading: rootState.league.isLoading,
  error: rootState.league.error,
  success: rootState.league.success,
});

const actions = { createLeagueAction };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateLeague);
