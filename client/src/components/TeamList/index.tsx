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
    const categorized = categorizePlayers(players);
    const { GKP, DEF, MID, FWD } = categorized;

    const emptyPlayerAmounts = {
      GKP: 2 - GKP.length,
      DEF: 5 - DEF.length,
      MID: 5 - MID.length,
      FWD: 3 - FWD.length,
    };

    if (Object.values(emptyPlayerAmounts).some((v) => v < 0)) {
      // eslint-disable-next-line no-console
      console.error('Seems like we have some malformed team right here:', categorized);
      Object.entries(emptyPlayerAmounts).forEach(([type, amount]) => {
        if (amount < 0) {
          emptyPlayerAmounts[type] = 0;
        }
      });
    }

    categorizedPlayers = {
      Goalkeepers: GKP.concat(Array(emptyPlayerAmounts.GKP).fill(null)),
      Defenders: DEF.concat(Array(emptyPlayerAmounts.DEF).fill(null)),
      Midfielders: MID.concat(Array(emptyPlayerAmounts.MID).fill(null)),
      Forwards: FWD.concat(Array(emptyPlayerAmounts.FWD).fill(null)),
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
