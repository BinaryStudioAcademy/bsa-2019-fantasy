import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import FixturesContainer from 'containers/FixturesContainer';
import PlayersSelection from 'components/PlayersSelection';
import TeamSelection from 'components/Gameweek/TeamSelection';

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
        <div className={`${header['jumbotron-content']} mt-2 flex`}>
          <div style={{ width: '25%' }}>
            <PlayersSelection />
          </div>
          <div className='flex flex-grow justify-center'>
            <div className='wrapper'>
              <TeamSelection />
            </div>
          </div>
        </div>
      </div>
      <FixturesContainer />
    </div>
  );
};

export default SquadSelection;
