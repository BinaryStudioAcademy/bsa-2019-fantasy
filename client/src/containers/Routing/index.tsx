import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/types';

import Test from 'containers/Test';
import NotFound from 'scenes/NotFound';
import PrivateRoute from 'containers/PrivateRoute';

import LoginPage from 'containers/Auth/Login/LoginPage';
import RegistrationPage from 'containers/Auth/Registration/RegistrationPage';

import MyTeam from 'containers/MyTeam';
import Transfers from 'containers/Transfers';
import Live from 'containers/Live';

import Leagues from 'containers/Leagues';
import CreateLeague from 'components/Leagues/CreateLeague';
import JoinLeague from 'components/Leagues/JoinLeague';

import Fixtures from 'components/Fixtures/Fixtures';
import Players from 'containers/Players';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Spinner from 'components/Spinner';

import Profile from 'containers/Profile';
import { loadCurrentUser } from 'containers/Profile/actions';

const Routing = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthorized } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='flex h-screen'>
      <div className='flex-none h-full'>{isAuthorized && <Sidebar />}</div>
      <div className='flex-1 bg-background h-full overflow-y-auto pb-16'>
        {isAuthorized && <Header />}
        <main className='mx-16 -mt-32'>
          <Switch>
            <Route path='/' exact component={Test} />

            <Route path='/login' component={LoginPage} />
            <Route path='/registration' component={RegistrationPage} />
            <Route path='/profile' component={Profile} />

            <Route path='/my-team' component={MyTeam} />
            <Route path='/live' component={Live} />

            <Route path='/players' exact component={Players} />

            <Route path='/transfers' exact component={Transfers} />
            <Route path='/fixtures' exact component={Fixtures} />

            <Route path='/leagues' exact component={Leagues} />
            <Route path='/leagues/create' component={CreateLeague} />
            <Route path='/leagues/join' component={JoinLeague} />

            <PrivateRoute exact path='/private' component={Test} />

            <Route path='*' component={NotFound} />
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Routing;
