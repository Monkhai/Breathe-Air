import { useEffect, useState } from 'react';
import { CyclicHistory, CyclicSessionHistoryDAO } from '../db/SQLite';

const dbHistory = new CyclicSessionHistoryDAO();
const useGetOneCyclicSessionHistory = (sessionId: number) => {
  const [history, setHistory] = useState<CyclicHistory[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    dbHistory
      .getOneCyclicSessionHistory(sessionId)
      .then((session) => {
        setHistory(session);
        setIsLoading(false);
      })
      .catch((error) => {
        const e = error as Error;
        setError(e);
        setIsLoading(false);
      });
  }, []);

  return { history, isLoading, error };
};

export default useGetOneCyclicSessionHistory;
