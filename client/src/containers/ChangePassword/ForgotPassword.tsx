import React from 'react';

import ForgotPasswordForm from 'components/ChangePasswordForms/ForgotPasswordForm';
 
const ForgotPassword = () => {
  return (
    <div className='flex w-full h-full md:flex-row-reverse flex-wrap login-container'>
      <div className='layer' />
      <div className='w-full h-full flex-col items-center justify-center md:w-3/4 '>
        <div className='lable-wrapper'>
          <h1 className='main-lable w-full '>Forgot your password?</h1>
        </div>
      </div>
      <div className='w-full h-full md:w-1/4 login-form p-6'>
        <div className='lables pl-10 mt-48 mb-6'>
          <h2 className='side-lable'>Changing password</h2>
          <h3 className='side-lable side-lable-small'>
            Please type your e-mail below. We&apos;ll send you a letter with further
            instructions
          </h3>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
