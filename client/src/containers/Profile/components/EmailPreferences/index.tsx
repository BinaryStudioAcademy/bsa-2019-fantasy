import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { feedback } from 'react-feedbacker';

import { Toggle } from 'react-toggle-component';
import Button from 'components/Button';

const EmailPreferences = () => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState<boolean>(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    {
      feedback.success('Your email preferences have been saved');
    }
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
          checked={checked}
          onToggle={(e) => setChecked(!checked)}
        />
        <label
          className='ml-2 mt-1 block uppercase tracking-wide text-gray-700 text-base font-bold '
          htmlFor='email-toggle'
        >
          {t('Profile.emailPreferences.email-select')}
        </label>
      </div>

      {/*time selection*/}
      {checked ? (
        <div className='w-full flex flex-col items-center justify-center '>
          <div className='w-2/5'>
            {renderTimeSelection()}
            <Button className='mt-10 w-full' type={'button'} styling={'primary'}>
              {t('submit')}
            </Button>
          </div>
        </div>
      ) : null}
    </form>
  );
};

export default EmailPreferences;
