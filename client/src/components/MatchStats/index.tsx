import React from 'react';

import styles from './styles.module.scss';

type Props = {
  title: string;
  hometeam_stats: any;
  awayteam_stats: any;
};

const MatchStats = ({ title, hometeam_stats, awayteam_stats }: Props) => {
  const mapArray = (array: any) =>
    array.map((item: any) => (
      <div className={styles['stats-item']} key={`stats-item-${item.player}`}>
        {item.player} <span className='count'>( {item.count} )</span>
      </div>
    ));

  return (
    <div className={`w-4/5 ${styles.stats} mb-3`}>
      <h2 className='text-center bg-green-900 text-white p-1 font-bold'>{title}</h2>
      <div className='flex bg-white p-3'>
        <div className={`${styles['left-team']} ${styles.teamstats}`}>
          {mapArray(hometeam_stats)}
        </div>
        <div className={`${styles['right-team']} ${styles.teamstats}`}>
          {mapArray(awayteam_stats)}
        </div>
      </div>
    </div>
  );
};

export default MatchStats;
