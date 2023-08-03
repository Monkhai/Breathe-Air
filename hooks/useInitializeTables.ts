import { createTables } from '@/db/SQLite';
import { useEffect, useState } from 'react';

const useInitializeTables = () => {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    createTables()
      .then(() => {
        setIsloading(false);
      })
      .catch((error: Error) => {
        setIsloading(false);
        setError(error);
      });
  }, []);

  return { isLoading, error };
};

export default useInitializeTables;
