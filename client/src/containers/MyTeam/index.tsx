import cn from 'classnames';
import produce from 'immer';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';

import { RootState } from 'store/types';
import { TeamMemberType } from 'types/gameweekHistory.type';
import { usePitchPlayers } from 'components/Pitch/use-pitch-players.hook';
import { DisplayPlayerType, PitchPlayerType } from 'components/Pitch/types';
import { postGameweekHistory } from 'containers/Routing/fetchGameweeks/actions';
import { currentGameweekSelector } from 'store/selectors/current-gameweek.selector';

import StatusPlayerModal from 'components/StatusPlayerModal';
import TeamSelection from 'components/TeamSelection';

import styles from './styles.module.scss';
import header from 'styles/header.module.scss';
import { PlayerDropHandler } from 'components/TeamSelection/types';
import { feedback } from 'react-feedbacker';
import { PlayerType } from 'types/player.types';
import PlayerDialog from 'components/PlayerDialog';
import { fetchDataForPlayer, resetPlayerDialogData } from 'containers/Players/actions';

const MyTeam = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { playerData, dialogLoading } = useSelector((state: RootState) => state.players);

  useEffect(() => {
    document.title = 'My Team | Fantasy Football League';
  }, []);

  const [changed, setChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [currentId, setCurrentId] = useState('');

  const [playerToSwitch, setPlayerToSwitch] = useState<PitchPlayerType | null>(null);
  const players = useSelector((state: RootState) => state.gameweeks.gameweeks_history);
  const currentGameweek = useSelector(currentGameweekSelector);
  const { pitchPlayers, setPitch } = usePitchPlayers(players);
  const [switchQuery, setSwitchQuery] = useState<PitchPlayerType[][]>([]);

  const [currentDialogPlayer, setCurrentDialogPlayer] = useState<PlayerType>();

  const onOpenInfo = (player: PlayerType) => {
    setShowModal(false);
    setCurrentDialogPlayer(player);
    dispatch(fetchDataForPlayer(player.id, String(player.club_id)));
  };

  const onModalDismiss = () => {
    dispatch(resetPlayerDialogData());
    setCurrentDialogPlayer(undefined);
  };

  useEffect(() => {
    setChanged(false);
  }, [players]);

  const onClose = () => {
    setShowModal(false);
  };

  const onSetCaptain = () => {
    setPitch((pitch) =>
      produce(pitch, (draft) => {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        const currentCaptain = draft.find((p) => p.item && p.item.is_captain)!.item!;
        const currentViceCaptain = draft.find((p) => p.item && p.item.is_vice_captain)!
          .item!;
        const currentPlayer = draft.find(
          (p) => p.item && p.item.player_stats.id === currentId,
        )!.item!;
        /* eslint-enable @typescript-eslint/no-non-null-assertion */

        if (currentId === currentViceCaptain.player_stats.id) {
          currentViceCaptain.is_vice_captain = false;
          currentViceCaptain.is_captain = true;
          currentCaptain.is_vice_captain = true;
        }

        currentPlayer.is_captain = true;
        currentCaptain.is_captain = false;
      }),
    );

    setChanged(true);
    setShowModal(false);
  };

  const onSetViceCaptain = () => {
    setPitch((pitch) =>
      produce(pitch, (draft) => {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        const currentCaptain = draft.find((p) => p.item && p.item.is_captain)!.item!;
        const currentViceCaptain = draft.find((p) => p.item && p.item.is_vice_captain)!
          .item!;
        const currentPlayer = draft.find(
          (p) => p.item && p.item.player_stats.id === currentId,
        )!.item!;
        /* eslint-enable @typescript-eslint/no-non-null-assertion */

        if (currentId === currentCaptain.player_stats.id) {
          currentCaptain.is_captain = false;
          currentCaptain.is_vice_captain = true;
          currentViceCaptain.is_captain = true;
        }

        currentPlayer.is_vice_captain = true;
        currentViceCaptain.is_vice_captain = false;
      }),
    );

    setChanged(true);
    setShowModal(false);
  };

  const onOpen = (player: DisplayPlayerType) => {
    setCurrentId(player.player_stats.id);
    setShowModal(true);
  };

  const canSwitch = useMemo(
    () => !playerToSwitch || playerToSwitch.item!.player_stats.id !== currentId,
    [playerToSwitch, currentId],
  );

  const currentPlayer = useMemo(
    () =>
      currentId
        ? pitchPlayers.find((p) => p.item && p.item.player_stats.id === currentId)!.item!
        : null,
    [currentId, pitchPlayers],
  );

  const setCurrentPlayerForSwitching = (id: string) => {
    const playerIdx = pitchPlayers.findIndex(
      (p) => p.item && p.item.player_stats.id === id,
    );

    if (!playerToSwitch) {
      setPitch(
        produce(pitchPlayers, (draft) => {
          const player = draft[playerIdx];

          if (player && player.item) {
            player.item.display.highlight = 'rgba(255, 255, 0, 0.6)';

            draft.forEach((p) => {
              if (p && p.item) {
                if (
                  p.item.player_stats.position === player.item!.player_stats.position &&
                  p.item.player_stats.id !== player.item!.player_stats.id
                ) {
                  p.item.display.highlight = 'rgba(255, 102, 0, 0.6)';
                }
              }
            });
          }
        }),
      );
    }

    setPlayerToSwitch(pitchPlayers[playerIdx]);
  };

  const switchWith = (id: string) => {
    if (!playerToSwitch) return;

    const switchWithPlayer = pitchPlayers.find(
      (p) => p.item && p.item.player_stats.id === id,
    )!;

    if (
      playerToSwitch.item!.player_stats.position ===
      switchWithPlayer.item!.player_stats.position
    ) {
      setPlayerToSwitch(null);
      setSwitchQuery((q) => [...q, [playerToSwitch, switchWithPlayer]]);
    } else {
      feedback.warning('Cannot switch players of different positions');
    }
  };

  const onSetPlayerForSwitching = () => {
    if (playerToSwitch) {
      switchWith(currentId);
    } else {
      setCurrentPlayerForSwitching(currentId);
    }
    setShowModal(false);
  };

  const onCancelPlayerForSwitching = () => {
    setPlayerToSwitch(null);
    setShowModal(false);
    setPitch((pitch) =>
      produce(pitch, (draft) => {
        draft.forEach((p, idx) => {
          if (p.item) {
            draft[idx].item!.display.highlight = undefined;
          }
        });
      }),
    );
  };

  const saveTeam = () => {
    if (!pitchPlayers.some((p) => !p.item)) {
      const result: TeamMemberType[] = pitchPlayers.map(({ item }) => ({
        is_on_bench: item!.is_on_bench,
        is_captain: item!.is_captain,
        is_vice_captain: item!.is_vice_captain,
        player_id: item!.player_stats.id,
      }));

      currentGameweek && dispatch(postGameweekHistory(currentGameweek.id, result));
    }
  };

  const handlePlayerDrop: PlayerDropHandler = useCallback(() => {
    setChanged(true);
    setPlayerToSwitch(null);
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
          players={pitchPlayers}
          setPlayers={setPitch}
          showFixtures={true}
          query={switchQuery}
          setQuery={setSwitchQuery}
          onPlayerClick={onOpen}
          onPlayerDrop={handlePlayerDrop}
          submit={{
            label: t('Gameweek.saveTeam'),
            canSubmit: changed,
            onSubmit: saveTeam,
          }}
          hasBench
        />
      </div>
      {showModal && currentPlayer && (
        <StatusPlayerModal
          player={currentPlayer}
          onClose={onClose}
          onSetCaptain={onSetCaptain}
          onSetViceCaptain={onSetViceCaptain}
          funcForSwitching={
            canSwitch ? onSetPlayerForSwitching : onCancelPlayerForSwitching
          }
          toSwitch={canSwitch}
          onOpenInfo={onOpenInfo}
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
