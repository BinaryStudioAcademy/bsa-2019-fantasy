import React, { useMemo } from 'react';
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
  onOpenInfo?: (id: string, club_id: number) => void;
  onFilterSelectChange: (item: any) => void;
};

export const PlayerList = ({
  players: givenPlayers,
  onOpenInfo,
  onFilterSelectChange,
}: Props) => {
  const { t } = useTranslation();

  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const players = useMemo(
    () =>
      clubs.length > 0
        ? givenPlayers.map((p) => ({
            player_stats: p,
            display: {
              src:
                p.position === PlayerTypes.GOALKEEPER
                  ? getGoalkeepersUniformUrl(clubs[p.club_id - 1].code)
                  : getFieldPlayersUniformUrl(clubs[p.club_id - 1].code),
            },
          }))
        : [],
    [clubs.length, givenPlayers],
  );

  const { GKP, DEF, MID, FWD } = Position;

  const goalkeepers = players.filter(({ player_stats }) => {
    return player_stats.position === GKP ? true : false;
  });
  const defenders = players.filter(({ player_stats }) => {
    return player_stats.position === DEF ? true : false;
  });
  const midfielders = players.filter(({ player_stats }) => {
    return player_stats.position === MID ? true : false;
  });
  const forwards = players.filter(({ player_stats }) => {
    return player_stats.position === FWD ? true : false;
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
          {goalkeepers.map((p) => (
            <PlayerItem
              key={`player-goalkeeper-${p.player_stats.id}`}
              player={p}
              info={info}
              onOpenInfo={onOpenInfo}
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
          {defenders.map((p) => (
            <PlayerItem
              key={`player-defender-${p.player_stats.id}`}
              player={p}
              info={info}
              onOpenInfo={onOpenInfo}
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
          {midfielders.map((p) => (
            <PlayerItem
              key={`player-midfielder-${p.player_stats.id}`}
              player={p}
              info={info}
              onOpenInfo={onOpenInfo}
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
          {forwards.map((p) => (
            <PlayerItem
              key={`player-forward-${p.player_stats.id}`}
              player={p}
              info={info}
              onOpenInfo={onOpenInfo}
            />
          ))}
        </tbody>
      </table>
    </DndProvider>
  );
};
