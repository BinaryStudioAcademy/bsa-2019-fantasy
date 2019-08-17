import React from 'react';

type Props = {
  name: string;
};

const TeamItemHeader = ({ name }: Props) => {
  return (
    <thead>
      <tr className='bg-green-200'>
        <td className='w-1/12' align='center' valign='middle'></td>
        <td className='w-1/12 text-center'></td>
        <td className='w-5/12 text-base' valign='middle'>
          {name}
        </td>
        <td className='w-1/12 text-base'>Pos</td>
        <td className='w-1/12 text-base'>Form</td>
        <td className='w-1/12 text-base'>GW</td>
        <td className='w-1/12 text-base'>PTS</td>
        <td className='w-1/12 text-base'>Fix</td>
      </tr>
    </thead>
  );
};

export default TeamItemHeader;
