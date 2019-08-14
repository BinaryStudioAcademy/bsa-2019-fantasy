import { useState, useEffect } from 'react';

import { Club } from 'types/club.type';
import { getClubs } from 'services/clubService';

export const useClubs = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getClubs()
      .then((c) => {
        setClubs(c);
      })
      .finally(() => setLoading(false))
      .catch((err) => console.error(err));
  }, []);

  return { clubs, loading };
};
