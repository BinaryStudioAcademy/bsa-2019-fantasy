import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

import './styles.scss';

export interface PlayerInfo {
  id: string;
  src: string;
  name: string;
  club: string;
  type: string;
  points: number;
}

export interface PlayerDraggableProps {
  id: string;
  index: number;
  src: string;
  name: string;
  club: string;
  type: string;
  points: number;
  isGameweek: boolean;
  onOpen?: any;
}

const PlayerSelection = ({
  id,
  index,
  src,
  name,
  club,
  type,
  points,
  isGameweek,
  onOpen
}: PlayerDraggableProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ opacity }, drag] = useDrag({
    item: {
      id,
      index,
      type,
      src,
      name,
      club,
      points,
    },
    collect: (monitor) => ({ opacity: monitor.isDragging ? 1 : 0 }),
  });

  if (!isGameweek) {
    drag(ref);
  }
  return (
    <div ref={ref} className='text-center relative' onClick={() => onOpen(true)}>
      <div>
        <div className='absolute'>
          {isGameweek ? null : (
            <svg width='18' height='24' viewBox='0 0 24 24'>
              <g fill='none'>
                <path
                  fill='#E9FF03'
                  d='M19.5,24 L4.5,24 C2.01471863,24 3.04359188e-16,21.9852814 0,19.5 L0,4.5 C-3.04359188e-16,2.01471863 2.01471863,4.56538782e-16 4.5,0 L19.5,0 C21.9852814,1.52179594e-16 24,2.01471863 24,4.5 L24,19.5 C24,21.9852814 21.9852814,24 19.5,24 Z'
                />

                <path
                  fill='#C0020D'
                  d='M9,11.55 C8.80217305,11.5471822 8.61347285,11.4663107 8.475,11.325 L3.675,6.525 C3.45105733,6.22640977 3.48075095,5.80858888 3.74466991,5.54466991 C4.00858888,5.28075095 4.42640977,5.25105733 4.725,5.475 L9,9.75 L13.275,5.475 C13.5735902,5.25105733 13.9914111,5.28075095 14.2553301,5.54466991 C14.5192491,5.80858888 14.5489427,6.22640977 14.325,6.525 L9.52499213,11.3249921 C9.38652715,11.4663107 9.19782695,11.5471822 9,11.55 Z'
                />
                <path
                  fill='#009A4C'
                  d='M20.4,18.75 C20.202173,18.7471822 20.0134728,18.6663107 19.875,18.525 L15.6,14.25 L11.325,18.525 C11.0264098,18.7489427 10.6085889,18.7192491 10.3446699,18.4553301 C10.0807509,18.1914111 10.0510573,17.7735902 10.275,17.475 L15.075,12.675 C15.3666326,12.3891428 15.8333674,12.3891428 16.125,12.675 L20.925,17.475 C21.1350898,17.6892752 21.1972317,18.0081534 21.082974,18.2856363 C20.9687163,18.5631193 20.7000564,18.745785 20.4,18.75 Z'
                />
              </g>
            </svg>
          )}
        </div>
        <img
          style={{ opacity }}
          src={src}
          className='player-img player-shadow'
          alt='player'
        />
        <div>
          <div className='player-name'> {name}</div>
          <div className='player-club'>{isGameweek ? points : club}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSelection;
