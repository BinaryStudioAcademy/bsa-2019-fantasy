import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { login } from 'containers/Profile/actions';

import './styles.scss';

const LoginForm = withRouter(({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <div className='w-full h-full max-w-xs form-registration'>
      <form onSubmit={handleLogin} className=' px-8 pt-6 pb-8 '>
        <div className='mb-4'>
          <label>
            Email
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className='mb-4'>
          <label>
            Password
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='*************'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className='flex items-center justify-start'>
          <button
            type='submit'
            className='font-bold rounded py-1 px-6 mr-2 border border-transparent text-secondary bg-primary shadow uppercase'
          >
            Confirm
          </button>
          <button
            type='button'
            className='opacity-50 hover:opacity-100 font-bold rounded py-1 px-6 border border-primary bg-transparent shadow uppercase'
            onClick={() => history.push('/social')}
          >
            Go back
          </button>
        </div>
      </form>
    </div>
  );
});

export default LoginForm;
