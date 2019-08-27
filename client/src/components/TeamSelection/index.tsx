import { produce, Patch } from 'immer';
import { FaListUl } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useState } from 'react';

import { TeamMemberType } from 'types/gameweekHistory.type';
import { PitchPlayerType } from '../Pitch/types';

import { Pitch } from 'components/Pitch';
import TeamList from 'components/TeamList';

import { SoccerField } from './soccer-field.icon';
import * as S from './styles';

type Props = {
  /**
   * List of players returned by `usePitchPlayers()` hook or analogue one
   */
  players: (PitchPlayerType | null)[];
  /**
   * `players` setter returned by `usePitchPlayers()` hook or analogue one
   */
  setPlayers: React.Dispatch<React.SetStateAction<(PitchPlayerType | null)[]>>;

  hasBench?: boolean;

  /**
   * Place specific logic in this function
   * @param target Value of player cell on which `player` was dropped
   * @param player Value which was dropped
   * @param immer_reverse Patch which can be used to reverse changes in pitch via `immer.applyPatches(immer_reverse)`
   * @param isNewPlayer true if `player` was new to the list
   */
  onPlayerDrop?: (
    target: PitchPlayerType | null,
    player: PitchPlayerType,
    immer_reverse: Patch[],
    isNewPlayer: boolean,
  ) => void;
  onPlayerClick?: (player: PitchPlayerType) => void;

  submit?: {
    onSubmit: () => void;
    canSubmit: boolean;
    label: string;
  };
};

const TeamSelection = ({
  players,
  setPlayers,
  hasBench = false,
  onPlayerDrop,
  onPlayerClick,
  submit,
}: Props) => {
  const { t } = useTranslation();

  const [view, setView] = useState<'list' | 'pitch'>('list');

  const handlePlayerDrop = useCallback(
    (targetIdx: number) => (
      player: PitchPlayerType | Omit<PitchPlayerType, keyof TeamMemberType>,
    ) => {
      const target = players[targetIdx];

      if (!target || target.player_stats.id !== player.player_stats.id) {
        const playerOnPitchIdx = players.findIndex(
          (p) => p === player || (p && p.player_stats.id === player.player_stats.id),
        );

        const newPlayer = players[playerOnPitchIdx] || {
          is_captain: false,
          is_vice_captain: false,
          is_on_bench: false,
          ...target,
          player_id: player.player_stats.id,
          ...player,
        };

        const newPlayers = produce(
          players,
          (draft) => {
            draft[targetIdx] = newPlayer;
            if (playerOnPitchIdx !== -1) {
              draft[playerOnPitchIdx] = target;
            }
          },
          (_, immer_reverse) => {
            onPlayerDrop &&
              onPlayerDrop(target, newPlayer, immer_reverse, playerOnPitchIdx === -1);
          },
        );

        setPlayers(newPlayers);
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
