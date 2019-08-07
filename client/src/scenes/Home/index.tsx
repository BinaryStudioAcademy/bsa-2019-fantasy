import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routing from 'containers/Routing';
import store, { history } from 'store';

const Home = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routing />
        </ConnectedRouter>
    </Provider>
);

export default Home;
