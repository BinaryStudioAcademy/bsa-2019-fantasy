import React from 'react';

import './styles.scss';

const TeamItem = ({
  info,
  imageURL,
  name,
  club,
  position,
  form,
  gameweek_points,
  total_points,
  fixture,
}: any) => {
  return (
    <tr className='bg-white w-full'>
      <td className='team-item w-2/12' align='center' valign='middle'>
        <button>
          <img src={info} alt=' info' />
        </button>
      </td>
      <td className='team-item w-5/12' valign='middle'>
        <button className='flex flex-row'>
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
      <td className='team-item w-1/12'>{form}</td>
      <td className='team-item w-1/12'>{gameweek_points}</td>
      <td className='team-item w-1/12'>{total_points}</td>
      <td className='team-item w-2/12'>{fixture}</td>
    </tr>
  );
};

export default TeamItem;
