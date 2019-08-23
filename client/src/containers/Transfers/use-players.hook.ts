import { useState, useEffect } from 'react';

import * as playersService from 'services/playersService';
import { PlayerType } from 'types/player.types';

export const usePlayers = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<PlayerType[]>([]);

  useEffect(() => {
    setLoading(true);
    playersService
      .getPlayers(undefined)
      .then((ps) => setPlayers(ps))
      .finally(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return { players, loading };
};
