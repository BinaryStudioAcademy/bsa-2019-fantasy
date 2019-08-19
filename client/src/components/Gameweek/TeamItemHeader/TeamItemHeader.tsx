import React from 'react';

import styles from '../TeamList/styles.module.scss';

type Props = {
  name: string;
};

const TeamItemHeader = ({ name }: Props) => {
  return (
    <thead>
      <tr className={styles['table-header']}>
        <td className='w-1/12' align='center' valign='middle' />
        <td className='w-1/12 text-center' />
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
