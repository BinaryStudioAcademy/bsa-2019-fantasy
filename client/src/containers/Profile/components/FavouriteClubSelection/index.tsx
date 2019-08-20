import cn from 'classnames';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from 'store/types';
import { updateFavoriteClub } from 'containers/Profile/actions';

import Spinner from 'components/Spinner';
import { getClubLogoUrl } from 'helpers/images';

import styles from './styles.module.scss';

const FavouriteClubSelection = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const favoriteClub = useSelector(
    ({ profile }: RootState) => profile.user && profile.user.favorite_club_id,
  );
  const { clubs, loading } = useSelector((state: RootState) => state.clubs);
  const [selectedClubId, setClub] = useState<null | number>(favoriteClub);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      selectedClubId !== null &&
      selectedClubId !== favoriteClub &&
      clubs.find((c) => c.id === selectedClubId)
    ) {
      dispatch(updateFavoriteClub(selectedClubId));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className='mb-12 text-5xl font-bold'>{t('Profile.favouriteClub.title')}</h2>

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
              <div className={cn(styles.clubLabel, 'h-full w-full rounded shadow p-2')}>
                <img
                  className='rounded w-10'
                  src={getClubLogoUrl(item.code, 200)}
                  alt={`Club ${item.name}`}
                />
                <span className='text-sm leading-none font-bold'>{item.name}</span>
              </div>
            </label>
          );
        })}
      </div>
      <button
        type='submit'
        className='mt-12 py-2 px-16 text-lg max-w-xs rounded shadow bg-primary text-secondary font-bold'
      >
        {t('submit')}
      </button>
    </form>
  );
};

export default FavouriteClubSelection;
