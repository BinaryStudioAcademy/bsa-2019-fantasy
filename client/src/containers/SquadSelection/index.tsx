import cn from 'classnames';
import { withRouter } from 'react-router';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';

import SquadSelectionStatus from 'containers/SquadSelection/components/SquadSelectionStatus';
import FixturesContainer from 'containers/FixturesContainer';
import PlayersSelection from 'components/PlayersSelection';
import TeamSelection from 'components/TeamSelection';
import SaveTeamModal from './components/SaveTeamModal';

import { useInitialTeamSelection } from './use-initial-team.hook';

import header from 'styles/header.module.scss';

const SquadSelection = withRouter(({ history }) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Squad Selection | Fantasy Football League';
  }, []);

  const {
    pitchPlayers,
    setPitch,
    isMoreThree,
    moneyRemaining,
    handleAutoPick,
    handleResetSquad,
    handleSaveTeam,
  } = useInitialTeamSelection(history);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const amountOfPlayersPicked = pitchPlayers.filter((p) => p.item).length;

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
            {isModalOpen && (
              <SaveTeamModal
                onDismiss={() => setIsModalOpen(false)}
                onSubmit={handleSaveTeam}
              />
            )}

            <SquadSelectionStatus
              money={moneyRemaining}
              players={amountOfPlayersPicked}
              isMoreThree={isMoreThree}
              onResetClick={() => handleResetSquad()}
              onAutoPickClick={() => handleAutoPick()}
            />

            <TeamSelection
              players={pitchPlayers}
              setPlayers={setPitch}
              submit={{
                label: t('Gameweek.saveTeam'),
                canSubmit: amountOfPlayersPicked === 15,
                onSubmit: () => setIsModalOpen(true),
              }}
            />
          </div>
          <PlayersSelection />
        </div>
      </div>
      <FixturesContainer />
    </div>
  );
});

export default SquadSelection;
