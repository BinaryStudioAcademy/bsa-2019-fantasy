import React from 'react';

import './styles.scss';

type Props = {
  title: string;
  hometeam_stats: any;
  awayteam_stats: any;
};

const MatchStats = ({ title, hometeam_stats, awayteam_stats }: Props) => {
  const mapArray = (array: any) =>
    array.map((item: any) => (
      <div className='stats-item font-thin'>
        {item.player} <span className='count'>{item.count}</span>
      </div>
    ));

  return (
    <div className='max-w-2xl'>
      <h2 className='text-center bg-green-900 text-white p-1 font-bold'>{title}</h2>
      <div className='flex bg-white p-3'>
        <div className='left-team teamstats'>{mapArray(hometeam_stats)}</div>
        <div className='right-team teamstats'>{mapArray(awayteam_stats)}</div>
      </div>
    </div>
  );
};

export default MatchStats;
