import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import moment from 'moment';

import { RootState } from 'store/types';

import FixturesItem from './FixturesItem';
import { FixturesType, FixturesItemType } from 'types/fixtures.types';

import styles from './styles.module.scss';
import { FixtureSubscribtion } from 'types/fixture.types';

const Fixtures = ({ games }: FixturesType) => {
  const fixtureSubscribtions = useSelector(
    (state: RootState) => state.fixtures.fixtureSubscribtions,
  );

  const [currentMatchStats, setCurrentMatchStats] = useState<
    FixturesItemType | undefined
  >(undefined);

  const renderMessages = (subscribtions: FixtureSubscribtion[]) => {
    let currentDate = '';
    const subscribedFixturesIds = subscribtions.map((s) => s.game_id);
    return games.map((match: FixturesItemType) => {
      const res = [
        <FixturesItem
          match={match}
          subscribed={subscribedFixturesIds.includes(match.id)}
          key={`fixtures-${match.id}`}
          currentMatchStats={currentMatchStats}
          setCurrentMatchStats={setCurrentMatchStats}
        />,
      ];

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

  return (
    <React.Fragment>
      {fixtureSubscribtions ? renderMessages(fixtureSubscribtions) : null}
    </React.Fragment>
  );
};

export default Fixtures;
