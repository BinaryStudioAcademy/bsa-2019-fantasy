import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import FixturesContainer from 'containers/FixturesContainer';
import PlayersSelection from 'components/PlayersSelection';
import InitialTeamSelection from 'components/Gameweek/InitialTeamSelection';

import header from 'styles/header.module.scss';

const SquadSelection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Squad Selection | Fantasy Football League';
  }, []);

  return (
    <div className='transfers-page'>
      <div className={`${header.jumbotron} ${header.paper} mb-12 rounded pt-12`}>
        <div className={`${header.sub} ${header.title} mb-4 flex items-center`}>
          {t('SquadSelection.title.sub')}
        </div>
        <h2 className={`${header.title} text-secondary mb-6`}>
          {t('SquadSelection.title.main')}
        </h2>
        <div className={`${header['jumbotron-content']} mt-8 flex`}>
          <div className='flex flex-grow flex-col mr-4'>
            <InitialTeamSelection />
          </div>
          <PlayersSelection />
        </div>
      </div>
      <FixturesContainer />
    </div>
  );
};

export default SquadSelection;
