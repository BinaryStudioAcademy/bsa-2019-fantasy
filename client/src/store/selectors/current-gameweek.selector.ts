import moment from 'moment';
import { createSelector } from 'reselect';

import { RootState } from '../types';

export const currentGameweekSelector = createSelector(
  (state: RootState) => state.gameweeks.gameweeks,
  (gameweeks) =>
    (() => {
      const now = moment();

      return gameweeks.find(
        (g) => moment(g.start).isSameOrBefore(now) && moment(g.end).isAfter(now),
      );
    })(),
);
