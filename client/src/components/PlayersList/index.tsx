import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'store/types';
import { Position, PlayerType } from 'types/player.types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { PlayerItem } from '../PlayerItem/index';
import { PlayerTypes } from 'components/Gameweek/PlayerSelection/types';
import { getFieldPlayersUniformUrl, getGoalkeepersUniformUrl } from 'helpers/images';
import info from 'assets/images/info.svg';
import { filteredBy } from '../PlayersSelection/constants';

type Props = {
  players: PlayerType[];
  onOpenInfo?: (id: string, club_id: string) => void;
  onFilterSelectChange: (item: any) => void;
};

export const PlayerList = ({ players, onOpenInfo, onFilterSelectChange }: Props) => {
  const { t } = useTranslation();

  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const { GKP, DEF, MID, FWD } = Position;
  const goalkeepers = players.filter((player) => {
    return player.position === GKP ? true : false;
  });
  const defenders = players.filter((player) => {
    return player.position === DEF ? true : false;
  });
  const midfielders = players.filter((player) => {
    return player.position === MID ? true : false;
  });
  const forwards = players.filter((player) => {
    return player.position === FWD ? true : false;
  });

  const handlePositionClick = (ev) => {
    const pos = ev.currentTarget.innerHTML;
    const filters = filteredBy[1].items;

    switch (pos) {
      case 'goalkeepers':
        onFilterSelectChange(filters[0]);
        break;
      case 'defenders':
        onFilterSelectChange(filters[1]);
        break;
      case 'midfielders':
        onFilterSelectChange(filters[2]);
        break;
      case 'forwards':
        onFilterSelectChange(filters[3]);
        break;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <table className='w-full shadow rounded overflow-hidden'>
        <tbody>
          <tr className='bg-yellow-400'>
            <th className='w-1/6' align='left'>
              &nbsp;
            </th>
            <th
              className='w-3/6 capitalize cursor-pointer'
              align='left'
              onClick={(ev) => {
                handlePositionClick(ev);
              }}
            >
              {t('roles.goalkeeper_plural')}
            </th>
            <th className='w-1/6' align='left'>
              £
            </th>
            <th className='w-1/6' align='left'>
              **
            </th>
          </tr>
          {goalkeepers.map((player) => (
            <PlayerItem
              key={`player-goalkeeper-${player.id}`}
              id={player.id}
              name={player.second_name}
              club_id={player.club_id}
              club={clubs[player.club_id - 1].short_name}
              position={PlayerTypes.GOALKEEPER}
              price={player.player_price}
              score={player.player_score}
              info={info}
              onOpenInfo={onOpenInfo}
              imageURL={getGoalkeepersUniformUrl(clubs[player.club_id - 1].code)}
            />
          ))}
          <tr className='bg-green-400'>
            <th className='w-1/6' align='left'>
              &nbsp;
            </th>
            <th
              className='w-3/6 capitalize cursor-pointer'
              align='left'
              onClick={(ev) => {
                handlePositionClick(ev);
              }}
            >
              {t('roles.defender_plural')}
            </th>
            <th className='w-1/6' align='left'>
              £
            </th>
            <th className='w-1/6' align='left'>
              **
            </th>
          </tr>
          {defenders.map((player) => (
            <PlayerItem
              key={`player-defender-${player.id}`}
              id={player.id}
              name={player.second_name}
              club_id={player.club_id}
              club={clubs[player.club_id - 1].short_name}
              position={PlayerTypes.DEFENDER}
              price={player.player_price}
              score={player.player_score}
              info={info}
              onOpenInfo={onOpenInfo}
              imageURL={getFieldPlayersUniformUrl(clubs[player.club_id - 1].code)}
            />
          ))}
          <tr className='bg-blue-400'>
            <th className='w-1/6' align='left'>
              &nbsp;
            </th>
            <th
              className='w-3/6 capitalize cursor-pointer'
              align='left'
              onClick={(ev) => {
                handlePositionClick(ev);
              }}
            >
              {t('roles.midfielder_plural')}
            </th>
            <th className='w-1/6' align='left'>
              £
            </th>
            <th className='w-1/6' align='left'>
              **
            </th>
          </tr>
          {midfielders.map((player) => (
            <PlayerItem
              key={`player-midfielder-${player.id}`}
              id={player.id}
              name={player.second_name}
              club_id={player.club_id}
              club={clubs[player.club_id - 1].short_name}
              position={PlayerTypes.MIDDLEFIELDER}
              price={player.player_price}
              score={player.player_score}
              info={info}
              onOpenInfo={onOpenInfo}
              imageURL={getFieldPlayersUniformUrl(clubs[player.club_id - 1].code)}
            />
          ))}
          <tr className='bg-red-400'>
            <th className='w-1/6' align='left'>
              &nbsp;
            </th>
            <th
              className='w-3/6 capitalize cursor-pointer'
              align='left'
              onClick={(ev) => {
                handlePositionClick(ev);
              }}
            >
              {t('roles.forward_plural')}
            </th>
            <th className='w-1/6' align='left'>
              £
            </th>
            <th className='w-1/6' align='left'>
              **
            </th>
          </tr>
          {forwards.map((player) => (
            <PlayerItem
              key={`player-forward-${player.id}`}
              id={player.id}
              name={player.second_name}
              club_id={player.club_id}
              club={clubs[player.club_id - 1].short_name}
              position={PlayerTypes.FORWARD}
              price={player.player_price}
              score={player.player_score}
              info={info}
              onOpenInfo={onOpenInfo}
              imageURL={getFieldPlayersUniformUrl(clubs[player.club_id - 1].code)}
            />
          ))}
        </tbody>
      </table>
    </DndProvider>
  );
};
