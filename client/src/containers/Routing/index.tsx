import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/types';
import { loadCurrentUser } from 'containers/Profile/actions';

import Test from 'containers/Test';
import NotFound from 'scenes/NotFound';
import PrivateRoute from 'containers/PrivateRoute';
import LoginPage from 'containers/Auth/Login/LoginPage';
import RegistartionPage from 'containers/Auth/Registration/RegistartionPage';
import Leagues from 'containers/Leagues';

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
        <div className="fill">
            {isAuthorized && <header>HEADER</header>}
            <main className="fill">
                <Switch>
                    <Route exact path="/">
                        <Test />
                    </Route>

                    <Route path="/login">
                        <LoginPage />
                    </Route>

                    <Route path="/registration">
                        <RegistartionPage />
                    </Route>

                    <Route path="/leagues">
                        <Leagues />
                    </Route>

                    <PrivateRoute exact path="/private">
                        <Test />
                    </PrivateRoute>

                    <Route path="*" component={NotFound} />
                </Switch>
            </main>
        </div>
    );
};

export default Routing;
