import cn from 'classnames';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { useSteps } from 'helpers/hooks/steps.hook';

import FavouriteClubSelection from './components/FavouriteClubSelection';
import PersonalDetails from './components/PersonalDetails';
import EmailPreferences from './components/EmailPreferences';
import Progress from './components/Progress';

import styles from './styles.module.scss';

const Profile = () => {
  const { step, nextStep, prevStep, navToStep } = useSteps(3);

  let content;
  switch (step) {
    case 1:
      content = <PersonalDetails />;
      break;
    case 2:
      content = <FavouriteClubSelection />;
      break;
    case 3:
      content = <EmailPreferences />;
      break;
  }

  return (
    <section>
      <div className='mb-8 p-10 pt-5 bg-white rounded shadow-figma'>
        <h1 className='text-6xl font-bold'>Your account</h1>
        <h3 className='ml-2 text-2xl text-secondary2 font-bold'>Update your profile</h3>
      </div>

      <div className='flex'>
        <Progress step={step} navToStep={navToStep} />

        <div className='flex-1 bg-white rounded py-12 px-16 shadow-figma relative min-h-screen'>
          {content}

          <button
            className={cn(
              styles.navButton,
              'shadow hover:shadow-md text-secondary left-0 -ml-3',
              step === 1 && 'hidden',
            )}
            onClick={prevStep}
          >
            <IoIosArrowBack />
          </button>
          <button
            className={cn(
              styles.navButton,
              'shadow hover:shadow-md text-secondary right-0 -mr-3',
              step === 3 && 'hidden',
            )}
            onClick={nextStep}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
