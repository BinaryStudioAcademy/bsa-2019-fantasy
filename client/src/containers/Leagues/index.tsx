import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import { FaStar, FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

import Spinner from 'components/Spinner';
import { LeagueTable } from 'components/Leagues/LeagueTables';

import { RootState } from 'store/types';
import { loadUserLeagues } from './actions';

import { getClubLogoUrl } from 'helpers/images';
import FirstPlayer from 'assets/images/player.png';
import SecondPlayer from 'assets/images/1966.png';
import './styles.scss';

/* eslint-disable */
const columns = [
  {
    Header: () => <span className='table-title uppercase font-bold'>League</span>,
    accessor: 'league.name',

    Cell: (props: { value: string }) => (
      <span className='table-title-row'>{props.value}</span>
    ),
  },
  {
    Header: () => <span className='table-title uppercase font-bold'>Current Rank</span>,
    accessor: 'current_rank',
    Cell: (props: any) => {
      const movement = props.original.current_rank - props.original.last_rank;

      return (
        <div className='rank flex justify-center items-center'>
          <span
            className={`movement mr-1 ${movement > 0 ? 'up' : ''} ${
              movement < 0 ? 'down' : ''
            }`}
          >
            {movement > 0 ? <FaArrowUp /> : movement < 0 ? <FaArrowDown /> : <FaMinus />}
          </span>{' '}
          {props.value}
        </div>
      );
    },
  },
  {
    Header: () => <span className='table-title uppercase font-bold'>Last Rank</span>,
    accessor: 'last_rank',
    Cell: (props: any) => {
      const movement = props.original.current_rank - props.original.last_rank;

      return (
        <div className='rank flex justify-center items-center'>
          <span
            className={`movement mr-1 ${movement > 0 ? 'up' : ''} ${
              movement < 0 ? 'down' : ''
            }`}
          >
            {movement > 0 ? <FaArrowUp /> : movement < 0 ? <FaArrowDown /> : <FaMinus />}
          </span>{' '}
          {props.value}
        </div>
      );
    },
  },
];
/* eslint-enable */
type Props = {
  loadUserLeagues: typeof loadUserLeagues;
  leagues: any;
  clubs: any;
  user: any;
};

const Leagues = ({ loadUserLeagues, leagues, clubs, user }: Props) => {
  const [club, setClub] = useState({ name: '', code: 0 });

  useEffect(() => {
    document.title = 'Leagues | Fantasy Football League';
    loadUserLeagues();

    const userFavouriteCLub = clubs.filter((item) => item.id === user.favorite_club_id);
    setClub(userFavouriteCLub[0]);
  }, []);

  const titles = [
    {
      title: 'Private classic leagues',
      id: '0',
      accessor: 'private',
    },
    {
      title: 'Public classic leagues',
      id: '1',
      accessor: 'public',
    },
    {
      title: 'Global leagues',
      id: '2',
      accessor: 'global',
    },
  ];

  if (!leagues) {
    return <Spinner />;
  } else {
    return (
      <div className='leagues'>
        <div className='container'>
          <div className='jumbotron paper mb-12 rounded flex items-end justify-between pt-6'>
            <div className='jumbotron-content mt-12 mb-12'>
              <div className='clubLogo inline-flex rounded-full shadow-figma p-4 mb-6'>
                <img
                  style={{ height: 50, width: 50 }}
                  src={getClubLogoUrl(club.code, 80)}
                  alt='Club logo'
                />
              </div>
              <h2 className='title mb-12 text-secondary'>
                <div className='sub title mb-3 flex items-center'>
                  <FaStar />
                  My Leagues
                </div>
                {club.name}
              </h2>
              <Link
                to='/leagues/join'
                className='bg-primary hover:bg-teal-400 text-secondary hover:text-white py-2 px-8 border-2 border-teal-300 rounded mr-6'
              >
                Join
              </Link>
              <Link
                to='/leagues/create'
                className='whitespace-no-wrap g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded'
              >
                New League
              </Link>
            </div>
            <div className='players flex'>
              <img src={FirstPlayer} alt='player' />
              <img src={SecondPlayer} alt='player' />
            </div>
          </div>
          <div className='tables'>
            {map(titles, (item) => {
              return (
                <LeagueTable
                  columns={columns}
                  data={leagues[item.accessor]}
                  title={item}
                  key={item.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (rootState: RootState) => ({
  leagues: rootState.league.leagues,
  clubs: rootState.clubs.clubs,
  user: rootState.profile.user,
});

const actions = { loadUserLeagues };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Leagues);
