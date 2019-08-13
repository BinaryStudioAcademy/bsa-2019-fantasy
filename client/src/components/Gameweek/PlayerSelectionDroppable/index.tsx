import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

import Player from '../PlayerSelection';
import './styles.scss';

export interface PlayerDroppable {
  accept: string;
  lastDroppedItem: any;
}
export interface PlayerDroppableProps {
  index: number;
  accept: string;
  onDrop: (item: any) => void;
  lastDroppedItem: any;
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
}
const PlayerSelectionDroppable = ({
  accept,
  index,
  onDrop,
  lastDroppedItem,
}: PlayerDroppableProps | BenchDroppableProps) => {
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

  return (
    <div ref={drop} className='player-placeholder' style={{ backgroundColor }}>
      <div className='player-type'>{isActive ? 'Release to drop' : null}</div>

      {lastDroppedItem && (
        <Player
          id={lastDroppedItem.id}
          index={index}
          src={lastDroppedItem.src}
          name={lastDroppedItem.name}
          club={lastDroppedItem.club}
          type={lastDroppedItem.type}
        />
      )}
    </div>
  );
};

export default PlayerSelectionDroppable;
