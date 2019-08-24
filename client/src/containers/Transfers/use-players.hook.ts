import { useState, useEffect } from 'react';

import * as playersService from 'services/playersService';
import { PlayerType } from 'types/player.types';

export const usePlayers = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    playersService
      .getPlayers(undefined)
      .then(({ rows, count }) => {
        setPlayers(rows);
        setCount(count);
      })
      .finally(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return { players, count, loading };
};
