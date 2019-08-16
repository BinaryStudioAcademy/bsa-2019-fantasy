import React, { useEffect } from 'react';
import PlayersSelection from 'components/PlayersSelection';
import TeamSelection from 'components/Gameweek/TeamSelection';
import FixturesContainer from 'containers/FixturesContainer';

const Transfers = () => {
  useEffect(() => {
    document.title = 'Transfers | Fantasy Football League';
  }, []);
  
  return (
    <div className='transfers-page'>
      <div className='jumbotron paper mb-12 rounded pt-12'>
        <div className='sub title mb-4 flex items-center'>Transfers Page</div>
        <h2 className='title text-secondary mb-6'>Transfers</h2>
        <div className='jumbotron-content mt-2 flex'>
          <div style={{ width: '25%' }}>
            <PlayersSelection />
          </div>
          <div className='flex flex-grow justify-center'>
            <div className='wrapper'>
              <TeamSelection isGameweek={false} />
            </div>
          </div>
        </div>
      </div>
      <FixturesContainer />
    </div>
  );
};

export default Transfers;
