import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { RootState } from 'store/types';
import { loadLeagueDetails } from '../actions';

import header from 'styles/header.module.scss';

type Props = {
  loadLeagueDetails: typeof loadLeagueDetails;
  leagueDetails: any;
  location: any;
};

const LeagueDetails = ({ loadLeagueDetails, leagueDetails, location }: Props) => {
  useEffect(() => {
    const name = location.pathname.split('/')[2];
    loadLeagueDetails(name);
  }, []);

  return (
    <div>
      <div className={`${header.jumbotron} ${header.paper} mb-12 rounded`}>
        <div className={`${header['jumbotron-content']} mt-12`}>
          <h2 className={`${header.title} text-secondary`}>
            <div className={`${header.sub} ${header.title} mb-4 flex items-center`}>
              League
            </div>
            Main title league
          </h2>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  leagueDetails: rootState.league.leagueDetails,
});

const actions = { loadLeagueDetails };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

/* eslint-disable */
export default withRouter(
  // @ts-ignore
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LeagueDetails),
);
