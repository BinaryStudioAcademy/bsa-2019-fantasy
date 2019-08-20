import React from 'react';
import cn from 'classnames';
import moment from 'moment';

import FixturesItem from './FixturesItem';
import { FixturesType, FixturesItemType } from 'types/fixtures.types';

import styles from './styles.module.scss';

const Fixtures = ({ games }: FixturesType) => {
  const renderMessages = () => {
    let currentDate = '';

    return games.map((match: FixturesItemType) => {
      const res = [<FixturesItem match={match} key={`fixtures-${match.id}`} />];

      const messageDate = moment(match.start).format('dddd D MMMM YYYY');
      if (currentDate !== messageDate) {
        res.unshift(
          <div
            className={cn(styles['fixtures-list__daystamp'], 'block')}
            key={`daystamp-${messageDate}`}
          >
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
