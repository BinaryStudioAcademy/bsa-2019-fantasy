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

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Spinner from 'components/Spinner';

const Routing = () => {
    const dispatch = useDispatch();
    // eslint-disable-next-line
    const { isLoading, isAuthorized } = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        dispatch(loadCurrentUser());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='flex min-h-screen'>
            <div className='flex-none h-screen'>
                {/*isAuthorized*/ true && <Sidebar />}
            </div>
            <div className='flex-1 bg-background'>
                {/*isAuthorized*/ true && <Header />}
                <main className='mx-16 -mt-32'>
                    <Switch>
                        <Route exact path='/'>
                            <Test />
                        </Route>

                        <Route path='/login'>
                            <LoginPage />
                        </Route>

                        <Route path='/registration'>
                            <RegistartionPage />
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
