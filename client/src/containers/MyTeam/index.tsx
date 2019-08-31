/* eslint-disable @typescript-eslint/no-non-null-assertion */

import cn from 'classnames';
import produce from 'immer';
import { feedback } from 'react-feedbacker';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

const MyTeam = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'My Team | Fantasy Football League';
  }, []);

  const [changed, setChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [currentId, setCurrentId] = useState('');

  const [captainId, setCaptainId] = useState('');
  const [viceCaptainId, setViceCaptainId] = useState('');

  const [playerToSwitch, setPlayerToSwitch] = useState<PitchPlayerType | null>(null);
  const players = useSelector((state: RootState) => state.gameweeks.gameweeks_history);

  const { pitchPlayers, setPitch } = usePitchPlayers(players);
  const currentGameweek = useSelector(currentGameweekSelector);

  useEffect(() => {
    setChanged(false);
  }, [players]);

  useEffect(() => {
    if (players.length > 0) {
      const givenCaptain = players.find((p) => p.is_captain);
      givenCaptain && setCaptainId(givenCaptain.player_stats.id);

      const givenViceCaptain = players.find((p) => p.is_vice_captain);
      givenViceCaptain && setViceCaptainId(givenViceCaptain.player_stats.id);
    }
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

        if (currentId === viceCaptainId) {
          setViceCaptainId(captainId);

          currentViceCaptain.is_vice_captain = false;
          currentViceCaptain.is_captain = true;
          currentCaptain.is_vice_captain = true;
        }

        setCaptainId(currentId);

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

        if (currentId === captainId) {
          setCaptainId(viceCaptainId);

          currentCaptain.is_captain = false;
          currentCaptain.is_vice_captain = true;
          currentViceCaptain.is_captain = true;
        }

        setViceCaptainId(currentId);

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

  const canSwitch = !playerToSwitch || playerToSwitch.item!.player_stats.id !== currentId;

  const setCurrentPlayerForSwitching = (id: string) => {
    const player =
      pitchPlayers.find((p) => p.item && p.item.player_stats.id === id) || null;
    setPlayerToSwitch(player);
  };

  const switchWith = (id: string) => {
    if (!playerToSwitch) return;

    setPitch((pitch) =>
      produce(pitch, (draft) => {
        const target = draft.find(
          (p) =>
            p.item &&
            playerToSwitch.item &&
            p.item.player_stats.id === playerToSwitch.item.player_stats.id,
        )!;

        const playerOnPitchIdx = draft.findIndex(
          (p) => p.item && p.item.player_stats.id === id,
        );
        const playerOnPitch = draft[playerOnPitchIdx];

        if (
          target.item!.player_stats.position !== playerOnPitch.item!.player_stats.position
        ) {
          feedback.warning('Cannot swap players of different positions!');
          return;
        }

        let newPlayer: DisplayPlayerType = { ...playerOnPitch.item! };

        let newTargetItem = target.item;
        if (playerOnPitch.item && target.item) {
          const targetItem = target.item;
          const playerItem = playerOnPitch.item;

          const movedToBench = !playerItem.is_on_bench && target.item.is_on_bench;
          const movedFromBench = playerItem.is_on_bench && !target.item.is_on_bench;

          if (movedToBench || movedFromBench) {
            // Captain/vice-captain cannot be on bench
            if (
              targetItem.is_captain ||
              targetItem.is_vice_captain ||
              playerItem.is_captain ||
              playerItem.is_vice_captain
            ) {
              feedback.warning('Captain or vice captain cannot sit on bench!');

              return;
            }

            newTargetItem = { ...target.item };

            if (movedToBench) {
              newTargetItem.is_on_bench = false;
            } else if (movedFromBench) {
              newTargetItem.is_on_bench = true;
            }

            newPlayer.is_on_bench = target.item.is_on_bench;
          }
        }

        target.item = newPlayer;
        if (playerOnPitchIdx !== -1) {
          draft[playerOnPitchIdx].item = newTargetItem;
        }

        setChanged(true);
      }),
    );
  };

  const onSetPlayerForSwitching = () => {
    if (playerToSwitch) {
      switchWith(currentId);
      setCurrentPlayerForSwitching('');
    } else {
      setCurrentPlayerForSwitching(currentId);
    }
    setShowModal(false);
  };

  const onCancelPlayerForSwitching = () => {
    setCurrentPlayerForSwitching('');
    setShowModal(false);
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

  const handlePlayerDrop = () => setChanged(true);

  // TODO: Implement player highlighting on switching via clicks via context API

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
      {showModal && (
        <StatusPlayerModal
          player={
            pitchPlayers.find((p) => p.item && p.item.player_stats.id === currentId)!
              .item!
          }
          onClose={onClose}
          onSetCaptain={onSetCaptain}
          onSetViceCaptain={onSetViceCaptain}
          funcForSwitching={
            canSwitch ? onSetPlayerForSwitching : onCancelPlayerForSwitching
          }
          toSwitch={canSwitch}
        />
      )}
    </div>
  );
};

export default MyTeam;
