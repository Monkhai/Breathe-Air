import { BoxSessionHistoryDAO } from '@/db/SQLite';
import { useEffect, useState } from 'react';
const dbBoxSession = new BoxSessionHistoryDAO();

const useGetBoxStats = (isDBLoading: boolean) => {
  const [average, setAverage] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    // const avgPromise = dbBoxSession.getAverageBoxHoldTime();
    // const maxPromise = dbBoxSession.getMaxBoxHoldTime();
    // console.log(maxPromise, avgPromise);

    if (!isDBLoading) {
      Promise.all([dbBoxSession.getAverageBoxHoldTime(), dbBoxSession.getMaxBoxHoldTime()])
        .then(([averageResult, maxResult]) => {
          setMax(maxResult);
          setAverage(averageResult);
          setIsloading(false);
        })
        .catch((error) => {
          const e = error as Error;
          setIsloading(false);
          setError(e);
          console.log(e.message);
        });
    }
  }, [isDBLoading]);
  return { average, max, isLoading, error };
};

export default useGetBoxStats;
