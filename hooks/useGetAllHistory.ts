import { useEffect, useState } from 'react';
import { CyclicSessionHistoryDAO, CyclicSessionHistory } from '../db/SQLite';

export type Round = {
  roundNumber: 1 | 2 | 3 | 4 | 5;
  holdTime: number;
};

export type SortedSessionHistory = {
  timestamp: string;
  rounds: Round[];
};

const useGetAllHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState<SortedSessionHistory[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const dbHistory = new CyclicSessionHistoryDAO();
        const history: CyclicSessionHistory[] = await dbHistory.getAllCyclicHistory();

        const sortedHistory: Record<number, SortedSessionHistory> = history.reduce(
          (acc, result) => {
            const round: Round = {
              roundNumber: result.round_number as 1 | 2 | 3 | 4 | 5,
              holdTime: result.hold_time,
            };

            if (!acc[result.session_id]) {
              acc[result.session_id] = {
                timestamp: result.created_at,
                rounds: [round],
              };
            } else {
              acc[result.session_id].rounds.push(round);
            }

            return acc;
          },
          {} as Record<number, SortedSessionHistory>
        );

        const sortedData = Object.values(sortedHistory).sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setHistoryData(sortedData);
        setIsLoading(false);
      } catch (error: any) {
        const e = error as Error;
        setError(e);
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { isLoading, historyData, error };
};

export default useGetAllHistory;
