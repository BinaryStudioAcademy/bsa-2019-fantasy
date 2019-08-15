import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';

import { registration } from 'containers/Profile/actions';

import './styles.scss';

const RegistrationForm = withRouter(({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      dispatch(registration({ name, email, password }));
    }
  };

  return (
    <div className='w-full max-w-xs form-registration'>
      <form className='px-8 pt-6 pb-8' onSubmit={handleSignup}>
        <div className='mb-4'>
          <label>
            Name
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
              id='first-name'
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className='mb-2'>
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
            <p className='mt-1 text-xs italic text-justify'>
              We will send you a confirmation email
            </p>
          </label>
        </div>
        <div className='mb-6'>
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
            <p className='mt-1 text-xs italic text-justify'>At least 8 characters</p>
          </label>
        </div>
        <div className='flex items-center justify-start'>
          <button
            type='submit'
            className='font-bold rounded py-1 px-6 mr-2 border border-transparent text-secondary bg-primary shadow uppercase'
          >
            Sign up
          </button>
          <button
            type='button'
            className='opacity-50 hover:opacity-100 font-bold rounded py-1 px-6 border border-primary bg-transparent shadow uppercase'
            onClick={() => history.push('/login')}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
});

export default RegistrationForm;
