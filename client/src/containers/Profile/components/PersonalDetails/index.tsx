import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { forgotPassword } from 'containers/Profile/actions';
import styles from './styles.module.scss';
// TODO: fix any type
const PersonalDetails = (props: any) => {
  const [changePasswordRedirect, setRedirect] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Updating personal details:');
  };

  const onClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      // TODO: pass real email
      await props.forgotPassword({ email: 'demo@demo.com' });
      setRedirect(true);
    } catch {
      console.log('Something went wrong');
    }
  };

  console.log(props);

  return (
    <form className='flex flex-col' onSubmit={onSubmit}>
      {changePasswordRedirect ? (
        <Redirect
          to={{
            pathname: '/profile/set/page',
          }}
        />
      ) : null}
      <h2 className='text-5xl font-bold mb-12'>Personal details</h2>

      <div className={styles.items}>
        <label className='mb-8 flex'>
          <div className='w-1/4 font-bold'>
            First Name
            <p className='font-bold text-red-500 text-sm'>*required</p>
          </div>
          <input
            className='w-2/4 px-4 py-2 bg-gray-100 shadow rounded-sm'
            type='text'
            placeholder='First Name'
          />
        </label>
        <label className='mb-8 flex'>
          <div className='w-1/4 font-bold'>
            Last Name
            <p className='font-bold text-red-500 text-sm'>*required</p>
          </div>
          <input
            className='w-2/4 px-4 py-2 bg-gray-100 shadow rounded-sm'
            type='text'
            placeholder='Last Name'
          />
        </label>
        <label className='mb-8 flex'>
          <div className='w-1/4 font-bold'>Email</div>
          <input
            className='w-2/4 px-4 py-2 bg-gray-100 shadow rounded-sm'
            type='text'
            placeholder='Email'
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
        <div className='mb-8 flex'>
          <div className='w-1/4 font-bold'>
            Gender
            <p className='font-bold text-red-500 text-sm'>*required</p>
          </div>
          <div className='flex'>
            <label className='m-2'>
              <input className='inline' type='radio' name='gender' /> Male
            </label>
            <label className='m-2'>
              <input className='inline' type='radio' name='gender' /> Female
            </label>
            <label className='m-2'>
              <input className='inline' type='radio' name='gender' defaultChecked />{' '}
              Unspecified
            </label>
          </div>
        </div>
        <label className='mb-8 flex'>
          <div className='w-1/4 font-bold'>
            Residence Country
            <p className='font-bold text-red-500 text-sm'>*required</p>
          </div>
          <input
            className='w-2/4 px-4 py-2 bg-gray-100 shadow rounded-sm'
            type='text'
            placeholder='Residence Country'
            onChange={() => {}}
            value='Ukraine'
          />
        </label>
        <button
          type='submit'
          className='mt-4 py-2 px-16 text-lg max-w-xs rounded shadow bg-primary text-secondary font-bold'
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const actions = { forgotPassword };
//TODO: fix any type
const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(PersonalDetails);
