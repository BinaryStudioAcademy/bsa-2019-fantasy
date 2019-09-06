import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { RootState } from 'store/types';
import { useMyTeam } from './use-my-team.hook';
import { fetchDataForPlayer, resetPlayerDialogData } from 'containers/Players/actions';

import PlayerDialog from 'components/PlayerDialog';
import TeamSelection from 'components/TeamSelection';
import StatusPlayerModal from './components/StatusPlayerModal';

import header from 'styles/header.module.scss';
import { PlayerType } from 'types/player.types';
import { GameweekStatsSidebar } from 'components/GameweekStatsSidebar';

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

  const { gameweeksHistory, currentGameweek } = useSelector(
    (state: RootState) => state.gameweekHistory,
    shallowEqual,
  );
  const { user_rank: userRank } = useSelector(
    (state: RootState) => state.gameweeks,
    shallowEqual,
  );

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
    <>
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
      >
        <div className={cn(header['jumbotron-content'], 'mb-8')}>
          <h2 className={cn(header.title, 'text-secondary')}>
            <div className={cn(header.sub, header.title, 'mb-4', 'flex', 'items-center')}>
              {t('MyTeamPage.title.sub')}
            </div>
            {t('MyTeamPage.title.main')}
          </h2>
        </div>
      </div>
      <div className='flex -mx-2'>
        <div
          className='mx-2 p-8 shadow-figma rounded bg-white flex self-center justify-center'
          style={{ width: '70%', minHeight: '110vh' }}
        >
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
        </div>
        <div className='mx-2 flex' style={{ width: '30%' }}>
          <GameweekStatsSidebar
            gameweekHistory={gameweeksHistory[currentGameweek - 1]}
            userRank={userRank}
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
    </>
  );
};

export default MyTeam;
