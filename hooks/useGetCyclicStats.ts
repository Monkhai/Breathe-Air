import { CyclicSessionHistoryDAO } from '@/db/SQLite';
import { useEffect, useState } from 'react';

const useGetCyclicStats = () => {
  const [average, setAverage] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    const dbCyclicSession = new CyclicSessionHistoryDAO();
    Promise.all([
      dbCyclicSession.getMaxCyclicHoldTime(),
      dbCyclicSession.getAverageCyclicHoldTime(),
    ])
      .then(([maxResult, averageResult]) => {
        setMax(maxResult);
        setAverage(averageResult);
        setIsloading(false);
      })
      .catch((error) => {
        const e = error as Error;
        setIsloading(false);
        setError(e);
      });
  }, []);
  return { average, max, isLoading, error };
};
