import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';

import StatusPlayerModal from './components/StatusPlayerModal';
import TeamSelection from 'components/TeamSelection';
import { useMyTeam } from './use-my-team.hook';

import styles from './styles.module.scss';
import header from 'styles/header.module.scss';

const MyTeam = () => {
  const { t } = useTranslation();

  const {
    players,
    setPlayers,

    switchQuery,
    setSwitchQuery,

    changed,

    openedPlayer,
    handleOpenModal,
    handleCloseModal,

    handleAddPlayer,
    handleCancelAddedPlayer,
    handleSetCaptain,
    handleSetViceCaptain,

    handlePlayerSwitch,
    handleSubmit,
  } = useMyTeam();

  useEffect(() => {
    document.title = 'My Team | Fantasy Football League';
  }, []);

  return (
    <div className={styles['team-page']}>
      <div
        className={cn(
          header.jumbotron,
          header.paper,
          'mb-6',
          'rounded',
          'flex',
          'items-end',
          'justify-between',
          'pt-6',
        )}
      >
        <div className={cn(header['jumbotron-content'], 'mt-16')}>
          <h2 className={cn(header.title, 'text-secondary', 'mb-6')}>
            <div className={cn(header.sub, header.title, 'mb-4', 'flex', 'items-center')}>
              {t('MyTeamPage.title.sub')}
            </div>
            {t('MyTeamPage.title.main')}
          </h2>
        </div>
      </div>

      <div
        className={cn(
          header.jumbotron,
          header.paper,
          'mb-12',
          'rounded',
          'flex',
          'flex-col',
          'items-center',
          'justify-between',
        )}
      >
        <TeamSelection
          players={players}
          setPlayers={setPlayers}
          query={switchQuery}
          setQuery={setSwitchQuery}
          onPlayerClick={handleOpenModal}
          onPlayerDrop={handlePlayerSwitch}
          submit={{
            label: t('Gameweek.saveTeam'),
            canSubmit: changed,
            onSubmit: handleSubmit,
          }}
          hasBench
        />
      </div>
      {openedPlayer && (
        <StatusPlayerModal
          player={openedPlayer}
          onClose={handleCloseModal}
          onSetCaptain={handleSetCaptain}
          onSetViceCaptain={handleSetViceCaptain}
          onSwitch={handleAddPlayer}
          onCancel={handleCancelAddedPlayer}
        />
      )}
    </div>
  );
};

export default MyTeam;
