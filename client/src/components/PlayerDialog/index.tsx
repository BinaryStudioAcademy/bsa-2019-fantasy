import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDom from 'react-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { PlayerDataType } from 'containers/Players/actions';
import Spinner from 'components/Spinner';
import { FaTimes } from 'react-icons/fa';
import { PlayerType } from 'types/player.types';
import { RootState } from 'store/types';
import { Club } from 'types/club.type';

import cn from 'classnames';
import styles from 'components/Modal/styles.module.scss';

type Props = {
  playerDialogData: PlayerDataType;
  player: PlayerType;
  onDismiss: () => void;
  loading: boolean;
  tab?: 'fixtures' | 'history';
};

const cellStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px 2px',
};

const PlayerDialog = ({ playerDialogData, player, onDismiss, loading, tab }: Props) => {
  const { t } = useTranslation();

  const positionDict: { [key: string]: { name: string; color: string } } = {
    GKP: {
      name: t('roles.goalkeeper'),
      color: 'bg-yellow-400',
    },
    DEF: {
      name: t('roles.defender'),
      color: 'bg-green-600',
    },
    MID: {
      name: t('roles.midfielder'),
      color: 'bg-teal-400',
    },
    FWD: {
      name: t('roles.forward'),
      color: 'bg-red-600',
    },
  };

  const clubs = useSelector((state: RootState) => state.clubs.clubs);
  const getClubNameById = (club_id: number) => {
    const club = clubs.find((club: Club | undefined) => club && club.id === club_id);
    return (club && club.name) || undefined;
  };

  const initialTab = tab ? tab : 'history';
  const [currentTab, setCurrentTab] = useState<'fixtures' | 'history'>(initialTab);

  const renderHistoryHeader = (row: any[]) =>
    row.map((obj, i) => {
      const fieldName: string = Object.keys(obj)[0]
        .replace('_', ' ')
        .toLowerCase();

      let string;
      if (fieldName === 'gameweek') {
        string = 'GM';
      } else if (fieldName === 'opponent') {
        string = 'Opponent';
      } else {
        string = fieldName
          .split(' ')
          .map((w) => w.charAt(0))
          .join('')
          .toUpperCase();
      }

      return (
        <div
          key={i + string}
          className={classNames(
            ' bg-gray-400 w-1/12  p-1',
            {
              'w-4/12': string === 'Opponent',
            },
            {
              'w-2/12': string === 'GM',
            },
          )}
        >
          <abbr title={fieldName}>{string}</abbr>
        </div>
      );
    });

  const renderHistoryRows = (historyRows: any[]) =>
    historyRows.map((row, i) => (
      <div key={i} className='flex'>
        {row.map((obj: any) => {
          const [key, value] = Object.entries(obj)[0];

          return (
            <div
              style={cellStyle}
              key={new Date().getTime() + key}
              className={classNames(
                'w-1/12',
                {
                  'w-4/12': key === 'opponent',
                },
                {
                  'w-2/12': key === 'gameweek',
                },
              )}
            >
              {value as string}
            </div>
          );
        })}
      </div>
    ));

  const renderHistory = () => {
    let { history } = playerDialogData;

    if (history.length < 1) {
      return (
        <div className='self-center' style={{ width: '90%' }}>
          <h3 className='text-lg font-medium'>{t('PlayerDialog.thisSeason')}</h3>
          <h4>{t('PlayerDialog.haventPlayed')}</h4>
        </div>
      );
    }
    history = [...history].sort((a, b) => a.gameweek.number - b.gameweek.number);
    const historyRows = history.map(
      ({
        gameweek: { number },
        game: { opp, res },
        stats: {
          goals,
          assists,
          missed_passes,
          goals_conceded,
          saves,
          yellow_cards,
          red_cards,
        },
      }) => [
        { gameweek: number },
        { opponent: `${opp} ${res}` },
        { goals: goals === 0 ? '-' : goals },
        { assists: assists === 0 ? '-' : assists },
        { missed_passes: missed_passes === 0 ? '-' : missed_passes },
        { goals_conceded: goals_conceded === 0 ? '-' : goals_conceded },
        { saves: saves === 0 ? '-' : saves },
        { yellow_cards: yellow_cards === 0 ? '-' : yellow_cards },
        { red_cards: red_cards === 0 ? '-' : red_cards },
      ],
    );
    return (
      <div>
        <h3 className='text-lg font-medium'>{t('PlayerDialog.thisSeason')}</h3>
        <div className='overflow-y-auto' style={{ width: '100%', maxHeight: '300px' }}>
          <div className='flex w-1/3 fixed text-sm '>
            {renderHistoryHeader(historyRows[0])}
          </div>
          <div className='mt-8'>{renderHistoryRows(historyRows)}</div>
        </div>
      </div>
    );
  };

  const renderFixtures = () => {
    const { fixtures } = playerDialogData;

    return (
      <div
        className='self-center overflow-y-auto'
        style={{ width: '100%', maxHeight: '300px' }}
      >
        <div className='flex fixed w-1/3 '>
          <div className='w-7/12 bg-gray-400 p-1'>{t('PlayerDialog.date')}</div>
          <div className='w-2/12 bg-gray-400 p-1'>{t('PlayerDialog.round')}</div>
          <div className='w-3/12 bg-gray-400 p-1'>{t('PlayerDialog.opponent')}</div>
        </div>
        <div className='mt-8'></div>
        {fixtures.map((fixture, i) => (
          <div key={fixture.start} style={cellStyle} className='flex text-sm'>
            <div className='w-7/12'>{fixture.start}</div>
            <div className='w-2/12'>{fixture.round}</div>
            <div className='w-3/12'>{fixture.opp}</div>
          </div>
        ))}
      </div>
    );
  };

  const { first_name, second_name, position, club_id } = player;

  return ReactDom.createPortal(
    <div
      className='dimmer flex absolute inset-0 bg-modalDimmer'
      onClick={onDismiss}
      tabIndex={-1}
      role='presentation'
    >
      {loading ? (
        <Spinner />
      ) : (
        <form
          className='modal rounded relative flex flex-col m-auto max-w-xl max-h-full bg-white w-6/12 p-6'
          onClick={(e) => e.stopPropagation()}
          role='presentation'
        >
          <button
            className={cn(
              styles.modalClose,
              'absolute cursor-pointer bottom-2 right-0 p-1',
            )}
            onClick={onDismiss}
          >
            <FaTimes />
          </button>
          <div className='flex justify-between bg-secondary p-4 pb-0'>
            <div className='text-white'>
              <div className='text-xl font-semibold mb-2'>
                {first_name + ' ' + second_name}
              </div>
              <span
                className={`${positionDict[position].color} p-1`}
                style={{ color: 'black' }}
              >
                {positionDict[position].name}
              </span>
              <div className='text-sm'>{getClubNameById(club_id)}</div>
            </div>

            <img
              className='mt-2 mr-10'
              style={{ maxWidth: '100%', height: 'auto', maxHeight: '10rem' }}
              src={`/images/players/500x500/${player.code}.png`}
              alt='playerPhoto'
            />
          </div>

          <ul className='self-center flex flex-row bg-primary rounded text-sm m-6'>
            <li
              role='presentation'
              onClick={() => setCurrentTab('history')}
              className={classNames('pl-4 pr-4 m-1 cursor-pointer', {
                'bg-white': currentTab === 'history',
              })}
            >
              {t('PlayerDialog.history')}
            </li>
            <li
              role='presentation'
              onClick={() => setCurrentTab('fixtures')}
              className={classNames('pl-4 pr-4 m-1 cursor-pointer', {
                'bg-white': currentTab === 'fixtures',
              })}
            >
              {t('PlayerDialog.fixtures')}
            </li>
          </ul>

          {currentTab === 'history' ? renderHistory() : renderFixtures()}
        </form>
      )}
    </div>,
    document.querySelector('#modal') as Element,
  );
};

export default PlayerDialog;
