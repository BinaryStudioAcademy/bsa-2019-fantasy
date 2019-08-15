import React, { useEffect } from 'react';

import TeamSelection from 'components/Gameweek/TeamSelection';
import './styles.scss';

const MyTeam = () => {
  useEffect(() => {
    document.title = 'My Team | Fantasy Football League';
  }, []);

  return (
    <div className='team-page'>
      <div className='jumbotron paper mb-12 rounded flex items-end justify-between pt-6'>
        <div className='jumbotron-content mt-16'>
          <h2 className='title text-secondary mb-6'>
            <div className='sub title mb-4 flex items-center'>Team Page</div>
            My Team
          </h2>
        </div>
      </div>
      <TeamSelection isGameweek={false} />
    </div>
  );
};

export default MyTeam;
