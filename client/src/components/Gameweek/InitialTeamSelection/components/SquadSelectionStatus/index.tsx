import React, { useState } from 'react';
import Button from 'components/Button';

interface SquadSelection {
  money: number;
  players: number;
  isMoreThree: { status: boolean; club: string };
  onResetClick: (ev: React.SyntheticEvent) => void;
  onAutoPickClick: (ev: React.SyntheticEvent) => void;
}

const SquadSelectionStatus = ({
  money,
  players,
  isMoreThree,
  onResetClick,
  onAutoPickClick,
}: SquadSelection) => {
  const playerClass = players === 15 ? 'text-green-600' : 'text-red-600';
  const moneyClass = money >= 0 ? 'text-green-600' : 'text-red-600';
  return (
    <div className='text-center mb-4'>
      <hr />
      <p className='mt-4 text-sm'>
        Select a maximum of 3 players from a single team or &apos;Auto Pick&apos; if
        you&apos;re short of time.
      </p>
      <div className='flex justify-around'>
        <div>
          <Button
            className='w-3/16 h-12 mt-4'
            styling='secondary'
            onClick={onAutoPickClick}
          >
            <p>Auto Pick</p>
          </Button>
          <hr className='mt-4' />
          <div className='text-center mt-2'>
            <p className='font-bold text-xs'>Players Selected</p>
            <p className={playerClass}>{players} / 15</p>
          </div>
        </div>
        <div>
          <Button className='w-3/16 h-12 mt-4' styling='secondary' onClick={onResetClick}>
            <p>Reset</p>
          </Button>
          <hr className='mt-4' />
          <div className='text-center mt-2'>
            <p className='font-bold text-xs'>Money Remaining</p>
            <p className={moneyClass}>{money}</p>
          </div>
        </div>
      </div>
      {isMoreThree.status && (
        <p className='text-center bg-red-700 text-white text-xs mb-4'>
          {`Too many players selected from ${isMoreThree.club}`}
        </p>
      )}
    </div>
  );
};

export default SquadSelectionStatus;
