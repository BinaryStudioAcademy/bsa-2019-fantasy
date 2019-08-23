import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { feedback } from 'react-feedbacker';
import { useTranslation } from 'react-i18next';

import { RootState } from 'store/types';

import NotFound from 'scenes/NotFound';
import PrivateRoute from 'containers/PrivateRoute';
import GuestRoute from 'containers/GuestRoute';

import LoginPage from 'containers/Auth/Login/LoginPage';
import RegistrationPage from 'containers/Auth/Registration/RegistrationPage';
import SocialPage from 'containers/Auth/SocialPage';

import MyTeam from 'containers/MyTeam';
import Transfers from 'containers/Transfers';
import SquadSelection from 'containers/SquadSelection';
import Live from 'containers/Live';

import Leagues from 'containers/Leagues';
import CreateLeague from 'containers/Leagues/CreateLeague';
import JoinLeague from 'containers/Leagues/JoinLeague';

import GameweekHistory from 'containers/GameweekHistory';
import NoTeamHome from 'components/NoTeamHome';

import FixturesContainer from 'containers/FixturesContainer';
import Players from 'containers/Players';
import PlayersComparison from 'containers/PlayersComparison';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Spinner from 'components/Spinner';

import Profile from 'containers/Profile';
import FavouriteClubSelection from 'containers/Profile/components/FavouriteClubSelection';

import SetPassword from 'containers/Profile/components/SetPassword';
import { loadCurrentUser, setLanguage } from 'containers/Profile/actions';

import ConnectFbPage from 'containers/Auth/ConnectFbPage';
import ForgotPassword from 'containers/ChangePassword/ForgotPassword';
import ResetPassword from 'containers/ChangePassword/ResetPassword';

import { fetchClubs } from './fetchClubs/actions';
import {
  fetchGameweeks,
  fetchGameweekHistory,
  fetchGameweekHistoryResults,
  fetchUserRankingForGameweek,
} from './fetchGameweeks/actions';
import { preloadClubLogos } from 'helpers/images';
import { currentGameweekSelector } from 'store/selectors/current-gameweek.selector';

import { joinRoom, requestGames } from 'helpers/socket';

const Routing = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, user, isAuthorized } = useSelector(
    (state: RootState) => state.profile,
  );

  const favorite_club = useSelector(
    (state: RootState) => state.profile.user && state.profile.user.favorite_club_id,
  );

  const clubs = useSelector((state: RootState) => state.clubs.clubs);
  const currentGameweek = useSelector(currentGameweekSelector);

  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchClubs());
      dispatch(fetchGameweeks());
    }
  }, [dispatch, isAuthorized]);

  useEffect(() => {
    if (isAuthorized && favorite_club) {
      if (!joinedRoom) {
        setJoinedRoom(true);
        joinRoom(favorite_club);
      }
      requestGames();
    }
  }, [dispatch, isAuthorized, favorite_club]);

  useEffect(() => {
    if (user && currentGameweek) {
      dispatch(fetchGameweekHistory(user.id, currentGameweek.id));
      dispatch(fetchUserRankingForGameweek(user.id, currentGameweek.id));
      dispatch(fetchGameweekHistoryResults());
    }
  }, [dispatch, user, currentGameweek]);

  useEffect(() => {
    clubs.length > 0 && preloadClubLogos(clubs, 80);
  }, [clubs]);

  useEffect(() => {
    const language = localStorage.getItem('language');

    if (!language) localStorage.setItem('language', 'en');

    i18n
      .changeLanguage(language || 'en')
      .then(() => language && localStorage.setItem('language', 'en'))
      .catch((err) => console.warn(err));
    language && dispatch(setLanguage({ language }));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='flex h-screen font-sans font-medium'>
      <Switch>
        <GuestRoute exact path='/login' component={LoginPage} />
        <GuestRoute exact path='/registration' component={RegistrationPage} />
        <GuestRoute exact path='/forgot' component={ForgotPassword} />
        {/* <GuestRoute exact path='/social' component={SocialPage} /> */}
        {/* <GuestRoute exact path='/connect-fb' component={ConnectFbPage} /> */}
        <GuestRoute path='/reset/:id' component={ResetPassword} />

        {user && user.favorite_club_id === null && (
          <PrivateRoute>
            {feedback.warning('Select your favorite club to proceed!')}
            <div className='w-full p-24 bg-secondary text-primary'>
              <div className='w-full'>
                <FavouriteClubSelection />
              </div>
            </div>
          </PrivateRoute>
        )}

        <Route exact path='/404' component={NotFound} />

        <PrivateRoute path='/'>
          <div className='flex-none h-full'>
            <Sidebar />
          </div>
          <div className='flex-1 bg-background h-full overflow-y-auto pb-16'>
            <Header team_name={user ? user.team_name : undefined} />
            <main className='mx-16 -mt-32'>
              <Switch>
                <Route
                  path='/'
                  exact
                  component={user && user.team_name ? GameweekHistory : NoTeamHome}
                />

                <Route path='/profile' component={Profile} />
                <Route path='/profile/set/password' component={SetPassword} />

                <Route path='/my-team' component={MyTeam} />
                <Route path='/live' component={Live} />

                <Route path='/players' exact component={Players} />
                <Route path='/players-comparison' exact component={PlayersComparison} />

                <Route path='/transfers' exact component={Transfers} />
                <Route path='/squad-selection' exact component={SquadSelection} />

                <Route path='/fixtures' exact component={FixturesContainer} />

                <Route path='/leagues' exact component={Leagues} />
                <Route path='/leagues/create' component={CreateLeague} />
                <Route path='/leagues/join' component={JoinLeague} />

                <Route render={() => <Redirect to='/404' />} />
              </Switch>
            </main>
          </div>
        </PrivateRoute>

        <Route render={() => <Redirect to='/404' />} />
      </Switch>
    </div>
  );
};

export default Routing;
