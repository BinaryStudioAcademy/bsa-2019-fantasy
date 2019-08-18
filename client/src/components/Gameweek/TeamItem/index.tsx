import React from 'react';

import './styles.scss';

type Props = {
  id: string;
  imageURL: string;
  info: string;
  name: string;
  club: string;
  position: string;
  total_points: number;
  form: number;
  gameweek_points: number;
  fixture: string;
  isGameweek: boolean;
  onOpen?: (id: string, isCaptain: boolean, isViceCaptain: boolean, name: string) => void;
  captainId?: string;
  viceCaptainId?: string;
};

const TeamItem = ({
  id,
  info,
  imageURL,
  name,
  club,
  position,
  form,
  gameweek_points,
  total_points,
  fixture,
  isGameweek,
  onOpen,
  captainId,
  viceCaptainId,
}: Props) => {
  const isCaptain = captainId === id;
  const isViceCaptain = viceCaptainId === id;
  return (
    <tr className='bg-white w-full'>
      <td className='w-1/12' align='center' valign='middle'>
        <button>
          <img src={info} alt=' info' />
        </button>
      </td>
      <td className='w-1/12 text-center'>
        {' '}
        {!isGameweek && (
          <React.Fragment>
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
      </td>
      <td className='w-5/12' valign='middle'>
        <button
          className='flex flex-row w-full team-item-button'
          onClick={() => {
            if (onOpen) {
              onOpen(id, isCaptain, isViceCaptain, name);
            }
          }}
        >
          <img className='w-8 mr-2' src={imageURL} alt='player' />
          <div className='flex flex-col items-start'>
            <div>{name}</div>
            <div>
              <span className='mr-1'>{club}</span>
              <span>{position}</span>
            </div>
          </div>
        </button>
      </td>
      <td className='w-1/12 text-base'>{position}</td>
      <td className='w-1/12 text-base'>{form}</td>
      <td className='w-1/12 text-base'>{gameweek_points}</td>
      <td className='w-1/12 text-base'>{total_points}</td>
      <td className='w-1/12 text-base'>{fixture}</td>
    </tr>
  );
};

export default TeamItem;
