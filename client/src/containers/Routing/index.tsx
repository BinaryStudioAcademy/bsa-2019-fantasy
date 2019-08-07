import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/types';

import Test from 'containers/Test';
import NotFound from 'scenes/NotFound';
import PrivateRoute from 'containers/PrivateRoute';
import { loadCurrentUser } from 'containers/Profile/actions';

const Routing = () => {
    const dispatch = useDispatch();
    const { isLoading, isAuthorized } = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        dispatch(loadCurrentUser());
    }, [dispatch]);

    if (isLoading) {
        return <div>SPINNER</div>;
    }

    return (
        <div className='fill'>
            {isAuthorized && <header>HEADER</header>}
            <main className='fill'>
                <Switch>
                    <Route exact path='/'>
                        <Test />
                    </Route>

                    <PrivateRoute exact path='/private'>
                        <Test />
                    </PrivateRoute>

                    <Route path='*' component={NotFound} />
                </Switch>
            </main>
        </div>
    );
};

export default Routing;
