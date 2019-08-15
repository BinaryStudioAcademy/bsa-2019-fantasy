import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from 'store';

import Routing from 'containers/Routing';
import { Feedbacker } from 'components/Feedbacker';

const Home = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Feedbacker />
      <Routing />
    </ConnectedRouter>
  </Provider>
);

export default Home;
