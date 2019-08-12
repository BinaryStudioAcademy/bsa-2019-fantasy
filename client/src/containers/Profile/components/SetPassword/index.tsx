import React from 'react';
import { withRouter } from 'react-router-dom';

import './styles.scss';

const SetPassword = (props: any) => {
  const goBack = () => {
    props.history.goBack();
  };

  return (
    <div className='set-password'>
      <div className='jumbotron paper mb-12 rounded flex items-end justify-between pt-6'>
        <div className='jumbotron-content mt-12'>
          <h2 className='title mb-12 text-secondary'>
            <div className='sub title mb-4 flex items-center'>Сhanging password</div>
            Set a password
          </h2>
        </div>
      </div>
      <div className='paper rounded'>
        <p className='mb-6'>
          An email will be sent shortly with instructions and a unique link that will
          allow you to set your password.
        </p>
        <button
          className='bg-primary uppercase font-semibold hover:bg-teal-400 text-secondary hover:text-white py-2 px-8 border-2 border-teal-300 rounded mr-6'
          onClick={goBack}
        >
          Back to profile update
        </button>
      </div>
    </div>
  );
};

export default withRouter(SetPassword);
