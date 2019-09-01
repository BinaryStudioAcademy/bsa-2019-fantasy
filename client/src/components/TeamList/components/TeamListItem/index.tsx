import React from 'react';
import cn from 'classnames';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { RootState } from 'store/types';
import { DisplayPlayerType } from 'components/Pitch/types';

const Container = styled.tr<{ highlight?: string }>`
  width: 100%;
  display: flex;

  ${({ highlight }) =>
    highlight
      ? css`
          background-color: ${highlight};
        `
      : ''}

  transition: background-color .16s;

  > td {
    height: 4rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

type Props = {
  player: DisplayPlayerType | null;
  onClick?: (player: DisplayPlayerType) => void;
};

const TeamListItem = ({ player, onClick }: Props) => {
  const club = useSelector((state: RootState) =>
    player ? state.clubs.clubs[player.player_stats.club_id - 1].short_name : null,
  );

  return (
    <Container highlight={player ? player.display.highlight : ''}>
      {player ? (
        <>
          <td className='w-1/12'>
            {(player.is_captain || player.is_vice_captain) && (
              <svg width='24' height='24' viewBox='0 0 24 24'>
                <circle cx='12' cy='12' r='12' />
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
            )}
          </td>
          <td className='w-6/12 justify-start border-r-2 border-gray-200'>
            <div
              className={cn(
                'w-full flex flex-row items-center',
                onClick && 'cursor-pointer',
              )}
              onClick={() => player && onClick && onClick(player)}
              role='presentation'
            >
              {player.display.src && (
                <img
                  className='w-8 mr-2'
                  src={player.display.src}
                  alt={`${club} player`}
                />
              )}
              <div className='flex flex-col items-start justify-center'>
                <div className='text-left w-full truncate text-base'>
                  {player.player_stats.second_name}
                </div>
                <div className='text-xs'>
                  {club && <span className='mr-1'>{club}</span>}
                  <span>{player.player_stats.position}</span>
                </div>
              </div>
            </div>
          </td>
          <td className='w-1/12'>{player.player_stats.position}</td>
          <td className='w-1/12'>{player.player_stats.goals}</td>
          <td className='w-1/12'>{player.player_stats.missed_passes}</td>
          <td className='w-1/12'>{player.player_stats.player_score}</td>
          <td className='w-1/12'>{player.player_stats.red_cards}</td>
        </>
      ) : (
        <td className='w-full'>Unassigned</td>
      )}
    </Container>
  );
};

export default TeamListItem;
