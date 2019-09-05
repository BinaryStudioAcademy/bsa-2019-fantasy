import cn from 'classnames';
import moment from 'moment';

import React, { useRef } from 'react';
import { FaFutbol } from 'react-icons/fa';
import { useDrop, useDrag } from 'react-dnd';

import { DisplayPlayerType, PitchPlayerType } from '../../types';
import { PlayerPosition } from 'components/Gameweek/PlayerSelection/types';

import * as S from './styles';

type Props = {
  index: number;
  player: PitchPlayerType;
  disabled: boolean;
  showFixtures: boolean;
  benched?: boolean;

  onDrop: (targetIdx: number, benched: boolean) => (dropped: DisplayPlayerType) => any;
  onClick?: (player: DisplayPlayerType) => void;
};

const PitchPlayer = ({
  index,
  player: { type, accept, item: player },
  disabled,
  showFixtures,
  benched = false,
  onDrop,
  onClick,
}: Props) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop }, drop] = useDrop<
    DisplayPlayerType & { type: PlayerPosition },
    DisplayPlayerType,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: accept || ['GKP', 'DEF', 'MID', 'FWD'],
    drop: onDrop(index, benched),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ opacity }, drag] = useDrag({
    canDrag: player !== null,
    item: { ...player, type: player ? type : 'none' },
    collect: (monitor) => ({ opacity: monitor.isDragging ? 1 : 0 }),
  });

  const isActive = isOver && canDrop;
  const renderNextFixtureInfo = () => {
    if (player) {
      const isHome = player.upcomingFixture.isHome ? '(H)' : '(A)';
      return (
        <p>
          {player.upcomingFixture.fixture}{' '}
          {moment(player.upcomingFixture.start).calendar()} {isHome}
        </p>
      );
    }
  };

  let backgroundColor = 'rgba(34, 34, 34, 0.3)';
  if (player && player.display.highlight) {
    backgroundColor = player.display.highlight;
  } else if (isActive) {
    backgroundColor = 'rgba(0, 111, 55, 0.9)';
  } else if (canDrop) {
    backgroundColor = 'rgba(57, 90, 50, 0.9)';
  }

  if (!disabled) {
    drop(dropRef);

    drag(dragRef);
  }
  return (
    <S.Container className='shadow rounded' style={{ backgroundColor }} ref={dropRef}>
      {isActive && (
        <S.Spinner>
          <FaFutbol />
        </S.Spinner>
      )}

      {player && (
        <S.Player
          className={cn(!disabled && 'cursor-pointer')}
          onClick={() => onClick && onClick(player)}
          ref={dragRef}
        >
          {(player.is_captain || player.is_vice_captain) && (
            <S.PlayerBadge>
              <svg width='24' height='24' viewBox='0 0 24 24'>
                <circle cx='12' cy='12' r='12' fill='rgba(0,0,0,0.2)' />
                {player.is_captain && (
                  <path
                    d='M15.0769667,14.370341 C14.4472145,15.2780796 13.4066319,15.8124328 12.3019667,15.795341 C10.4380057,15.795341 8.92696674,14.284302 8.92696674,12.420341 C8.92696674,10.55638 10.4380057,9.045341 12.3019667,9.045341 C13.3988206,9.06061696 14.42546,9.58781014 15.0769667,10.470341 L17.2519667,8.295341 C15.3643505,6.02401882 12.1615491,5.35094208 9.51934028,6.67031017 C6.87713147,7.98967826 5.49079334,10.954309 6.17225952,13.8279136 C6.8537257,16.7015182 9.42367333,18.7279285 12.3769667,18.720341 C14.2708124,18.7262708 16.0646133,17.8707658 17.2519667,16.395341 L15.0769667,14.370341 Z'
                    fill='white'
                  />
                )}
                {player.is_vice_captain && (
                  <polygon
                    points='13.5 .375 8.925 12.375 4.65 12.375 0 .375 3.15 .375 6.75 10.05 10.35 .375'
                    transform='translate(5.25 6)'
                    fill='white'
                  />
                )}
              </svg>
            </S.PlayerBadge>
          )}
          {player.display.src && (
            <img
              className='w-18'
              style={{ opacity }}
              src={player.display.src}
              alt='player'
            />
          )}
          <div className='absolute bottom-0 left-0 w-full'>
            <div className='px-1 w-full text-sm bg-green-800 text-white text-center truncate'>
              {player.player_stats.second_name}
            </div>
            <div className='bg-green-400 text-xs leading-tight whitespace-no-wrap overflow-hidden'>
              {showFixtures && player.upcomingFixture
                ? renderNextFixtureInfo()
                : disabled
                ? player.player_stats.player_score
                : player.player_stats.player_price}
            </div>
          </div>
        </S.Player>
      )}
    </S.Container>
  );
};

export default PitchPlayer;
