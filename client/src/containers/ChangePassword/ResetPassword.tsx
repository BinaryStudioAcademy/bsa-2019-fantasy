import React from 'react';

import { FaStar } from 'react-icons/fa';

import ResetPasswordForm from 'components/ChangePasswordForms/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <div className='reset-password'>
      <div className='container'>
        <div className='jumbotron paper mb-12 rounded'>
          <div className='jumbotron-content mt-12'>
            <h2 className='title text-secondary'>
              <div className='sub title mb-4 flex items-center'>
                <FaStar />
                Changing password
              </div>
              Create a new password
            </h2>
          </div>
        </div>
      </div>
      <div className='paper'>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
