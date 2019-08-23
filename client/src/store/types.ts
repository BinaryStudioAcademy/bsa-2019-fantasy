import { Dispatch, Action, AnyAction } from 'redux';

import store from '.';

export type RootState = ReturnType<typeof store['getState']>;

export type Thunky<A extends Action<any> = AnyAction> = (
  dispatch: Dispatch<A>,
  getState: () => RootState,
) => any;
