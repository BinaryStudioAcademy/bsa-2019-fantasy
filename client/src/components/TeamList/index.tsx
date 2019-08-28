import React, { useMemo } from 'react';

import { PitchPlayerType, DisplayPlayerType } from 'components/Pitch/types';
import { categorizePlayers } from 'helpers/categorizePlayers';

import TeamListHeader from './components/TeamListHeader';
import TeamListItem from './components/TeamListItem';

import * as S from './styles';

type Props = {
  players: PitchPlayerType[];
  hasBench: boolean;

  onPlayerClick?: (player: DisplayPlayerType) => void;
};

const TeamList = ({ players: givenPlayers, hasBench, onPlayerClick }: Props) => {
  const players = useMemo(() => givenPlayers.map((p) => p.item).filter((p) => p), [
    givenPlayers,
  ]) as DisplayPlayerType[];

  let categorizedPlayers: { [k: string]: (DisplayPlayerType | null)[] };
  if (hasBench) {
    categorizedPlayers = {
      Starters: players.filter((p) => !p.is_on_bench),
      Substitutes: players.filter((p) => p.is_on_bench),
    };
  } else {
    const { GKP, DEF, MID, FWD } = categorizePlayers(players);

    categorizedPlayers = {
      Goalkeepers: GKP.concat(Array(2 - GKP.length).fill(null)),
      Defenders: DEF.concat(Array(5 - DEF.length).fill(null)),
      Midfielders: MID.concat(Array(5 - MID.length).fill(null)),
      Forwards: FWD.concat(Array(3 - FWD.length).fill(null)),
    };
  }

  return (
    <S.Container className='rounded'>
      <tbody className='w-full flex flex-col'>
        {Object.entries(categorizedPlayers).map(([name, items]) => (
          <React.Fragment key={`team-list-${name}`}>
            <TeamListHeader title={name} />

            {items.map((p, idx) => (
              <TeamListItem
                onClick={onPlayerClick}
                player={p}
                key={`team-list-${name}-${p ? p.player_stats.id : idx}`}
              />
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </S.Container>
  );
};

export default TeamList;
