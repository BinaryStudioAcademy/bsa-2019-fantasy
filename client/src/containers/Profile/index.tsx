import React, { useEffect } from 'react';
import cn from 'classnames';
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { useSteps } from 'helpers/hooks/steps.hook';

import FavouriteClubSelection from './components/FavouriteClubSelection';
import PersonalDetails from './components/PersonalDetails';
import EmailPreferences from './components/EmailPreferences';
import Progress from './components/Progress';

import styles from './styles.module.scss';

const stepRouteMap = [
  '/profile/details',
  '/profile/details',
  '/profile/favorite-club',
  '/profile/email-preferences',
  '/profile/email-preferences',
];

const Profile = withRouter(({ history }) => {
  const { step, nextStep, prevStep, navToStep } = useSteps(3);

  useEffect(() => {
    navToStep(stepRouteMap.indexOf(history.location.pathname) || 1);
  }, []);

  const prevStepLink = stepRouteMap[step - 1];
  const nextStepLink = stepRouteMap[step + 1];

  return (
    <section>
      <div className='mb-8 p-10 pt-5 bg-white rounded shadow-figma'>
        <h1 className='text-6xl font-bold'>Your account</h1>
        <h3 className='ml-2 text-2xl text-secondary2 font-bold'>Update your profile</h3>
      </div>

      <div className='flex'>
        <Progress
          step={step}
          navToStep={(step: number) => {
            navToStep(step);
            history.push(stepRouteMap[step]);
          }}
        />

        <div className='flex-1 bg-white rounded py-12 px-16 shadow-figma relative min-h-screen'>
          <Switch>
            <Route exact path='/profile'>
              <Redirect to='/profile/details' />
            </Route>
            <Route path='/profile/details' component={PersonalDetails} />
            <Route path='/profile/favorite-club' component={FavouriteClubSelection} />
            <Route path='/profile/email-preferences' component={EmailPreferences} />
            <Route>
              <Redirect to='/404' />
            </Route>
          </Switch>

          <button
            className={cn(
              styles.navButton,
              'shadow hover:shadow-md text-secondary left-0 -ml-3',
              step === 1 && 'hidden',
            )}
            onClick={prevStep}
          >
            <Link to={prevStepLink}>
              <IoIosArrowBack />
            </Link>
          </button>
          <button
            className={cn(
              styles.navButton,
              'shadow hover:shadow-md text-secondary right-0 -mr-3',
              step === 3 && 'hidden',
            )}
            onClick={nextStep}
          >
            <Link to={nextStepLink}>
              <IoIosArrowForward />
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
});

export default Profile;
