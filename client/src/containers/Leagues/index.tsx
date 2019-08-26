import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { map } from 'lodash';
import cn from 'classnames';

import { FaStar, FaArrowUp, FaArrowDown, FaMinus, FaUserCog } from 'react-icons/fa';

import Spinner from 'components/Spinner';
import { LeagueTable } from 'components/Leagues/LeagueTables';

import { RootState } from 'store/types';
import { loadUserLeagues } from './actions';

import { getClubLogoUrl } from 'helpers/images';
import styles from './styles.module.scss';
import header from 'styles/header.module.scss';

type Props = {
  loadUserLeagues: typeof loadUserLeagues;
  leagues: any;
  clubs: any;
  user: any;
};

const Leagues = ({ loadUserLeagues, leagues, clubs, user }: Props) => {
  const { t } = useTranslation();
  const [club, setClub] = useState({ name: '', code: 0 });

  useEffect(() => {
    document.title = 'Leagues | Fantasy Football League';
    loadUserLeagues();

    const userFavouriteCLub = clubs.filter((item) => item.id === user.favorite_club_id);
    setClub(userFavouriteCLub[0]);
  }, [clubs]);
  /* eslint-disable */
  const columns = [
    {
      Header: () => (
        <span className={cn(styles['table-title'], 'uppercase', 'font-bold')}>
          {t('LeaguesPage.cells.leagues')}
        </span>
      ),
      accessor: 'league.name',

      Cell: (props: any) => (
        <Link
          to={`/leagues/${props.value}`}
          className={cn(styles['table-title-row'], 'flex', 'items-center')}
        >
          {props.original.is_creator && <FaUserCog className='mr-1' />}
          {props.value}
        </Link>
      ),
    },
    {
      Header: () => (
        <span className={cn(styles['table-title'], 'uppercase', 'font-bold')}>
          {t('LeaguesPage.cells.currentRank')}
        </span>
      ),
      accessor: 'current_rank',
      Cell: (props: any) => {
        const movement = props.original.current_rank - props.original.last_rank;

        return (
          <div className={cn(styles.rank, 'flex', 'justify-center', 'items-center')}>
            <span
              className={cn(
                styles.movement,
                'mr-1',
                movement > 0 ? styles.up : '',
                movement < 0 ? styles.down : '',
              )}
            >
              {movement > 0 ? (
                <FaArrowUp />
              ) : movement < 0 ? (
                <FaArrowDown />
              ) : (
                <FaMinus />
              )}
            </span>{' '}
            {props.value}
          </div>
        );
      },
    },
    {
      Header: () => (
        <span className={cn(styles['table-title'], 'uppercase', 'font-bold')}>
          {t('LeaguesPage.cells.lastRank')}
        </span>
      ),
      accessor: 'last_rank',
      Cell: (props: any) => {
        const movement = props.original.current_rank - props.original.last_rank;

        return (
          <div className={cn(styles.rank, 'flex', 'justify-center', 'items-center')}>
            <span
              className={cn(
                styles.movement,
                'mr-1',
                movement > 0 ? styles.up : '',
                movement < 0 ? styles.down : '',
              )}
            >
              {movement > 0 ? (
                <FaArrowUp />
              ) : movement < 0 ? (
                <FaArrowDown />
              ) : (
                <FaMinus />
              )}
            </span>{' '}
            {props.value}
          </div>
        );
      },
    },
  ];
  /* eslint-enable */

  const titles = [
    {
      title: t('LeaguesPage.tables.private'),
      id: '0',
      accessor: 'private',
    },
    {
      title: t('LeaguesPage.tables.public'),
      id: '1',
      accessor: 'public',
    },
    {
      title: t('LeaguesPage.tables.global'),
      id: '2',
      accessor: 'global',
    },
  ];

  if (!leagues) {
    return <Spinner />;
  } else {
    return (
      <div className={styles.leagues}>
        <div
          className={cn(
            header.jumbotron,
            header.paper,
            'mb-12',
            'rounded',
            'flex',
            'items-end',
            'justify-between',
            'pt-6',
          )}
        >
          <div className={cn(header['jumbotron-content'], 'mt-12', 'mb-12')}>
            <div className='inline-flex rounded-full shadow-figma p-4 mb-6'>
              <img
                style={{ height: 50, width: 50 }}
                src={getClubLogoUrl(club.code, 80)}
                alt='Club logo'
              />
            </div>
            <h2 className={cn(header.title, 'mb-12', 'text-secondary')}>
              <div
                className={cn(header.sub, header.title, 'mb-3', 'flex', 'items-center')}
              >
                <FaStar />
                {t('LeaguesPage.title.sub')}
              </div>
              {club.name}
            </h2>
            <Link
              to='/leagues/join'
              className='bg-primary hover:bg-teal-400 text-secondary hover:text-white py-2 px-8 border-2 border-teal-300 rounded mr-6'
            >
              {t('LeaguesPage.join')}
            </Link>
            <Link
              to='/leagues/create'
              className='whitespace-no-wrap g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded'
            >
              {t('LeaguesPage.create')}
            </Link>
          </div>
          <div className={cn(styles.players, 'flex')}>
            <img src={`/images/leagues_players/${club.code}_player.png`} alt='player' />
          </div>
        </div>
        <div className={styles.tables}>
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
