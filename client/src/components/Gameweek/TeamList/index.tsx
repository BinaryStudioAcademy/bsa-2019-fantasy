import React from 'react';

import './styles.scss';
import TeamItem from '../TeamItem';
import info from 'assets/images/info.svg';

const TeamList = () => {
  return (
    <div>
      <thead>
      <tr className='bg-green-100'>
      <td className='w-1/12' align='center' valign='middle'>
      </td>
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
      <tbody className='w-3/4 bg-white p-3'>
        <TeamItem
          name='Alison'
          club='Liv'
          position='GKP'
          imageURL='images/uniforms/goalkeepers/shirt_43_1-66.png'
          form='1.5'
          gameweek_points='300'
          total_points='100'
          fixture='ARS (H)'
          info={info}
        />
        <TeamItem
          name='Alison'
          club='Liv'
          position='GKP'
          imageURL='images/uniforms/goalkeepers/shirt_43_1-66.png'
          form='1.5'
          gameweek_points='300'
          total_points='100'
          fixture='ARS (H)'
          info={info}
        />
        <TeamItem
          name='Alison'
          club='Liv'
          position='GKP'
          imageURL='images/uniforms/goalkeepers/shirt_43_1-66.png'
          form='1.5'
          gameweek_points='300'
          total_points='100'
          fixture='ARS (H)'
          info={info}
        />
        <TeamItem
          name='Alison'
          club='Liv'
          position='GKP'
          imageURL='images/uniforms/goalkeepers/shirt_43_1-66.png'
          form='1.5'
          gameweek_points='300'
          total_points='100'
          fixture='ARS (H)'
          info={info}
        />
      </tbody>
    </div>
  );
};

export default TeamList;
