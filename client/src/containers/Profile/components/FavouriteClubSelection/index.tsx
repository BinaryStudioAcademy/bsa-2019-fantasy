import React, { useState } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type FootballClub = {
  id: string;
  name: string;
  badge: string;
};

const mockData: FootballClub[] = Array(10)
  .fill({
    id: '',
    name: 'Some football team',
    badge: 'https://via.placeholder.com/50',
  })
  .map((c, idx) => ({ ...c, id: idx + '' }));

const FavouriteClubSelection = () => {
  const [club, setClub] = useState<null | string>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (club !== null) {
      console.log('Submitting fav club:', mockData.find((c) => c.id === club));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='mb-12 text-5xl font-bold'>Favourite club</h2>

      <div className={styles.clubsList}>
        {mockData.map((item) => {
          const isSelected = item.id === club;

          return (
            <label className='cursor-pointer' key={`club-${item.id}`}>
              <input
                className='hidden'
                type='checkbox'
                checked={isSelected}
                value={item.id}
                onChange={(e) => setClub(e.target.value)}
              />
              <div className={cn(styles.clubLabel, 'h-full w-full rounded shadow')}>
                <img className='rounded' src={item.badge} alt={`Club ${item.name}`} />
                <span className='text-secondary text-sm leading-none font-bold'>
                  {item.name}
                </span>
              </div>
            </label>
          );
        })}
      </div>
      <button
        type='submit'
        className='mt-12 py-2 px-16 text-lg max-w-xs rounded shadow bg-primary text-secondary font-bold'
      >
        Submit
      </button>
    </form>
  );
};

export default FavouriteClubSelection;
