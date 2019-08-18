import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

import './styles.scss';
import { is } from 'uuidv4';

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
  form: string;
  gameweek_points: string;
  fixture: string;
  isGameweek: boolean;
  onOpen?: (id: string, isCaptain: boolean, isViceCaptain: boolean, name: string) => void;
  captainId?: string;
  viceCaptainId?: string;
}

const PlayerSelection = ({
  id,
  index,
  src,
  name,
  club,
  type,
  points,
  form,
  gameweek_points,
  fixture,
  isGameweek,
  onOpen,
  captainId,
  viceCaptainId,
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
      form,
      gameweek_points,
      fixture,
    },
    collect: (monitor) => ({ opacity: monitor.isDragging ? 1 : 0 }),
  });

  if (!isGameweek) {
    drag(ref);
  }
  const isCaptain = captainId === id;
  const isViceCaptain = viceCaptainId === id;
  return (
    <div
      ref={ref}
      className='text-center relative'
      onClick={() => {
        if (onOpen) {
          onOpen(id, isCaptain, isViceCaptain, name);
        }
      }}
    >
      <div>
        <div className='absolute'>
          {isGameweek ? null : (
            <React.Fragment>
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
              {(isCaptain || isViceCaptain) && (
                <svg width='24' height='24' viewBox='0 0 24 24'>
                  <circle cx='12' cy='12' r='12'></circle>
                  {isCaptain && (
                    <path
                      d='M15.0769667,14.370341 C14.4472145,15.2780796 13.4066319,15.8124328 12.3019667,15.795341 C10.4380057,15.795341 8.92696674,14.284302 8.92696674,12.420341 C8.92696674,10.55638 10.4380057,9.045341 12.3019667,9.045341 C13.3988206,9.06061696 14.42546,9.58781014 15.0769667,10.470341 L17.2519667,8.295341 C15.3643505,6.02401882 12.1615491,5.35094208 9.51934028,6.67031017 C6.87713147,7.98967826 5.49079334,10.954309 6.17225952,13.8279136 C6.8537257,16.7015182 9.42367333,18.7279285 12.3769667,18.720341 C14.2708124,18.7262708 16.0646133,17.8707658 17.2519667,16.395341 L15.0769667,14.370341 Z'
                      fill='white'
                    ></path>
                  )}
                  {isViceCaptain && (
                    <polygon
                      points='13.5 .375 8.925 12.375 4.65 12.375 0 .375 3.15 .375 6.75 10.05 10.35 .375'
                      transform='translate(5.25 6)'
                      fill='white'
                    ></polygon>
                  )}
                </svg>
              )}
            </React.Fragment>
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
