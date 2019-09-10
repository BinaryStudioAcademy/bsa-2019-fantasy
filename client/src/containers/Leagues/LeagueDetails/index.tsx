import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import ShareLink from 'react-facebook-share-link';

import { RootState } from 'store/types';
import { loadLeagueDetails, getInvitationCode, leaveLeague } from '../actions';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

import Spinner from 'components/Spinner';
import { LeagueTable } from 'components/Leagues/LeagueTables';

import header from 'styles/header.module.scss';
import styles from './styles.module.scss';

type Props = {
  loadLeagueDetails: typeof loadLeagueDetails;
  getInvitationCode: typeof getInvitationCode;
  leaveLeague: typeof leaveLeague;
  leagueDetails: any;
  code: string;
  location: any;
  history: any;
};

const LeagueDetails = ({
  loadLeagueDetails,
  leagueDetails,
  leaveLeague,
  location,
  history,
  getInvitationCode,
  code,
}: Props) => {
  const { t } = useTranslation();

  const [copied, setCopy] = useState(false);

  useEffect(() => {
    const name = location.pathname.split('/')[2];
    loadLeagueDetails({ name });
  }, [loadLeagueDetails]);

  useEffect(() => {
    if (leagueDetails) {
      if (leagueDetails['admin_entry'] && leagueDetails.private) {
        const { name } = leagueDetails;
        getInvitationCode({ name });
      }
    }
  }, [leagueDetails]);

  const copyToClipboard = (e) => {
    e.target.select();
    document.execCommand('copy');
    e.target.focus();
    setCopy(true);
  };

  const handleLeaveLeague = async () => {
    const { name } = leagueDetails;
    try {
      await leaveLeague({ name });
      history.push('/leagues');
    } catch (err) {
      console.log(err);
    }
  };

  const data = {
    title: t('LeagueDetails.table.title'),
  };

  /* eslint-disable */
  const columns = [
    {
      Header: () => (
        <span className={cn(styles['table-title'], 'uppercase', 'font-bold')}>
          {t('LeagueDetails.table.rank')}
        </span>
      ),
      maxWidth: 100,
      accessor: 'current_rank',
      Cell: (props: any) => {
        const movement = props.original.current_rank < props.original.last_rank;
        const noMovement =
          props.original.last_rank === 0 ||
          props.original.current_rank === props.original.last_rank;

        return (
          <div className={`h-full flex justify-center items-center`}>
            <span
              className={cn(
                styles.movement,
                'flex',
                'items-center',
                movement ? styles.up : !noMovement ? styles.down : '',
              )}
            >
              <span className='mr-2'>{props.index + 1}.</span>
              {movement ? <FaArrowUp /> : noMovement ? <FaMinus /> : <FaArrowDown />}
            </span>{' '}
          </div>
        );
      },
    },
    {
      Header: () => (
        <span className={cn(styles['table-title'], 'uppercase', 'font-bold')}>
          {t('LeagueDetails.table.team')}
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
        <span className={cn(styles['table-title'], 'uppercase', 'font-bold')}>
          {t('LeagueDetails.table.GW')}
        </span>
      ),
      accessor: 'gameweek_points',

      Cell: (props: any) => (
        <span className='h-full flex justify-center items-center'>{props.value}</span>
      ),
    },
    {
      Header: () => (
        <span className={cn(styles['table-title'], 'uppercase', 'font-bold')}>
          {t('LeagueDetails.table.TOT')}
        </span>
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

  if (leagueDetails.forbidden) {
    history.push('/leagues');
  }

  const link = `${window.location.origin}/joinLeague/${code}`;
  const tableData = leagueDetails.participants.sort(
    (a, b) => parseFloat(a.current_rank) - parseFloat(b.current_rank),
  );

  return (
    <div className={styles['league-details']}>
      <div className={cn(header.jumbotron, header.paper, 'mb-12', 'rounded')}>
        <div className={cn(header['jumbotron-content'], 'mt-12')}>
          <h2 className={cn(header.title, 'text-secondary')}>
            <div className={cn(header.sub, header.title, 'mb-4', 'flex', 'items-center')}>
              {t('LeagueDetails.title.sub')}
            </div>
            {leagueDetails.name}
          </h2>
          <div className='mt-4'>
            <ShareLink link={link}>
              {(link) => (
                <a href={link} target='_blank'>
                  {t('LeagueDetails.facebookInvite')}
                </a>
              )}
            </ShareLink>
          </div>
        </div>
      </div>
      <div className={cn(styles.background, 'mb-3', 'p-1')}>
        <div className={styles.tables}>
          <LeagueTable
            columns={columns}
            data={tableData}
            title={data}
            isLeaguePatcicipatnts={true}
          />
        </div>
        {leagueDetails['admin_entry'] && leagueDetails.private ? (
          <div className={`p-6`}>
            <h2 className={cn(styles.admin, styles.title, 'text-secondary', 'mb-3')}>
              {t('LeagueDetails.invitation.title')}
            </h2>
            <p className='text-gray-600 text-s italic mb-5'>
              {t('LeagueDetails.invitation.message')}
            </p>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase text-gray-700 text-xs font-bold mb-2'
                  htmlFor='league-code'
                >
                  {t('PrivateLeagueModal.invitationCode')}
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='league-code'
                  type='text'
                  name='code'
                  onClick={(e) => copyToClipboard(e)}
                  readOnly
                  value={code}
                />
              </div>
            </div>
            {copied ? (
              <p className='text-xs text-green-500 italic mb-5'>
                {t('PrivateLeagueModal.copied')}
              </p>
            ) : (
              <p className='text-xs text-gray-600 italic mb-5'>
                {t('PrivateLeagueModal.clickToCopy')}
              </p>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
      {leagueDetails['entry_can_leave'] && (
        <div className={cn(styles.paper, 'p-8', 'rounded')}>
          <h2 className={cn(styles.title, 'text-secondary', 'mb-2')}>
            {t('LeagueDetails.leaveLeague.title')}
          </h2>
          <p className='text-gray-600 text-s italic mb-5'>
            {t('LeagueDetails.leaveLeague.message')}
          </p>
          <button
            className='whitespace-no-wrap g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded font-semibold uppercase'
            onClick={handleLeaveLeague}
          >
            {t('LeagueDetails.leaveLeague.button')}
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  leagueDetails: rootState.league.leagueDetails,
  code: rootState.league.code,
});

const actions = { loadLeagueDetails, getInvitationCode, leaveLeague };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

/* eslint-disable */
export default withRouter(
  // @ts-ignore
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LeagueDetails),
);
