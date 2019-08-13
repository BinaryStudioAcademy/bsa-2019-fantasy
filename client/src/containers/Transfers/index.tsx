import React from 'react';
import { PlayersSelection } from '../../components/PlayersSelection/index';

const Transfers = () => {
  return (
    <div className='transfers-page'>
      <div className='jumbotron paper mb-12 rounded flex items-end justify-between pt-6'>
        <div className='jumbotron-content mt-16'>
          <h2 className='title text-secondary mb-6'>
            <div className='sub title mb-4 flex items-center'>Transfers Page</div>
            Transfers
          </h2>
          <PlayersSelection />
        </div>
      </div>
    </div>
  );
};

export default Transfers;
