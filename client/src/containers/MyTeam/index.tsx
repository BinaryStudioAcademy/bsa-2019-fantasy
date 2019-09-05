import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/types';
import { useMyTeam } from './use-my-team.hook';
import { fetchDataForPlayer, resetPlayerDialogData } from 'containers/Players/actions';

import PlayerDialog from 'components/PlayerDialog';
import TeamSelection from 'components/TeamSelection';
import StatusPlayerModal from './components/StatusPlayerModal';

import header from 'styles/header.module.scss';
import { PlayerType } from 'types/player.types';

const MyTeam = () => {
  useEffect(() => {
    document.title = 'My Team | Fantasy Football League';
  }, []);

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

  const dispatch = useDispatch();
  const { playerData, dialogLoading } = useSelector((state: RootState) => state.players);

  const [currentDialogPlayer, setCurrentDialogPlayer] = useState<PlayerType | null>(null);

  const handleOpenInfo = (player: PlayerType) => {
    setCurrentDialogPlayer(player);
    dispatch(fetchDataForPlayer(player.id, player.club_id + ''));
    handleCloseModal();
  };

  const onModalDismiss = () => {
    dispatch(resetPlayerDialogData());
    setCurrentDialogPlayer(null);
  };

  return (
    <div
      className={cn(
        header.jumbotron,
        header.paper,
        'mb-6',
        'rounded',
        'flex',
        'flex-col',
        'pt-12',
      )}
      style={{ minHeight: '140vh' }}
    >
      <div className={cn(header['jumbotron-content'], 'mb-8')}>
        <h2 className={cn(header.title, 'text-secondary')}>
          <div className={cn(header.sub, header.title, 'mb-4', 'flex', 'items-center')}>
            {t('MyTeamPage.title.sub')}
          </div>
          {t('MyTeamPage.title.main')}
        </h2>
      </div>

      <TeamSelection
        players={players}
        setPlayers={setPlayers}
        showFixtures
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

      {openedPlayer && (
        <StatusPlayerModal
          player={openedPlayer}
          onClose={handleCloseModal}
          onSetCaptain={handleSetCaptain}
          onSetViceCaptain={handleSetViceCaptain}
          onSwitch={handleAddPlayer}
          onCancel={handleCancelAddedPlayer}
          onOpenInfo={handleOpenInfo}
        />
      )}
      {currentDialogPlayer && (
        <PlayerDialog
          playerDialogData={playerData}
          onDismiss={onModalDismiss}
          loading={dialogLoading}
          player={currentDialogPlayer}
        />
      )}
    </div>
  );
};

export default MyTeam;
