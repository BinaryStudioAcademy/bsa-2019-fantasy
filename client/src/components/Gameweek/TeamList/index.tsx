import React from 'react';

import './styles.scss';
import TeamItem from '../TeamItem';
import info from 'assets/images/info.svg';

const TeamList = ({ starters, substitutes }: any) => {
  const players = starters.map(({ lastDroppedItem, accept }) => (
    <TeamItem
      info={info}
      name={lastDroppedItem.name}
      imageURL={lastDroppedItem.src}
      club={lastDroppedItem.club}
      position={accept}
      form={lastDroppedItem.form}
      gameweek_points={lastDroppedItem.gameweek_points}
      total_points={lastDroppedItem.points}
      fixture={lastDroppedItem.fixture}
    />
  ));
  return (
    <table className='team-list'>
      <thead>
        <tr className='bg-green-100'>
          <td className='w-1/12' align='center' valign='middle'></td>
          <td className='w-1/12 text-center'></td>
          <td className='w-5/12' valign='middle'>
            Starters
          </td>
          <td className='w-1/12'>Pos</td>
          <td className='w-1/12'>Form</td>
          <td className='w-1/12'>GW</td>
          <td className='w-1/12'>PTS</td>
          <td className='w-1/12'>Fix</td>
        </tr>
      </thead>
      <tbody className='w-3/4 bg-white p-3'>{players}</tbody>
    </table>
  );
};

export default TeamList;
