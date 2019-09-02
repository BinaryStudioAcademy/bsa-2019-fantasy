import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RootState } from 'store/types';
import { Toggle } from 'react-toggle-component';

import Spinner from 'components/Spinner';
import Button from 'components/Button';

import { updateEmailPreferences } from 'containers/Profile/actions';
import { getClubLogoUrl } from 'helpers/images';

const NotificationCenter = withRouter(({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [clubEmail, setClubEmail] = useState<boolean>(false);
  const [clubAppNotifications, setClubAppNotifications] = useState<boolean>(false);
  const [teamEmail, setTeamEmail] = useState<boolean>(false);
  const [teamAppNotifications, setTeamAppNotifications] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.profile.user);
  const { clubs, loading } = useSelector((state: RootState) => state.clubs);

  // useEffect(() => {
  //   if (user && user.sendmail_time) {
  //     setChecked(true);
  //   } else {
  //     setChecked(false);
  //   }
  // }, [dispatch, user]);

  if (!user || loading) return <Spinner />;
  const userFavClub = clubs.find((c) => c.id === user.favorite_club_id);

  const renderFavClubNotificationSettings = (favouriteClub) => {
    return (
      <div className='flex mt-2 justify-end align-center'>
        {/* club info */}
        <div className='w-1/3'>
          <div className='flex flex-col align-center mt-1'>
            <span className='font-bold text-gray-700 text-base'>
              {t('Profile.notificationCenter.favouriteClub')}
            </span>

            <a
              href='/profile/favorite-club'
              className='font-bold mb-2 text-base text-teal-400 cursor-pointer'
            >
              {t('change')}
            </a>
          </div>
          <img
            className='rounded w-20'
            src={getClubLogoUrl(favouriteClub.code, 200)}
            alt={`Club ${favouriteClub.name}`}
          />
          <span className='block w-20 mt-2 text-sm text-center leading-none text-gray-700 font-bold'>
            {favouriteClub.name}
          </span>
        </div>

        {/* preferences selection */}
        <div className='w-1/3 flex flex-col justify-center align-center'>
          <Toggle
            name='club-email-toggle'
            height='2rem'
            width='4rem'
            knobWidth='1.7rem'
            knobHeight='1.7rem'
            leftKnobColor='rgba(18, 39, 55, 0.7)'
            rightKnobColor='#1EE3CF'
            checked={user.sendmail_time ? true : false}
            onToggle={(e) => setClubEmail(!clubEmail)}
          />
        </div>
        <div className='w-1/3 flex flex-col justify-center align-center'>
          <Toggle
            name='club-notification-toggle'
            height='2rem'
            width='4rem'
            knobWidth='1.7rem'
            knobHeight='1.7rem'
            leftKnobColor='rgba(18, 39, 55, 0.7)'
            rightKnobColor='#1EE3CF'
            checked={user.sendmail_time ? true : false}
            onToggle={(e) => setClubAppNotifications(!clubAppNotifications)}
          />
        </div>
      </div>
    );
  };

  const renderApplyTeamNotificationSettings = () => {
    return (
      <div className='flex mt-2 justify-end align-center'>
        {/* preferences selection */}
        <div className='w-1/3 flex flex-col justify-center align-center'>
          <Toggle
            name='team-email-toggle'
            height='2rem'
            width='4rem'
            knobWidth='1.7rem'
            knobHeight='1.7rem'
            leftKnobColor='rgba(18, 39, 55, 0.7)'
            rightKnobColor='#1EE3CF'
            checked={user.sendmail_time ? true : false}
            onToggle={(e) => setTeamEmail(!teamEmail)}
          />
        </div>
        <div className='w-1/3 flex flex-col justify-center align-center'>
          <Toggle
            name='team-notification-toggle'
            height='2rem'
            width='4rem'
            knobWidth='1.7rem'
            knobHeight='1.7rem'
            leftKnobColor='rgba(18, 39, 55, 0.7)'
            rightKnobColor='#1EE3CF'
            checked={user.sendmail_time ? true : false}
            onToggle={(e) => setTeamAppNotifications(!teamAppNotifications)}
          />
        </div>
      </div>
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timeSelect = document.getElementById('time-select') as HTMLSelectElement;
    //getting time value from select options
    let selectedValue = timeSelect
      ? Number(timeSelect.options[timeSelect.selectedIndex].value.split(' ').shift())
      : null;

    dispatch(updateEmailPreferences(selectedValue));
  };

  // const renderTimeSelection = () => {
  //   return (
  //     <div className='w-full'>
  //       <label
  //         className='block mb-5 uppercase tracking-wide text-gray-700 text-xs font-bold'
  //         htmlFor='time-select'
  //       >
  //         {t('Profile.notificationCenter.timeSelect')}
  //       </label>
  //       <div className='relative'>
  //         <select
  //           className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
  //           id='time-select'
  //         >
  //           <option>24 {t('Profile.notificationCenter.hours')}</option>
  //           <option>12 {t('Profile.notificationCenter.hours')}</option>
  //           <option>6 {t('Profile.notificationCenter.hours')}</option>
  //           <option>1 {t('Profile.notificationCenter.hour')}</option>
  //         </select>
  //         <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
  //           <svg
  //             className='fill-current h-4 w-4'
  //             xmlns='http://www.w3.org/2000/svg'
  //             viewBox='0 0 20 20'
  //           >
  //             <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
  //           </svg>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const renderNotificationTypeSelection = () => {
  //   return (
  //     <div className='w-full'>
  //       <label
  //         className='block mb-5 uppercase tracking-wide text-gray-700 text-xs font-bold'
  //         htmlFor='time-select'
  //       >
  //         {t('Profile.notificationCenter.timeSelect')}
  //       </label>
  //       <div className='relative'>
  //         <select
  //           className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
  //           id='time-select'
  //         >
  //           <option>24 {t('Profile.notificationCenter.hours')}</option>
  //           <option>12 {t('Profile.notificationCenter.hours')}</option>
  //           <option>6 {t('Profile.notificationCenter.hours')}</option>
  //           <option>1 {t('Profile.notificationCenter.hour')}</option>
  //         </select>
  //         <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
  //           <svg
  //             className='fill-current h-4 w-4'
  //             xmlns='http://www.w3.org/2000/svg'
  //             viewBox='0 0 20 20'
  //           >
  //             <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
  //           </svg>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <form onSubmit={onSubmit}>
      <h2 className='mb-12 text-5xl text-gray-700 font-bold'>
        {t('Profile.notificationCenter.title')}
      </h2>

      {/* Favorite club notifications preferences */}
      <div className='w-full'>
        <h3 className='text-2xl text-gray-700 font-bold'>
          {t('Profile.notificationCenter.clubTitle')}
        </h3>
        <h4 className=' text-lg text-gray-500 font-light'>
          {t('Profile.notificationCenter.clubSubtitle')}
        </h4>
        {/* headers */}
        <div className='flex mt-2 justify-end align-center'>
          <p className='w-1/3 font-bold text-gray-700 text-base'>Receive an email</p>
          <p className='w-1/3 font-bold text-gray-700 text-base'>
            Receive an app-notification
          </p>
        </div>
        {/* Favourite club email preferences */}
        {userFavClub && renderFavClubNotificationSettings(userFavClub)}
        <h3 className='mt-6 text-2xl text-gray-700 font-bold'>
          {t('Profile.notificationCenter.clubTitle')}
        </h3>
        <h4 className=' text-lg text-gray-500 font-light'>
          {t('Profile.notificationCenter.clubSubtitle')}
        </h4>
        <div className='mt-16'>{renderApplyTeamNotificationSettings()}</div>
        {/* <Toggle
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
          className='ml-2 mt-1 w-6/12 block uppercase tracking-wide text-gray-700 text-base font-bold '
          htmlFor='email-toggle'
        >
          {t('Profile.emailPreferences.email-select')}
        </label> */}
        {/*time selection*/}
        {/* {checked ? <div className='w-4/12'>{renderTimeSelection()}</div> : null} */}
      </div>
      <Button
        className='mt-4 py-2 px-16 text-lg max-w-xs rounded shadow bg-primary text-secondary font-bold'
        type={'button'}
      >
        {t('submit')}
      </Button>
      {/* <div className='w-full flex flex-col justify-center items-center'> 
      </div>*/}
    </form>
  );
});

export default NotificationCenter;
