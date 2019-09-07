import { produce } from 'immer';
import { FaListUl } from 'react-icons/fa';
import { feedback } from 'react-feedbacker';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TeamMemberType } from 'types/gameweekHistory.type';
import { PitchPlayerType, DisplayPlayerType } from '../Pitch/types';
import { PlayerDropHandler } from './types';
import { RootState } from 'store/types';

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

  /**
   * `showFixtures` is a flag, which controls what player`s info to display
   */
  showFixtures?: boolean;

  query?: PitchPlayerType[][];
  setQuery?: React.Dispatch<React.SetStateAction<PitchPlayerType[][]>>;

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
  query,
  setQuery,
  onPlayerDrop,
  onPlayerClick,
  submit,
  hasBench = false,
  disabled = false,
  showFixtures = false,
}: Props) => {
  const { t } = useTranslation();
  const [view, setView] = useState<'list' | 'pitch'>('pitch');

  const submitText = t('TransfersTeamSelection.submit').split(' ')[0];
  const buttonText = (submit !== undefined) ? submit!.label.split(' ')[0] : '';
  
  const user = useSelector((state: RootState) => state.profile.user);

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

          let immer_reverse;
          const newPlayers = produce(
            players,
            (draft) => {
              draft[targetIdx] = {
                type: newPlayer.player_stats.position,
                accept: [newPlayer.player_stats.position],
                item: newPlayer,
              };
              if (playerOnPitchIdx !== -1) {
                const newTargetType = newTargetItem
                  ? newTargetItem.player_stats.position
                  : draft[playerOnPitchIdx].type;

                draft[playerOnPitchIdx] = {
                  type: newTargetType,
                  accept: [newTargetType],
                  item: newTargetItem,
                };
              }
            },
            (_, reversePatches) => {
              immer_reverse = reversePatches;
            },
          );

          const afterPlayerDrop =
            onPlayerDrop &&
            onPlayerDrop(
              newTargetItem,
              newPlayer,
              immer_reverse,
              playerOnPitchIdx === -1,
            );

          setPlayers(newPlayers);

          afterPlayerDrop && afterPlayerDrop(newPlayers);
        }
      }
    },
    [players, disabled, hasBench, onPlayerDrop, setPlayers],
  );

  // TODO: Think about toolbar at the top in TeamSelection component :)

  useEffect(() => {
    if (query && query.length && setQuery) {
      setQuery((query) =>
        query.filter(([target, player]) => {
          const targetIdx = players.findIndex(
            (p) => p.item && p.item.player_stats.id === target.item!.player_stats.id,
          );

          handlePlayerDrop(targetIdx, players[targetIdx].item!.is_on_bench)(player.item!);

          return false;
        }),
      );
    }
  }, [query, setQuery, handlePlayerDrop, players]);

  return (
    <S.Container className='bg-secondary rounded'>
      {disabled && !players.some((p) => p.item) && (
        <S.EmptyMessage>
          <p>{t('Gameweek.resultPending')}</p>
        </S.EmptyMessage>
      )}
      {players.length > 0 && (
        <>
          <S.Tooltip>
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
            {(buttonText === submitText) && (
              <S.TransfScoreMoney>
                <tr>
                  <td>{ t('TransfersTeamSelection.freeTransfers') }</td>
                  <td>{ t('TransfersTeamSelection.score') }</td>
                  <td>{ t('TransfersTeamSelection.money') }</td>
                </tr>
                <tr>
                  <td>{ user!.free_transfers }</td>
                  <td>{ user!.score }</td>
                  <td>{ user!.money }</td>
                </tr>
              </S.TransfScoreMoney>
            )}
            {submit && (
              <S.Submit
                className='rounded'
                disabled={!submit.canSubmit}
                onClick={submit.onSubmit}
              >
                {submit.label}
              </S.Submit>
            )}
          </S.Tooltip>

          {view === 'pitch' && (
            <Pitch
              players={players}
              hasBench={hasBench}
              onPlayerDrop={handlePlayerDrop}
              onPlayerClick={onPlayerClick}
              disabled={disabled}
              showFixtures={showFixtures}
            />
          )}

          {view === 'list' && (
            <TeamList
              players={players}
              hasBench={hasBench}
              onPlayerClick={onPlayerClick}
            />
          )}
        </>
      )}
    </S.Container>
  );
};

export default TeamSelection;
