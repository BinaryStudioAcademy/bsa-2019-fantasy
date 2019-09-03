import { History } from 'history';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';

import {
  usePitchPlayers,
  transformToPitchPlayers,
} from 'components/Pitch/use-pitch-players.hook';
import { loadAutoPickAction } from 'components/PlayersSelection/actions';
import { currentGameweekSelector } from 'store/selectors/current-gameweek.selector';
import { updateUserTeamDetails } from 'containers/Profile/actions';
import { RootState } from 'store/types';

export const useInitialTeamSelection = (history: History) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile.user!);
  const clubs = useSelector((state: RootState) => state.clubs.clubs);
  const currentGameweek = useSelector(currentGameweekSelector);
  const autoPick = useSelector((state: RootState) => state.playerSelection.autoPick);

  const { pitchPlayers, setPitch } = usePitchPlayers();
  const [moneyRemaining, setMoneyRemaining] = useState<number>(user.money);
  const [isMoreThree, setIsMoreThree] = useState<{ status: boolean; club: string }>({
    status: false,
    club: '',
  });

  // Initial load of autopick data to store
  useEffect(() => {
    dispatch(loadAutoPickAction());
  }, []);

  // Recalculate amount of players in clubs and react to results
  useEffect(() => {
    const clubAmounts: Record<string, number> = clubs.reduce(
      (acc, c) => ({
        ...acc,
        [c.short_name]: pitchPlayers.filter(
          (p) => p.item && p.item.player_stats.club_id === c.id,
        ).length,
      }),
      {},
    );

    if (Object.values(clubAmounts).some((v) => v > 3)) {
      const arr = Object.entries(clubAmounts)
        .filter(([, amount]) => amount > 3)
        .map(([name]) => name);

      const club = clubs.find((c) => arr.includes(c.short_name));

      if (club) {
        setIsMoreThree({
          status: true,
          club: club.name,
        });
      }
    } else {
      setIsMoreThree({
        status: false,
        club: '',
      });
    }
  }, [pitchPlayers, clubs]);

  // Recalculate remaining money when pitchPlayers change
  useEffect(() => {
    const totalTeamPrice = pitchPlayers.reduce(
      (prev, { item }) => (item ? prev + item.player_stats.player_price : prev),
      0,
    );

    setMoneyRemaining(user.money - totalTeamPrice);
  }, [pitchPlayers]);

  const handleSaveTeam = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    const teamName = ev.target[0].value;

    if (!teamName) {
      return;
    }

    const teamMemberData = pitchPlayers.map(({ item }, i) => ({
      player_id: item!.player_stats.id,
      is_on_bench: i % 4 === 0,
      is_captain: i === 1,
      is_vice_captain: i === 2,
    }));

    const gameweek_id = currentGameweek!.id;

    dispatch(
      updateUserTeamDetails(
        { money: moneyRemaining, team_name: teamName },
        teamMemberData,
        gameweek_id,
      ),
    );

    history.push('/');
  };

  const handleResetSquad = () => {
    setPitch((players) => players.map(({ item, ...rest }) => ({ ...rest, item: null })));
    setIsMoreThree({ status: false, club: '' });
  };

  const handleAutoPick = useCallback(() => {
    if (autoPick && autoPick.length) {
      const newAutoPickSquad = transformToPitchPlayers(
        autoPick.map((p) => ({
          player_stats: p,
          player_id: p.id,
          is_on_bench: false,
          is_captain: false,
          is_vice_captain: false,
        })),
        clubs,
      );
      setPitch(newAutoPickSquad);

      dispatch(loadAutoPickAction());
    }
  }, [autoPick, clubs]);

  return {
    pitchPlayers,
    isMoreThree,
    moneyRemaining,
    setPitch,
    handleAutoPick,
    handleResetSquad,
    handleSaveTeam,
  };
};
