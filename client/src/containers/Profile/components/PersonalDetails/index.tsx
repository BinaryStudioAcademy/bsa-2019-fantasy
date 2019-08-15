import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/types';

import Spinner from 'components/Spinner';
import { forgotPassword } from 'containers/Profile/actions';

import styles from './styles.module.scss';

const usePersonalDetails = () => {
  const user = useSelector((state: RootState) => state.profile.user);

  return { user };
};

const PersonalDetails = withRouter(({ history }) => {
  const dispatch = useDispatch();

  const { user } = usePersonalDetails();
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

  return (
    <form className='flex flex-col' onSubmit={onSubmit}>
      <h2 className='text-5xl font-bold mb-12'>Personal details</h2>

      <div className={styles.items}>
        <label className='mb-8 flex'>
          <div className='w-1/4 font-bold'>
            Username
            <p className='font-bold text-red-500 text-sm'>*required</p>
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
          <div className='w-1/4 font-bold'>Email</div>
          <input
            className='w-2/4 px-4 py-2 bg-gray-100 shadow rounded-sm'
            type='text'
            placeholder='Email'
            value={user.email}
            onChange={() => {}}
          />
        </label>
        <div className='mb-8 flex'>
          <div className='w-1/4 font-bold'>Password</div>
          <button
            type='button'
            className='hover:text-teal-400 text-secondary font-bold'
            onClick={onClick}
          >
            Set a password
          </button>
        </div>

        <button
          type='submit'
          className='mt-4 py-2 px-16 text-lg max-w-xs rounded shadow bg-primary text-secondary font-bold'
        >
          Submit
        </button>
      </div>
    </form>
  );
});

export default PersonalDetails;
