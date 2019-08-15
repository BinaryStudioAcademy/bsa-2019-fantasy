import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import { FaStar } from 'react-icons/fa';

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

    // Cell: (props: { value: { movement: string; current: number } }) => (
    //   <div className='rank flex justify-center items-center'>
    //     <span
    //       className={`movement mr-1 ${props.value.movement === 'up' ? 'up' : 'down'}`}
    //     >
    //       {props.value.movement === 'up' ? <FaArrowUp /> : <FaArrowDown />}
    //     </span>{' '}
    //     {props.value.current}
    //   </div>
    // ),
  },
  {
    Header: () => <span className='table-title uppercase font-bold'>Last Rank</span>,

    // Cell: (props: { value: { movement: string; last: number } }) => (
    //   <div className='rank flex justify-center items-center'>
    //     <span
    //       className={`movement mr-1 ${props.value.movement === 'up' ? 'up' : 'down'}`}
    //     >
    //       {props.value.movement === 'up' ? <FaArrowUp /> : <FaArrowDown />}
    //     </span>{' '}
    //     {props.value.last}
    //   </div>
    // ),
  },
];
/* eslint-enable */
type Props = {
  loadUserLeagues: typeof loadUserLeagues;
  leagues: any;
  clubs: any;
};

const Leagues = ({ loadUserLeagues, leagues, clubs }: Props) => {
  const [userLeagues, setLeagues] = useState([]);

  useEffect(() => {
    document.title = 'Leagues | Fantasy Football League';
    loadUserLeagues();
    setLeagues(leagues);
  }, [userLeagues, setLeagues, loadUserLeagues]);

  const getClubCodeByName = (name: string) => {
    const club = clubs.filter((club: any) => club.name === name);
    return club[0] && club[0].code;
  };

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
    const footballClub = leagues.global.find(
      (item: any) => item.league.name !== 'Overall',
    );

    return (
      <div className='leagues'>
        <div className='container'>
          <div className='jumbotron paper mb-12 rounded flex items-end justify-between pt-6'>
            <div className='jumbotron-content mt-12 mb-12'>
              <div className='clubLogo inline-flex rounded-full shadow-figma p-4 mb-6'>
                <img
                  className='w-16'
                  src={getClubLogoUrl(getClubCodeByName(footballClub.league.name)!, 80)}
                  alt='Club logo'
                />
              </div>
              <h2 className='title mb-12 text-secondary'>
                <div className='sub title mb-3 flex items-center'>
                  <FaStar />
                  My Leagues
                </div>
                {footballClub.league.name}
              </h2>
              <Link
                to='/leagues/join'
                className='bg-primary hover:bg-teal-400 text-secondary hover:text-white py-2 px-8 border-2 border-teal-300 rounded mr-6'
              >
                Join
              </Link>
              <Link
                to='/leagues/create'
                className='g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded'
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
});

const actions = { loadUserLeagues };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Leagues);
