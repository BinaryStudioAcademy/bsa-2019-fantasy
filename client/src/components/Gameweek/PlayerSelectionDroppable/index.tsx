import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Stream } from 'stream';

import Player from '../PlayerSelection';
import styles from './styles.module.scss';
import { GameweekHistoryType } from 'types/gameweekHistory.type';

export interface PlayerDroppable {
  accept: any;
  lastDroppedItem: any;
}
export interface PlayerDroppableProps {
  index: number;
  accept: any;
  onDrop: (item: any) => void;
  lastDroppedItem: any;
  isGameweek: boolean;
  onOpen?: (id: string, isCaptain: boolean, isViceCaptain: boolean, name: string) => void;
  captainId?: string;
  viceCaptainId?: string;
  playerToSwitch?: GameweekHistoryType | undefined;
  setCurrentPlayerForSwitching?: (id: string) => void;
}

export interface BenchDroppable {
  accept: any;
  lastDroppedItem: any;
}
export interface BenchDroppableProps {
  index: number;
  accept: any;
  onDrop: (item: any) => void;
  lastDroppedItem: any;
  isGameweek: boolean;
  onOpen?: (id: string, isCaptain: boolean, isViceCaptain: boolean, name: string) => void;
  captainId?: string;
  viceCaptainId?: string;
  playerToSwitch?: GameweekHistoryType | undefined;
  setCurrentPlayerForSwitching?: (id: string) => void;
}
const PlayerSelectionDroppable = ({
  accept,
  index,
  onDrop,
  lastDroppedItem,
  isGameweek,
  onOpen,
  captainId,
  viceCaptainId,
  playerToSwitch,
  setCurrentPlayerForSwitching,
}: PlayerDroppableProps | BenchDroppableProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive: boolean = isOver && canDrop;
  let backgroundColor = 'rgba(34, 34, 34, 0.212)';
  if (isActive) {
    backgroundColor = 'rgba(0, 111, 55, 0.9)';
  } else if (canDrop) {
    backgroundColor = 'rgba(118, 124, 37, 0.9)';
  }

  const canSwitch = playerToSwitch && playerToSwitch.player_stats.position === accept;

  if (playerToSwitch) {
    if (playerToSwitch.player_stats.id === lastDroppedItem.id) {
      backgroundColor = 'rgba(255, 255, 0, 0.6)';
    } else if (canSwitch) {
      backgroundColor = 'rgba(255, 102, 0, 0.6)';
    }
  }

  if (!isGameweek) {
    drop(ref);
  }

  return (
    <div ref={ref}>
      <div className={styles['player-placeholder']} style={{ backgroundColor }}>
        <div className={styles['player-type']}>{isActive ? 'Release to drop' : null}</div>

        {lastDroppedItem && (
          <Player
            id={lastDroppedItem.id}
            index={index}
            src={lastDroppedItem.src}
            name={lastDroppedItem.name}
            club={lastDroppedItem.club}
            type={lastDroppedItem.type}
            points={lastDroppedItem.points}
            form={lastDroppedItem.form}
            gameweek_points={lastDroppedItem.gameweek_points}
            fixture={lastDroppedItem.fixture}
            isGameweek={isGameweek}
            onOpen={onOpen}
            captainId={captainId}
            viceCaptainId={viceCaptainId}
            playerToSwitch={playerToSwitch}
            setCurrentPlayerForSwitching={setCurrentPlayerForSwitching}
            canSwitch={canSwitch}
          />
        )}
      </div>
    </div>
  );
};

export default PlayerSelectionDroppable;
