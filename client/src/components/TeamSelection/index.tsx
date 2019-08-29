import { produce } from 'immer';
import { FaListUl } from 'react-icons/fa';
import { feedback } from 'react-feedbacker';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useState } from 'react';

import { TeamMemberType } from 'types/gameweekHistory.type';
import { PitchPlayerType, DisplayPlayerType } from '../Pitch/types';
import { PlayerDropHandler } from './types';

import { Pitch } from 'components/Pitch';
import TeamList from 'components/TeamList';

import { SoccerField } from './soccer-field.icon';
import * as S from './styles';

type Props = {
  /**
   * List of players returned by `usePitchPlayers()` hook or analogue one
   */
  players: PitchPlayerType[];
  /**
   * `players` setter returned by `usePitchPlayers()` hook or analogue one
   */
  setPlayers: React.Dispatch<React.SetStateAction<PitchPlayerType[]>>;
  disabled?: boolean;

  hasBench?: boolean;

  onPlayerDrop?: PlayerDropHandler;
  onPlayerClick?: (player: DisplayPlayerType) => void;

  submit?: {
    onSubmit: () => void;
    canSubmit: boolean;
    label: string;
  };
};

const TeamSelection = ({
  players,
  setPlayers,
  onPlayerDrop,
  onPlayerClick,
  submit,
  hasBench = false,
  disabled = false,
}: Props) => {
  const { t } = useTranslation();

  const [view, setView] = useState<'list' | 'pitch'>('pitch');

  const handlePlayerDrop = useCallback(
    (targetIdx: number, targetIsOnBench: boolean) => (
      player: DisplayPlayerType | Omit<DisplayPlayerType, keyof TeamMemberType>,
    ) => {
      if (!disabled) {
        const target = players[targetIdx];

        if (!target.item || target.item.player_stats.id !== player.player_stats.id) {
          const playerOnPitchIdx = players.findIndex(
            (p) =>
              p.item === player ||
              (p.item && p.item.player_stats.id === player.player_stats.id),
          );
          const playerOnPitch = players[playerOnPitchIdx];

          let newPlayer =
            playerOnPitch && playerOnPitch.item
              ? {
                  ...playerOnPitch.item,
                }
              : {
                  is_captain: false,
                  is_on_bench: false,
                  is_vice_captain: false,
                  ...target.item,
                  player_id: player.player_stats.id,
                  ...player,
                };

          let newTargetItem = target.item;
          if (hasBench && playerOnPitch.item && target.item) {
            const targetItem = target.item;
            const playerItem = playerOnPitch.item;

            const movedToBench = !playerItem.is_on_bench && targetIsOnBench;
            const movedFromBench = playerItem.is_on_bench && !targetIsOnBench;

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

              newPlayer.is_on_bench = targetIsOnBench;
            }
          }

          const newPlayers = produce(
            players,
            (draft) => {
              draft[targetIdx].item = newPlayer;
              if (playerOnPitchIdx !== -1) {
                draft[playerOnPitchIdx].item = newTargetItem;
              }
            },
            (_, immer_reverse) => {
              onPlayerDrop &&
                onPlayerDrop(
                  newTargetItem,
                  newPlayer,
                  immer_reverse,
                  playerOnPitchIdx === -1,
                );
            },
          );

          setPlayers && setPlayers(newPlayers);
        }
      }
    },
    [players],
  );

  // TODO: Think about toolbar at the top in TeamSelection component :)

  return (
    <S.Container className='bg-secondary rounded'>
      <div className='w-full flex justify-center mt-4 relative'>
        {submit && (
          <S.Submit
            className='rounded'
            disabled={!submit.canSubmit}
            onClick={submit.onSubmit}
          >
            {submit.label}
          </S.Submit>
        )}
      </div>

      {view === 'pitch' && (
        <Pitch
          players={players}
          hasBench={hasBench}
          onPlayerDrop={handlePlayerDrop}
          onPlayerClick={onPlayerClick}
          disabled={disabled}
        />
      )}

      {view === 'list' && (
        <TeamList players={players} hasBench={hasBench} onPlayerClick={onPlayerClick} />
      )}

      <S.ViewToggles>
        <S.Toggle
          isActive={view === 'pitch'}
          onClick={() => setView('pitch')}
          title={t('TransfersTeamSelection.switch.pitch')}
        >
          <SoccerField fill='currentColor' height='1em' width='1.5em' />
        </S.Toggle>
        <S.Toggle
          isActive={view === 'list'}
          onClick={() => setView('list')}
          title={t('TransfersTeamSelection.switch.list')}
        >
          <FaListUl />
        </S.Toggle>
      </S.ViewToggles>
    </S.Container>
  );
};

export default TeamSelection;
