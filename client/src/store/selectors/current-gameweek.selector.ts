import moment from 'moment';
import { createSelector } from 'reselect';

import { RootState } from '../types';

export const currentGameweekSelector = createSelector(
  (state: RootState) => state.gameweeks.gameweeks,
  (gameweeks) =>
    (() => {
      const now = moment();

      let currentGameweek = gameweeks.find(
        (g) => moment(g.start).isSameOrBefore(now) && moment(g.end).isAfter(now),
      );

      if (!currentGameweek) {
        currentGameweek = gameweeks.find(
          (g) => moment(g.start).isSameOrAfter(now) && moment(g.end).isAfter(now),
        );
      }
      return currentGameweek;
    })(),
);
