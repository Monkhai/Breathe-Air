import { CyclicSessionHistoryDAO } from '@/db/SQLite';
import { useEffect, useState } from 'react';
const dbCyclicSession = new CyclicSessionHistoryDAO();

const useGetCyclicStats = (isDBLoading: boolean) => {
  const [average, setAverage] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    if (!isDBLoading) {
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
    }
  }, [isDBLoading]);
  return { average, max, isLoading, error };
};

export default useGetCyclicStats;
