import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { RootState } from 'store/types';
import { loadLeagueDetails } from '../actions';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

import Spinner from 'components/Spinner';
import { LeagueTable } from 'components/Leagues/LeagueTables';

import header from 'styles/header.module.scss';
import styles from './styles.module.scss';

type Props = {
  loadLeagueDetails: typeof loadLeagueDetails;
  leagueDetails: any;
  location: any;
};

const LeagueDetails = ({ loadLeagueDetails, leagueDetails, location }: Props) => {
  useEffect(() => {
    const name = location.pathname.split('/')[2];
    loadLeagueDetails({ name });
  }, []);

  const data = {
    title: 'Participants Statistics',
  };

  /* eslint-disable */
  const columns = [
    {
      Header: () => (
        <span className={`${styles['table-title']} uppercase font-bold`}>Rank</span>
      ),
      maxWidth: 100,
      accessor: 'current_rank',
      Cell: (props: any) => {
        console.log('props: ', props);
        const movement = props.original.current_rank - props.original.last_rank;

        return (
          <div className={`h-full flex justify-center items-center`}>
            <span
              className={`flex items-center ${styles.movement} ${
                movement > 0 ? styles.up : ''
              } ${movement < 0 ? styles.down : ''}`}
            >
              <span className='mr-2'>{props.index + 1}.</span>
              {movement > 0 ? (
                <FaArrowUp />
              ) : movement < 0 ? (
                <FaArrowDown />
              ) : (
                <FaMinus />
              )}
            </span>{' '}
          </div>
        );
      },
    },
    {
      Header: () => (
        <span className={`${styles['table-title']} uppercase font-bold`}>
          Team & Manager
        </span>
      ),
      accessor: 'user',

      Cell: (props: any) => {
        return (
          <div className='flex flex-col justify-center items-center'>
            <p className='font-bold'>{props.value.team_name}</p>
            <p>{props.value.name}</p>
          </div>
        );
      },
    },

    {
      Header: () => (
        <span className={`${styles['table-title']} uppercase font-bold`}>GW</span>
      ),
      accessor: 'gameweek_points',

      Cell: (props: any) => (
        <span className='h-full flex justify-center items-center'>{props.value}</span>
      ),
    },
    {
      Header: () => (
        <span className={`${styles['table-title']} uppercase font-bold`}>TOT</span>
      ),
      accessor: 'total_points',

      Cell: (props: any) => (
        <span className='h-full flex justify-center items-center'>{props.value}</span>
      ),
    },
  ];

  if (!leagueDetails) {
    return <Spinner />;
  }

  return (
    <div className={styles['league-details']}>
      <div className={`${header.jumbotron} ${header.paper} mb-12 rounded`}>
        <div className={`${header['jumbotron-content']} mt-12`}>
          <h2 className={`${header.title} text-secondary`}>
            <div className={`${header.sub} ${header.title} mb-4 flex items-center`}>
              League Details
            </div>
            {leagueDetails.name}
          </h2>
        </div>
      </div>
      <div className={styles.tables}>
        <LeagueTable columns={columns} data={leagueDetails.participants} title={data} />
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
