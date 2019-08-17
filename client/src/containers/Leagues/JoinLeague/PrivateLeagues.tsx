import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { joinPrivateLeague } from '../actions';

type Props = {
  joinPrivateLeague: typeof joinPrivateLeague;
};

const PrivateLeagues = ({ joinPrivateLeague }: Props) => {
  const [code, setCode] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    joinPrivateLeague({ code });
  };

  return (
    <div className='join-league-item w-full md:w-1/2 px-6'>
      <h3 className='title text-secondary mb-4 font-bold'>Private leagues</h3>
      <p className='mb-4'>
        Join a private league if somebody has given you a league code to enter.
      </p>
      <form className='w-full max-w-lg' onSubmit={handleSubmit}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase text-gray-700 text-xs font-bold mb-2'
              htmlFor='league-code'
            >
              League Code
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='league-code'
              type='text'
              name='code'
              onChange={(ev) => setCode(ev.target.value)}
              value={code}
            />
          </div>
        </div>
        <button
          className={`shadow bg-primary hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${!code &&
            'opacity-50 cursor-not-allowed'}`}
          type='submit'
          disabled={!code}
        >
          Join private league
        </button>
      </form>
    </div>
  );
};

const actions = { joinPrivateLeague };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(PrivateLeagues);
