import React from 'react';
import { useTranslation } from 'react-i18next';

import { Position, PlayerType } from 'types/player.types';
import { PlayerTypes } from 'components/Gameweek/PlayerSelection/types';

import info from 'assets/images/info.svg';

type Props = {
  players: any;
  onOpenInfo?: (id: string, club_id: string) => void;
};

const TransfersTeamList = ({ players, onOpenInfo }: Props) => {
  const { t } = useTranslation();

  const { GKP, DEF, MID, FWD } = Position;
  const goalkeepers = players.filter(
    ({ lastDroppedItem }) => lastDroppedItem.position === GKP,
  );
  const defenders = players.filter(
    ({ lastDroppedItem }) => lastDroppedItem.position === DEF,
  );
  const midfielders = players.filter(
    ({ lastDroppedItem }) => lastDroppedItem.position === MID,
  );
  const forwards = players.filter(
    ({ lastDroppedItem }) => lastDroppedItem.position === FWD,
  );

  const renderHeader = (color, position) => (
    <tr className={`bg-white w-full ${color}`}>
      <th className='w-1/12' align='center'>
        &nbsp;
      </th>
      <th className='w-3/12 capitalize' align='left'>
        {position}
      </th>
      <th className='w-2/12' align='center'>
        Goals
      </th>
      <th className='w-2/12' align='center'>
        MS
      </th>
      <th className='w-2/12' align='center'>
        PTS
      </th>
      <th className='w-2/12' align='center'>
        RC
      </th>
    </tr>
  );

  const renderItem = (
    { id, src, name, club, goals, missed_passes, points, red_cards },
    position,
  ) => (
    <tr key={id} className='bg-white w-full' style={{ borderBottom: '1px solid #ddd' }}>
      <td className='w-1/12 py-4' align='center' valign='middle'>
        <button
          className='p-1 flex justify-center opacity-50 hover:opacity-75'
          onClick={() => onOpenInfo!(id, club)}
        >
          <img src={info} alt='info' />
        </button>
      </td>
      <td className='w-3/12 capitalize' align='left'>
        <button
          className='flex flex-row pr-10 w-full'
          style={{ borderRight: '2px solid #ddd' }}
        >
          <img className='w-8 mr-2' src={src} alt='player' />
          <div className='flex flex-col items-start'>
            <div className='text-left'>{name || 'Unassigned'}</div>
            <div>
              {club && <span className='mr-1 font-semibold'>{club}</span>}
              <span>{position}</span>
            </div>
          </div>
        </button>
      </td>
      <td className='w-2/12 font-normal' align='center'>
        {goals}
      </td>
      <td className='w-2/12 font-normal' align='center'>
        {missed_passes}
      </td>
      <td className='w-2/12 font-normal' align='center'>
        {points}
      </td>
      <td className='w-2/12 font-normal' align='center'>
        {red_cards}
      </td>
    </tr>
  );

  return (
    <table className='my-0 mx-auto w-full'>
      <tbody>
        {renderHeader('bg-yellow-400', t('roles.goalkeeper_plural'))}
        {goalkeepers.map(({ lastDroppedItem }) => {
          return renderItem(lastDroppedItem, PlayerTypes.GOALKEEPER);
        })}
        {renderHeader('bg-green-400', t('roles.defender_plural'))}
        {defenders.map(({ lastDroppedItem }) => {
          return renderItem(lastDroppedItem, PlayerTypes.DEFENDER);
        })}
        {renderHeader('bg-blue-400', t('roles.midfielder_plural'))}
        {midfielders.map(({ lastDroppedItem }) => {
          return renderItem(lastDroppedItem, PlayerTypes.MIDDLEFIELDER);
        })}
        {renderHeader('bg-red-400', t('roles.forward_plural'))}
        {forwards.map(({ lastDroppedItem }) => {
          return renderItem(lastDroppedItem, PlayerTypes.GOALKEEPER);
        })}
      </tbody>
    </table>
  );
};

export default TransfersTeamList;
