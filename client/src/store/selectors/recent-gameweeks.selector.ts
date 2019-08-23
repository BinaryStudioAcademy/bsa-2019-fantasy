import moment from 'moment';
import { createSelector } from 'reselect';

import { RootState } from '../types';

export const recentGameweeksSelector = createSelector(
  (state: RootState) => state.gameweeks.gameweeks,
  (gameweeks) =>
    (() => {
      const now = moment();

      let recentGameweeks = gameweeks.filter((g) => moment(g.start).isSameOrBefore(now));

      return [
        ...recentGameweeks,
        gameweeks.find(
          (g) => moment(g.start).isSameOrAfter(now) && moment(g.end).isAfter(now),
        ),
      ];
    })(),
);
