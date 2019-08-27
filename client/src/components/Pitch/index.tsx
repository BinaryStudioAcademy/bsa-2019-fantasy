import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { PlayerPosition } from 'components/Gameweek/PlayerSelection/types';
import { PitchPlayerType } from './types';

import PitchPlayer from './components/PitchPlayer';

import * as S from './styles';

type Props = {
  players: (PitchPlayerType | null)[];
  hasBench: boolean;
  disabled?: boolean;

  onPlayerDrop: (target: number) => (player: PitchPlayerType) => void;
  onPlayerClick?: (player: PitchPlayerType) => void;
};

export const Pitch = ({
  players,
  hasBench,
  disabled = false,
  onPlayerDrop,
  onPlayerClick,
}: Props) => {
  const order: PlayerPosition[] = ['GKP', 'DEF', 'MID', 'FWD'];

  return (
    <S.Container>
      <DndProvider backend={HTML5Backend}>
        {order.map((type) => (
          <S.TeamRow key={`pitch-team-row-${type}`}>
            {players
              .filter(
                (p) =>
                  !p ||
                  (p.player_stats.position === type && (!hasBench || !p.is_on_bench)),
              )
              .map((p, idx) => (
                <PitchPlayer
                  index={players.indexOf(p)}
                  type={type}
                  player={p}
                  disabled={disabled}
                  onDrop={onPlayerDrop}
                  onClick={onPlayerClick}
                  key={`pitch-${type.toString()}-${p ? p.player_stats.second_name : idx}`}
                />
              ))}
          </S.TeamRow>
        ))}
      </DndProvider>
    </S.Container>
  );
};
