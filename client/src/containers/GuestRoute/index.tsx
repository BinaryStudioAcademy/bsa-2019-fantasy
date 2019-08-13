import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { RootState } from 'store/types';

type Props = RouteProps;

const GuestRoute = (props: Props) => {
  const isAuthorized = useSelector((state: RootState) => state.profile.isAuthorized);

  return isAuthorized ? <Redirect to='/' /> : <Route {...props} />;
};

export default GuestRoute;
