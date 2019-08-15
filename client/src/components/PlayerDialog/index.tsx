import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import classNames from 'classnames';

import { PlayerDataType } from 'containers/Players/actions';
import Spinner from 'components/Spinner';
import { Player } from 'types/player.types';

import './styles.module.scss';

type Props = {
  playerDialogData: PlayerDataType;
  player: Player;
  onDismiss: () => void;
  loading: boolean;
  clubName: string | undefined;
};

const positionDict: { [key: string]: { name: string; color: string } } = {
  '1': {
    name: 'goalkeeper',
    color: 'bg-yellow-400',
  },
  '2': {
    name: 'defender',
    color: 'bg-green-600',
  },
  '3': {
    name: 'midfielder',
    color: 'bg-teal-400',
  },
  '4': {
    name: 'forward',
    color: 'bg-red-600',
  },
};

const cellStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
};

const PlayerDialog = (props: Props) => {
  const [currentTab, setCurrentTab] = useState('history');

  const renderHistoryHeader = (row: any[]) =>
    row.map((obj, i) => {
      const string = Object.keys(obj)[0]
        .replace('_', ' ')
        .toLowerCase();
      return (
        <div
          key={i + string}
          className={classNames(
            'bg-gray-400 w-1/12',
            {
              'w-4/12': string === 'opponent',
            },
            {
              'w-2/12': string === 'gameweek',
            },
          )}
        >
          <abbr title={string}>
            {string === 'gameweek'
              ? 'GM'
              : string === 'opponent'
              ? 'Opponent'
              : string
                  .split(' ')
                  .map((w) => w.charAt(0))
                  .join('')
                  .toUpperCase()}
          </abbr>
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
          <h3 className='text-lg font-medium'>This season</h3>
          <h4>This player hasn't player any games yet</h4>
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
        <h3 className='text-lg font-medium'>This season</h3>
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
          <div className='w-7/12 bg-gray-400'>Date</div>
          <div className='w-2/12 bg-gray-400'>Round</div>
          <div className='w-3/12 bg-gray-400'>Opponent</div>
        </div>
        {fixtures.map((fixture, i) => (
          <div key={fixture.start} style={cellStyle} className='flex text-sm'>
            <div className='w-7/12 cell'>{fixture.start}</div>
            <div className='w-2/12 cell'>{fixture.round}</div>
            <div className='w-3/12 cell'>{fixture.opp}</div>
          </div>
        ))}
      </div>
    );
  };

  return ReactDom.createPortal(
    <div>
      <div
        className='dimmer flex absolute inset-0 bg-modalDimmer'
        onClick={props.onDismiss}
        tabIndex={-1}
        role='presentation'
      >
        {props.loading ? (
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
                  <span>{props.player.first_name}</span>
                  <span>{props.player.second_name}</span>
                </div>
                <span
                  className={`${positionDict[props.player.position].color} p-1`}
                  style={{ color: 'black' }}
                >
                  {positionDict[props.player.position].name}
                </span>
                <div className='text-sm'>{props.clubName}</div>
              </div>

              <div className=''>
                <img
                  className='mt-2 mr-10'
                  style={{ maxWidth: '100%', height: 'auto', maxHeight: '10rem' }}
                  src={`/images/players/500x500/${props.player.code}.png`}
                  alt='playerPhoto'
                />
              </div>
            </div>

            <ul className='self-center flex flex-row bg-primary rounded text-sm m-6'>
              <li
                onClick={() => setCurrentTab('history')}
                role='presentation'
                className={classNames('pl-4', 'pr-4', 'm-1', 'cursor-pointer', {
                  'bg-white': currentTab === 'history',
                })}
              >
                History
              </li>
              <li
                onClick={() => setCurrentTab('fixtures')}
                role='presentation'
                className={classNames('pl-4', 'pr-4', 'm-1', 'cursor-pointer', {
                  'bg-white': currentTab === 'fixtures',
                })}
              >
                Fixtures
              </li>
            </ul>

            {currentTab === 'history' ? renderHistory() : renderFixtures()}
          </form>
        )}
      </div>
      )
    </div>,
    document.querySelector('#modal') as Element,
  );
};

export default PlayerDialog;
