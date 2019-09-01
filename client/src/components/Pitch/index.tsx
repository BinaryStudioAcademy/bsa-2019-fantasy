import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { PlayerPosition } from 'components/Gameweek/PlayerSelection/types';
import { PitchPlayerType, DisplayPlayerType } from './types';

import PitchPlayer from './components/PitchPlayer';

import * as S from './styles';
type Props = {
  players: PitchPlayerType[];
  hasBench: boolean;
  disabled?: boolean;

  onPlayerDrop: (target: number, benched: boolean) => (player: DisplayPlayerType) => void;
  onPlayerClick?: (player: DisplayPlayerType) => void;
};

export const Pitch = ({
  players,
  hasBench,
  disabled = false,
  onPlayerDrop,
  onPlayerClick,
}: Props) => {
  const order: PlayerPosition[] = ['GKP', 'DEF', 'MID', 'FWD'];

  // REMOVE THIS
  console.log('PITCH');
  console.log(players);
  return (
    <S.Container>
      <DndProvider backend={HTML5Backend}>
        <S.Pitch>
          {order.map((type) => (
            <S.TeamRow key={`pitch-team-row-${type}`}>
              {players
                .filter(
                  (p) => p.type === type && !(hasBench && (p.item && p.item.is_on_bench)),
                )
                .map((p, idx) => (
                  <PitchPlayer
                    index={players.indexOf(p)}
                    type={type}
                    player={p.item}
                    disabled={disabled}
                    onDrop={onPlayerDrop}
                    onClick={onPlayerClick}
                    key={`pitch-${type.toString()}-${
                      p.item ? p.item.player_stats.id : idx
                    }`}
                  />
                ))}
            </S.TeamRow>
          ))}
        </S.Pitch>
        {hasBench && (
          <S.Bench className='rounded'>
            {players
              .filter((p) => p.item && p.item.is_on_bench)
              .map((p, idx) => (
                <PitchPlayer
                  index={players.indexOf(p)}
                  type={
                    p.item ? p.item.player_stats.position : ['GKP', 'DEF', 'MID', 'FWD']
                  }
                  benched
                  player={p.item}
                  disabled={disabled}
                  onDrop={onPlayerDrop}
                  onClick={onPlayerClick}
                  key={`bench-${p.item ? p.item.player_stats.id : idx}`}
                />
              ))}
          </S.Bench>
        )}
      </DndProvider>
    </S.Container>
  );
};
