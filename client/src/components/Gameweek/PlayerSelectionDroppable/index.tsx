import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

import Player from '../PlayerSelection';
import './styles.scss';

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
}
const PlayerSelectionDroppable = ({
  accept,
  index,
  onDrop,
  lastDroppedItem,
  isGameweek,
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
            name={`${lastDroppedItem.first_name} ${lastDroppedItem.second_name}`}
            club={lastDroppedItem.club}
            type={lastDroppedItem.type}
            points={lastDroppedItem.player_score}
            isGameweek={isGameweek}
          />
        )}
      </div>
    </div>
  );
};

export default PlayerSelectionDroppable;
