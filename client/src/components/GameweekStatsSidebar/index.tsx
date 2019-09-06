import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';

export const GameweekStatsSidebar = ({ gameweekHistory, userRank }) => {
  const { t } = useTranslation();
  return (
    <div className='flex-1 flex flex-col p-8 rounded bg-white shadow-figma'>
      <h2 className='text-secondary font-bold text-3xl mb-4'>This Gameweek</h2>
      <h3 className='text-secondary font-semibold text-xl mb-1'>
        {t('GameweekHistoryPage.currentPoints')}
      </h3>
      <p className='pl-3'>
        <span className='font-semibold'>
          {gameweekHistory ? gameweekHistory.team_score : '0'}
        </span>
        {` ${t('GameweekHistoryPage.points')}`}
      </p>
      <h3 className='text-secondary font-semibold text-xl mt-4 mb-1 '>
        {t('GameweekHistoryPage.overallRank')}
      </h3>
      {userRank ? (
        <p className='pl-3'>
          <span className='font-semibold'>{userRank.rank}</span>
        </p>
      ) : null}
      <div className='entry-history-btn mt-8'>
        <Button type='link' href='/entry-history' styling='primary'>
          {t('EntryHistory.title')}
        </Button>
      </div>
    </div>
  );
};
