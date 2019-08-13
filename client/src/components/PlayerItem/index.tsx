import React from 'react';

export const PlayerItem = (props: any) => {
  const { name, club, position, price, score, info, shirt } = props;
  return (
    <tr className='bg-white'>
      <td className='w-1/6' align='center' valign='middle'>
        <button>
          <img src={info} alt='info' />
        </button>
      </td>
      <td className='w-3/6' valign='middle'>
        <button className='flex flex-row'>
          <img className='w-8 mr-2' src={shirt} alt='player' />
          <div className='flex flex-col items-start'>
            <div>{name}</div>
            <div>
              <span className='mr-1'>{club}</span>
              <span>{position}</span>
            </div>
          </div>
        </button>
      </td>
      <td className='w-1/6'>{price}</td>
      <td className='w-1/6'>{score}</td>
    </tr>
  );
};
