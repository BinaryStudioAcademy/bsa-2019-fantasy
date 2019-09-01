import React, { useState } from 'react';

import Modal from 'containers/Modal';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';

export const SimulateModal = ({ clubs, onSubmit, onDismiss }) => {
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
        <h3 className='font-bold text-2xl mb-4'>Select clubs</h3>
        <div className='flex -mx-2 mb-8'>
          <div className='w-1/3 px-2'>
            <div className='font-semibold text-l'>Home club</div>
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
            <div className='font-semibold text-l'>Away club</div>
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
            Start simulation
          </Button>
          <Button className='text-sm' styling='secondary' onClick={onDismiss}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
