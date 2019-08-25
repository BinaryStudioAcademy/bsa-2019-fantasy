import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Toggle } from 'react-toggle-component';
import { RootState } from 'store/types';

import Button from 'components/Button';
import { updateEmailPreferences } from 'containers/Profile/actions';
import Spinner from 'components/Spinner';

const EmailPreferences = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.profile.user);

  useEffect(() => {
    if (user && user.sendmail_time) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [dispatch, user]);

  if (!user) return <Spinner />;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timeSelect = document.getElementById('time-select') as HTMLSelectElement;
    //getting time value from select options
    let selectedValue = timeSelect
      ? Number(timeSelect.options[timeSelect.selectedIndex].value.split(' ').shift())
      : null;

    dispatch(updateEmailPreferences(selectedValue));
  };

  const renderTimeSelection = () => {
    return (
      <div className='mt-20 w-full '>
        <label
          className='block mb-5 uppercase tracking-wide text-gray-700 text-base font-bold'
          htmlFor='time-select'
        >
          {t('Profile.emailPreferences.timeSelect')}
        </label>
        <div className='relative'>
          <select
            className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='time-select'
          >
            <option>24 {t('Profile.emailPreferences.hours')}</option>
            <option>12 {t('Profile.emailPreferences.hours')}</option>
            <option>6 {t('Profile.emailPreferences.hours')}</option>
            <option>1 {t('Profile.emailPreferences.hour')}</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg
              className='fill-current h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='mb-12 text-5xl font-bold'>{t('Profile.emailPreferences.title')}</h2>

      {/*toggle*/}
      <div className='flex justify-start align-center'>
        <Toggle
          name='email-toggle'
          height='2rem'
          width='4rem'
          knobWidth='1.7rem'
          knobHeight='1.7rem'
          leftKnobColor='rgba(18, 39, 55, 0.7)'
          rightKnobColor='#1EE3CF'
          checked={user.sendmail_time ? true : false}
          onToggle={(e) => setChecked(!checked)}
        />
        <label
          className='ml-2 mt-1 block uppercase tracking-wide text-gray-700 text-base font-bold '
          htmlFor='email-toggle'
        >
          {t('Profile.emailPreferences.email-select')}
        </label>
      </div>

      <div className='w-full flex flex-col justify-center items-center'>
        {/*time selection*/}
        {checked ? <div className='w-5/12'>{renderTimeSelection()}</div> : null}
        <Button className='mt-10 w-5/12' type={'button'} styling={'primary'}>
          {t('submit')}
        </Button>
      </div>
    </form>
  );
};

export default EmailPreferences;
