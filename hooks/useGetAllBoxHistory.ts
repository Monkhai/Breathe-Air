import { BoxSession, BoxSessionHistoryDAO } from '@/db/SQLite';
import { useEffect, useState } from 'react';

const useGetAllBoxHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [boxHistoryData, setBoxHistoryData] = useState<BoxSession[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const dbHistory = new BoxSessionHistoryDAO();
    dbHistory
      .getAllCBoxHistory()
      .then((history) => {
        setBoxHistoryData(history);
        setIsLoading(false);
      })
      .catch((error) => {
        const e = error as Error;
        setError(e);
      });
  }, []);
  return { boxHistoryData, isLoading, error };
};

export default useGetAllBoxHistory;
