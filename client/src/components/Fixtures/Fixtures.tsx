import React from 'react';
import moment from 'moment';

import FixturesItem from './FixturesItem';

import { FixturesType, FixturesItemType } from 'types/fixtures.types';

const Fixtures = ({ games }: FixturesType) => {
  const renderMessages = () => {
    let currentDate = '';

    return games.flatMap((match: FixturesItemType) => {
      const res = [<FixturesItem match={match} key={`fixtures-${match.id}`} />];

      const messageDate = moment(match.start).format('dddd D MMMM YYYY');
      if (currentDate !== messageDate) {
        res.unshift(
          <div className='fixtures-list__daystamp block' key={`daystamp-${messageDate}`}>
            <span>{messageDate}</span>
          </div>,
        );
        currentDate = messageDate;
      }

      return res;
    });
  };

  return <React.Fragment>{renderMessages()}</React.Fragment>;
};

export default Fixtures;
