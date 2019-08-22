import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import FixturesContainer from 'containers/FixturesContainer';
import PlayersSelection from 'components/PlayersSelection';
import TeamSelection from 'components/Gameweek/TeamSelection';

import header from 'styles/header.module.scss';

const Transfers = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Transfers | Fantasy Football League';
  }, []);

  return (
    <div className='transfers-page'>
      <div className={`${header.jumbotron} ${header.paper} mb-12 rounded pt-12`}>
        <div className={`${header.sub} ${header.title} mb-4 flex items-center`}>
          {t('Transfers.title.sub')}
        </div>
        <h2 className={`${header.title} text-secondary mb-6`}>
          {t('Transfers.title.main')}
        </h2>
        <div className={`${header['jumbotron-content']} mt-2 flex`}>
          <div style={{ minWidth: '350px' }}>
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

export default Transfers;
