import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDom from 'react-dom';
import classNames from 'classnames';

import { PlayerDataType } from 'containers/Players/actions';
import Spinner from 'components/Spinner';
import { Player } from 'types/player.types';

type Props = {
  playerDialogData: PlayerDataType;
  player: Player;
  onDismiss: () => void;
  loading: boolean;
  clubName: string | undefined;
};

const cellStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px 2px',
};

const PlayerDialog = (props: Props) => {
  const { t } = useTranslation();

  const positionDict: { [key: string]: { name: string; color: string } } = {
    GKP: {
      name: t('PlayerDialog.goalkeeper'),
      color: 'bg-yellow-400',
    },
    DEF: {
      name: t('PlayerDialog.defender'),
      color: 'bg-green-600',
    },
    MID: {
      name: t('PlayerDialog.midfielder'),
      color: 'bg-teal-400',
    },
    FWD: {
      name: t('PlayerDialog.forward'),
      color: 'bg-red-600',
    },
  };

  const [currentTab, setCurrentTab] = useState('history');

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
            'bg-gray-400 w-1/12',
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
    const {
      playerDialogData: { history },
    } = props as Props;

    if (history.length < 1) {
      return (
        <div className='self-center' style={{ width: '90%' }}>
          <h3 className='text-lg font-medium'>{t('PlayerDialog.thisSeason')}</h3>
          <h4>{t('PlayerDialog.haventPlayed')}</h4>
        </div>
      );
    }

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
        { goals },
        { assists },
        { missed_passes },
        { goals_conceded },
        { saves },
        { yellow_cards },
        { red_cards },
      ],
    );
    return (
      <div>
        <h3 className='text-lg font-medium'>{t('PlayerDialog.thisSeason')}</h3>
        <div className='overflow-y-auto' style={{ width: '100%', maxHeight: '300px' }}>
          <div className='flex text-sm mt-4'>{renderHistoryHeader(historyRows[0])}</div>
          {renderHistoryRows(historyRows)}
        </div>
      </div>
    );
  };

  const renderFixtures = () => {
    const {
      playerDialogData: { fixtures },
    } = props as Props;

    return (
      <div
        className='self-center overflow-y-auto'
        style={{ width: '100%', maxHeight: '300px' }}
      >
        <div className='flex'>
          <div className='w-7/12 bg-gray-400'>{t('PlayerDialog.date')}</div>
          <div className='w-2/12 bg-gray-400'>{t('PlayerDialog.round')}</div>
          <div className='w-3/12 bg-gray-400'>{t('PlayerDialog.opponent')}</div>
        </div>
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

  const {
    player: { first_name, second_name, position },
    loading,
    onDismiss,
    clubName,
  } = props;

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
          className='modal flex flex-col m-auto max-w-xl max-h-full bg-white w-6/12 p-4'
          onClick={(e) => e.stopPropagation()}
          role='presentation'
        >
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
              <div className='text-sm'>{clubName}</div>
            </div>

            <img
              className='mt-2 mr-10'
              style={{ maxWidth: '100%', height: 'auto', maxHeight: '10rem' }}
              src={`/images/players/500x500/${props.player.code}.png`}
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
