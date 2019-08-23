import React from 'react';

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
          className={`w-1/12 ${stylesItem['table-item']}`}
          align='center'
          valign='middle'
        />
        <td className={`w-1/12 text-center ${stylesItem['table-item']}`} />
        <td className={`w-5/12 text-base ${stylesItem['table-item']}`} valign='middle'>
          {name}
        </td>
        <td className={`w-1/12 text-base ${stylesItem['table-item']}`}>Pos</td>
        <td className={`w-1/12 text-base ${stylesItem['table-item']}`}>Goals</td>
        <td className={`w-1/12 text-base ${stylesItem['table-item']}`}>MS</td>
        <td className={`w-1/12 text-base ${stylesItem['table-item']}`}>PTS</td>
        <td className={`w-1/12 text-base ${stylesItem['table-item']}`}>RC</td>
      </tr>
    </thead>
  );
};

export default TeamItemHeader;
