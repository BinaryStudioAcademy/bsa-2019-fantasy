import React, { useEffect } from 'react';

import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'store/types';

const EntryHistory: React.FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = 'Entry History | Fantasy Football League';
  }, []);

  // userId of active session
  const userId = useSelector(
    (state: RootState) => state.profile.user && state.profile.user.id,
  );

  return (
    <>
      <div className='page-wrapper bg-white text-secondary shadow-figma rounded-sm p-12 flex flex-no-wrap justify-between sm:flex-wrap'>
        <div className='page-left-side border'>
          <div className='page-title'>
            <h2 className='font-semibold text-5xl leading-none mb-8'>
              {t('EntryHistory.title')}
            </h2>
          </div>
          <div className='this-season-table flex flex-wrap'>
            Table Data
          </div>
        </div>
      </div>
    </>
  );
};

export default EntryHistory;
