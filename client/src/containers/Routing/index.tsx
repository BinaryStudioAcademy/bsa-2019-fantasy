import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/types';
import { loadCurrentUser } from 'containers/Profile/actions';

import Test from 'containers/Test';
import NotFound from 'scenes/NotFound';
import PrivateRoute from 'containers/PrivateRoute';
import LoginPage from 'containers/Auth/Login/LoginPage';
import RegistrationPage from 'containers/Auth/Registration/RegistrationPage';

import Leagues from 'containers/Leagues';
import CreateLeague from 'components/Leagues/CreateLeague';
import JoinLeague from 'components/Leagues/JoinLeague';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

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
        <div className='flex min-h-screen'>
            <div className='flex-none h-screen'>{isAuthorized && <Sidebar />}</div>
            <div className='flex-1 bg-background'>
                {isAuthorized && <Header />}
                <main className='mx-16 -mt-32'>
                    <Switch>
                        <Route exact path='/'>
                            <Test />
                        </Route>

                        <Route path='/login'>
                            <LoginPage />
                        </Route>

                        <Route path='/registration'>
                            <RegistrationPage />
                        </Route>

                        <Route exact path="/leagues">
                            <Leagues />
                        </Route>
                        <Route path="/leagues/create">
                            <CreateLeague />
                        </Route>
                        <Route path="/leagues/join">
                            <JoinLeague />
                        </Route>

                        <PrivateRoute exact path='/private'>
                            <Test />
                        </PrivateRoute>

                        <Route path='*' component={NotFound} />
                    </Switch>
                </main>
            </div>
        </div>
    );
};

export default Routing;
