import React from 'react';
import cn from 'classnames';

import styles from '../TeamList/styles.module.scss';
import stylesItem from '../TeamItem/styles.module.scss';

type Props = {
  name: string;
};

const TeamItemHeader = ({ name }: Props) => {
  return (
    <thead>
      <tr className={styles['table-header']}>
        <td
          className={cn(stylesItem['table-item'], 'w-1/12')}
          align='center'
          valign='middle'
        />
        <td className={cn(stylesItem['table-item'], 'w-1/12', 'text-center')} />
        <td
          className={cn(stylesItem['table-item'], 'w-5/12', 'text-base')}
          valign='middle'
        >
          {name}
        </td>
        <td className={cn(stylesItem['table-item'], 'w-1/12', 'text-base')}>Pos</td>
        <td className={cn(stylesItem['table-item'], 'w-1/12', 'text-base')}>Goals</td>
        <td className={cn(stylesItem['table-item'], 'w-1/12', 'text-base')}>MS</td>
        <td className={cn(stylesItem['table-item'], 'w-1/12', 'text-base')}>PTS</td>
        <td className={cn(stylesItem['table-item'], 'w-1/12', 'text-base')}>RC</td>
      </tr>
    </thead>
  );
};

export default TeamItemHeader;
