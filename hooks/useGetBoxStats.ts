import { BoxSessionHistoryDAO } from '@/db/SQLite';
import { useEffect, useState } from 'react';

const useGetBoxStats = () => {
  const [average, setAverage] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    const dbBoxSession = new BoxSessionHistoryDAO();
    Promise.all([dbBoxSession.getAverageBoxHoldTime(), dbBoxSession.getMaxBoxHoldTime()])
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

export default useGetBoxStats;
