import React, { useEffect } from 'react';

import LoginForm from 'components/AuthForms/LoginForm';

import '../styles.scss';
import './responsive.scss';

const LoginPage = () => {
  useEffect(() => {
    document.title = 'Sign In | Fantasy Football League';
  }, []);

  return (
    <div className='flex w-full h-full md:flex-row-reverse flex-wrap login-container'>
      <div className='layer' />
      <div className='w-full h-full flex-col items-center justify-center md:w-3/4 '>
        <div className='lable-wrapper'>
          <h1 className='main-lable w-full'>Log in to play</h1>
          <h1 className='main-lable w-full'>Fantasy Premier League</h1>
        </div>
      </div>
      <div className='w-full h-full md:w-1/4 login-form p-6'>
        <div className='lables pl-8 mt-48 mb-6'>
          <h2 className='side-lable'>Hey, dude!</h2>
          <h3 className='side-lable side-lable-small '>
            Welcome back! Please, login to your account
          </h3>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
