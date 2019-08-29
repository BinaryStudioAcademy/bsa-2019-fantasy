import React, { useEffect } from 'react';
import cn from 'classnames';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/types';

import { loadGameweeksEntryHistoryAction } from './actions';

import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { EntryHistoryType } from 'types/entryHistory.types';

const EntryHistory: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Entry History | Fantasy Football League';
  }, []);

  // USERID OF ACTIVE SESSION (!)
  // const userId = useSelector(
  //   (state: RootState) => state.profile.user && state.profile.user.id,
  // );

  /* MOCKED USER ID */
  const userId = 'b9610f47-61c4-41c4-9919-7065df5623a1';

  useEffect(() => {
    if (userId) {
      dispatch(loadGameweeksEntryHistoryAction(userId));
    }
  }, [dispatch, userId]);

  const gameweeksEntryHistoryData = useSelector(
    (state: RootState) => state.gameweeksEntryHistory,
  );

  return (
    <>
      <div
        className={cn(
          'page-wrapper',
          'bg-white',
          'text-secondary',
          'shadow-figma',
          'rounded-sm',
          'p-12',
          'justify-between',
        )}
      >
        <div className={cn('page-left-side')}>
          <div className={cn('page-title')}>
            <h2 className={cn('font-semibold', 'text-5xl', 'leading-none', 'mb-8')}>
              {t('EntryHistory.title')}
            </h2>
          </div>
          <div className={cn('this-season', 'mb-8')}>
            <div className={cn('this-season-header')}>
              <h3 className={cn('font-bold', 'text-xl', 'leading-none', 'mb-2')}>
                This Season
              </h3>
            </div>
            <div className={cn('this-season-table', 'flex', 'flex-col', 'overflow-auto')}>
              <div
                className={cn(
                  'this-season-table-header',
                  'flex',
                  'bg-gray-300',
                  'font-semibold',
                  'px-2',
                )}
              >
                <div className={cn('w-1/6')}>GW</div>
                <div className={cn('w-1/6')}>GP</div>
                <div className={cn('w-1/6')}>OP</div>
                <div className={cn('w-1/6')}>OR</div>
                <div className={cn('w-1/6')}>TR</div>
                <div className={cn('w-1/6')}>#</div>
              </div>
              {gameweeksEntryHistoryData.gameweeksEntryHistory.map(
                (item: EntryHistoryType, index: number, array: EntryHistoryType[]) => (
                  <div
                    className={cn(
                      'this-season-table-content-row',
                      'flex',
                      'px-2',
                      'border-b',
                    )}
                  >
                    <div className={cn('w-1/6')}>
                      <a href='/404'>{item.gameweek.name}</a>
                    </div>
                    <div className={cn('w-1/6')}>{item.team_score}</div>
                    <div className={cn('w-1/6')}>
                      {/* to review formula, or to extract logic to db */}
                      {index === 0
                        ? array[index].team_score
                        : array[index].team_score + array[index - 1].team_score}
                    </div>
                    <div className={cn('w-1/6')}>{item.gameweekUserRank}</div>
                    <div className={cn('w-1/6')}>N/A</div>
                    <div className={cn('w-1/6', 'flex', 'items-center')}>
                      {index === 0 ||
                      array[index].gameweekUserRank ===
                        array[index - 1].gameweekUserRank ? (
                        <FaMinus color={'#94968c'} />
                      ) : array[index].gameweekUserRank >
                        array[index - 1].gameweekUserRank ? (
                        <FaArrowUp color={'#1ee3cf'} />
                      ) : (
                        <FaArrowDown color={'#ff482f'} />
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div className={cn('page-go-back-btn')}>
          <Link
            to='/'
            className={cn(
              'whitespace-no-wrap',
              'uppercase',
              'font-semibold',
              'g-transparent',
              'hover:bg-teal-400',
              'text-secondary',
              'hover:text-white',
              'py-2',
              'px-6',
              'border-2',
              'border-gray-700',
              'hover:border-transparent',
              'rounded',
            )}
          >
            Go back
          </Link>
        </div>
      </div>
    </>
  );
};

export default EntryHistory;
