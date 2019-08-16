import React, { useState } from 'react';

const PublicLeagues = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <div className='join-league-item w-full md:w-1/2 px-6'>
      <h3 className='title text-secondary mb-4 font-bold'>Public leagues</h3>
      <p className='mb-2'>
        Public leagues allow you to compete against 20 game players in a classic league.
        You can join up to 3 public leagues.
      </p>
      <p className='font-bold mb-8'>
        Note, you can&apos;t remove your team from a public league after the league has
        started, once the challenge is on there&apos;s no quitting.
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
          Join public league
        </button>
      </form>
    </div>
  );
};

export default PublicLeagues;
