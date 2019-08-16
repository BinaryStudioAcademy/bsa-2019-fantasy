import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

import Player from '../PlayerSelection';
import './styles.scss';
import { Stream } from 'stream';

export interface PlayerDroppable {
  accept: string;
  lastDroppedItem: any;
}
export interface PlayerDroppableProps {
  index: number;
  accept: string;
  onDrop: (item: any) => void;
  lastDroppedItem: any;
  isGameweek: boolean;
  onOpen?: any;
  captainId?: string;
  viceCaptainId?: string;
}

export interface BenchDroppable {
  accept: string[];
  lastDroppedItem: any;
}
export interface BenchDroppableProps {
  index: number;
  accept: string[];
  onDrop: (item: any) => void;
  lastDroppedItem: any;
  isGameweek: boolean;
  onOpen?: any;
  captainId?: string;
  viceCaptainId?: string;
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
  if (!isGameweek) {
    drop(ref);
  }

  return (
    <div ref={ref}>
      <div className='player-placeholder' style={{ backgroundColor }}>
        <div className='player-type'>{isActive ? 'Release to drop' : null}</div>

        {lastDroppedItem && (
          <Player
            id={lastDroppedItem.id}
            index={index}
            src={lastDroppedItem.src}
            name={lastDroppedItem.name}
            club={lastDroppedItem.club}
            type={lastDroppedItem.type}
            points={lastDroppedItem.points}
            isGameweek={isGameweek}
            onOpen={onOpen}
            captainId={captainId}
            viceCaptainId={viceCaptainId}
          />
        )}
      </div>
    </div>
  );
};

export default PlayerSelectionDroppable;
