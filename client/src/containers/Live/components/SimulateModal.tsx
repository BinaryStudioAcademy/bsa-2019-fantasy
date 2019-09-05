import React, { useState } from 'react';

import Modal from 'containers/Modal';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';
import { useSelector } from 'react-redux';
import { RootState } from 'store/types';

import { useTranslation } from 'react-i18next';

export const SimulateModal = ({ onSubmit, onDismiss }) => {
  const { t } = useTranslation();

  const clubs = useSelector((state: RootState) => state.clubs.clubs);
  const options = clubs.map(({ name, id }) => {
    return { label: name, value: String(id) };
  });

  const [homeClubId, setHomeClubId] = useState('');
  const [awayClubId, setAwayClubId] = useState('');

  const optionsHome = options;
  const optionsAway = options.filter(({ value }) => value !== homeClubId);

  return (
    <Modal onDismiss={onDismiss}>
      <div className='p-8'>
        <h3 className='font-bold text-2xl mb-4'>{t('LIVE.simulateModal.selectClubs')}</h3>
        <div className='flex -mx-2 mb-8'>
          <div className='w-1/3 px-2'>
            <div className='font-semibold text-l'>{t('LIVE.simulateModal.homeClub')}</div>
            <Dropdown
              options={optionsHome}
              value={homeClubId}
              className='w-40'
              onChange={({ value }) => {
                if (value === awayClubId) {
                  setHomeClubId(value);
                  setAwayClubId('');
                } else {
                  setHomeClubId(value);
                }
              }}
            ></Dropdown>
          </div>
          <div className='w-1/3 px-2'>
            <div className='font-semibold text-l'>{t('LIVE.simulateModal.awayClub')}</div>
            <Dropdown
              options={optionsAway}
              value={awayClubId}
              className='w-40'
              onChange={({ value }) => setAwayClubId(value)}
            ></Dropdown>
          </div>
        </div>
        <div className=''>
          <Button
            className='mr-4 text-sm'
            styling='primary'
            onClick={() => onSubmit(homeClubId, awayClubId)}
          >
            {t('LIVE.simulateModal.startSimulation')}
          </Button>
          <Button className='text-sm' styling='secondary' onClick={onDismiss}>
            {t('LIVE.simulateModal.cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
