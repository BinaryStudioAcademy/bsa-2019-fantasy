import React from 'react';
import { withRouter } from 'react-router-dom';

import styles from './styles.module.scss';

const SocialForm = withRouter(({ history }) => {
  return (
    <div className={`${styles['form-registration']} w-full h-full max-w-xs`}>
      <div className='flex flex-col px-8 pt-6 pb-8'>
        <button
          type='button'
          className='font-bold rounded py-1 px-6 mb-2 opacity-50 hover:opacity-100 border border-primary bg-transparent shadow uppercase'
          onClick={() => history.push('/connect-fb')}
        >
          Connect Existing Account
        </button>
        <button
          type='submit'
          className='font-bold rounded py-1 px-6 border border-transparent text-secondary bg-primary shadow uppercase'
        >
          Register New Account
        </button>
        {/* After a user clicks Register New Account, the system opens the Creating a new account form, 
        retrieves data from Facebook and fills in the form with retrieved data. */}
      </div>
    </div>
  );
});

export default SocialForm;
