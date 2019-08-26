import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

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
      <div className={cn(header.jumbotron, header.paper, 'mb-12', 'rounded', 'pt-12')}>
        <div className={cn(header.sub, header.title, 'mb-4', 'flex', 'items-center')}>
          {t('SquadSelection.title.sub')}
        </div>
        <h2 className={cn(header.title, 'text-secondary', 'mb-6')}>
          {t('SquadSelection.title.main')}
        </h2>
        <div className={cn(header['jumbotron-content'], 'mt-8', 'flex')}>
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
