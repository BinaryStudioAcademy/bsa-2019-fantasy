import cn from 'classnames';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store/types';

import Spinner from 'components/Spinner';
import { getClubLogoUrl } from 'helpers/images';

import styles from './styles.module.scss';

const FavouriteClubSelection = () => {
  const favoriteClub = useSelector(
    ({ profile }: RootState) => profile.user && profile.user.favorite_club_id,
  );
  const { clubs, loading } = useSelector((state: RootState) => state.clubs);
  const [selectedClubId, setClub] = useState<null | number>(favoriteClub);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedClubId !== null && clubs.find((c) => c.id === selectedClubId)) {
      console.log('Submitting fav club:', clubs.find((c) => c.id === selectedClubId));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className='mb-12 text-5xl font-bold'>Favourite club</h2>

      <div className={styles.clubsList}>
        {clubs.map((item) => {
          const isSelected = item.id === selectedClubId;

          return (
            <label className='cursor-pointer' key={`selectedClubId-${item.id}`}>
              <input
                className='hidden'
                type='checkbox'
                checked={isSelected}
                value={item.id}
                onChange={(e) => setClub(+e.target.value)}
              />
              <div className={cn(styles.clubLabel, 'h-full w-full rounded shadow')}>
                <img
                  className='rounded w-10'
                  src={getClubLogoUrl(item.code, 200)}
                  alt={`Club ${item.name}`}
                />
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
