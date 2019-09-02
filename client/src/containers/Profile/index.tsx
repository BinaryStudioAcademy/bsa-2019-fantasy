import React, { useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { useSteps } from 'helpers/hooks/steps.hook';

import FavouriteClubSelection from './components/FavouriteClubSelection';
import PersonalDetails from './components/PersonalDetails';
import NotificationCenter from './components/NotificationCenter';
import Progress from './components/Progress';

import styles from './styles.module.scss';

const stepRouteMap = [
  '/profile/details',
  '/profile/favorite-club',
  '/profile/email-preferences',
];

const Profile = withRouter(({ history }) => {
  const { t } = useTranslation();

  const { step, nextStep, prevStep, navToStep } = useSteps(3);

  useEffect(() => {
    document.title = 'Profile | Fantasy Football League';
    navToStep(stepRouteMap.indexOf(history.location.pathname) + 1);
  }, []);

  const prevStepLink = stepRouteMap[step - 1 - 1];
  const nextStepLink = stepRouteMap[step + 1 - 1];

  return (
    <section>
      <div className='mb-8 p-10 pt-5 bg-white rounded shadow-figma'>
        <h1 className='text-6xl font-bold'>{t('Profile.title.main')}</h1>
        <h3 className='ml-2 text-2xl text-secondary2 font-bold'>
          {t('Profile.title.sub')}
        </h3>
      </div>

      <div className='flex'>
        <Progress
          step={step}
          navToStep={(step: number) => {
            navToStep(step);
            history.replace(stepRouteMap[step - 1]);
          }}
        />

        <div className='flex-1 bg-white rounded py-12 px-16 shadow-figma relative min-h-screen'>
          <Switch>
            <Route exact path='/profile'>
              <Redirect to='/profile/details' />
            </Route>
            <Route path='/profile/details' component={PersonalDetails} />
            <Route path='/profile/favorite-club' component={FavouriteClubSelection} />
            <Route path='/profile/email-preferences' component={NotificationCenter} />
            <Route>
              <Redirect to='/404' />
            </Route>
          </Switch>

          <button
            className={cn(
              styles.navButton,
              'shadow hover:shadow-md',
              'text-secondary',
              'left-0',
              '-ml-3',
              step === 1 && 'hidden',
            )}
            onClick={() => {
              history.replace(prevStepLink);
              prevStep();
            }}
          >
            <IoIosArrowBack />
          </button>
          <button
            className={cn(
              styles.navButton,
              'shadow',
              'hover:shadow-md',
              'text-secondary',
              'right-0',
              '-mr-3',
              step === 3 && 'hidden',
            )}
            onClick={() => {
              history.replace(nextStepLink);
              nextStep();
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
});

export default Profile;
