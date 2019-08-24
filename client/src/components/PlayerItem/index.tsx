import React from 'react';
import { useDrag } from 'react-dnd';

export const PlayerItem = (props: any) => {
  const {
    id,
    name,
    club_id,
    club,
    position,
    price,
    score,
    info,
    imageURL,
    onOpenInfo,
  } = props;

  const [, drag] = useDrag({
    item: {
      id,
      type: position,
      src: imageURL,
      name,
      club,
      price,
      points: score,
    },
  });

  return (
    <tr ref={drag} className='bg-white'>
      <td className='w-1/6' align='center' valign='middle'>
        <button
          className='p-1 flex justify-center opacity-50 hover:opacity-75'
          onClick={() => {
            if (onOpenInfo) {
              onOpenInfo(id, club_id);
            }
          }}
        >
          <img src={info} alt='info' />
        </button>
      </td>
      <td className='w-3/6' valign='middle'>
        <button className='flex flex-row'>
          <img className='w-8 mr-2 my-1' src={imageURL} alt='player' />
          <div className='flex flex-col items-start justify-center'>
            <div className='w-20 text-left truncate'>{name}</div>
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
