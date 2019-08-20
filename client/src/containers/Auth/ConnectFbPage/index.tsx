import React, { useEffect } from 'react';

import ConnectFacebookForm from 'components/AuthForms/ConnectFbForm';

import '../styles.scss';
import './responsive.scss';

const ConnectFbPage = () => {
  useEffect(() => {
    document.title = 'Connect Facebook | Fantasy Football League';
  }, []);

  return (
    <div className='flex w-full md:flex-row-reverse flex-wrap login-container'>
      <div className='layer' />
      <div className='w-full h-full flex-col items-center justify-center md:w-3/4 '>
        <div className='lable-wrapper'>
          <h1 className='main-lable w-full'>Social network account</h1>
          <h1 className='main-lable w-full'>Fantasy Premier League</h1>
        </div>
      </div>
      <div className='w-full h-full md:w-1/4 form-container p-6'>
        <div className='lables pl-8 mt-40 mb-6'>
          <h2 className='side-lable'>New social network account</h2>
          <h3 className='side-lable side-lable-small '>
            You&apos;ve chosen to connect your facebook account with an existing premier
            league account
          </h3>
        </div>
        <ConnectFacebookForm />
      </div>
    </div>
  );
};

export default ConnectFbPage;
