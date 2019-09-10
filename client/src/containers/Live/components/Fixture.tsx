import React from 'react';

type FixtureType = {
  homeClub: any;
  awayClub: any;
  aboveContent?: any;
  centerContent: any;
  belowContent?: any;
  belowBelowContent?: any;
  onClick?: any;
};

export const Fixture: React.SFC<FixtureType> = ({
  homeClub,
  awayClub,
  aboveContent,
  centerContent,
  belowContent,
  belowBelowContent,
  onClick,
}) => {
  if (!homeClub || !awayClub) return null;
  const renderClub = (club, right = false) => (
    <div
      className={`flex flex-1 items-center mx-5 ${
        right ? 'justify-start' : 'justify-end'
      }`}
    >
      <h5 className={`font-bold mx-2 whitespace-no-wrap ${right ? 'order-last' : ''}`}>
        {club.name}
      </h5>
      <img
        className='w-16'
        src={`images/club-logos/badge_${club.code}_200.png`}
        alt='logo home'
      />
    </div>
  );

  return (
    <div>
      {aboveContent && (
        <div className='flex font-semibold justify-center text-2xl mb-4'>
          {aboveContent}
        </div>
      )}
      <div className='flex flex-1 cursor-pointer' onClick={onClick}>
        {renderClub(homeClub)}
        <div className='relative self-center'>
          <div className='px-3 py-2 text-white font-bold bg-green-900 rounded'>
            {centerContent}
          </div>
          {belowContent && (
            <div className='absolute inset-x-0 mt-2 text-center'>
              <div className='py-2 bg-gray-200 rounded'>{belowContent}</div>
              <div className='py-2'>{belowBelowContent}</div>
            </div>
          )}
        </div>
        {renderClub(awayClub, true)}
      </div>
    </div>
  );
};
