import { SessionHistory, SessionHistoryDAO } from '../db/SQLite';

export type SortedSessionHistory = {
  timestamp: string;
  rounds: SessionHistory[];
};

const useGetAllHistory = async () => {
  const dbHistory = new SessionHistoryDAO();
  const history = await dbHistory.getAllHistory();
  const historyArray: SortedSessionHistory[] = Object.keys(history).map((timestamp) => ({
    timestamp,
    rounds: history[timestamp],
  }));
  return historyArray;
};

export default useGetAllHistory;
