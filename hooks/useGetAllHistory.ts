import { CyclicSessionHistoryDAO, SessionHistory } from '../db/SQLite';

export type SortedSessionHistory = {
  timestamp: string;
  rounds: SessionHistory[];
};

const useGetAllHistory = async () => {
  const dbHistory = new CyclicSessionHistoryDAO();
  const history = await dbHistory.getAllCyclicHistory();
  const historyArray: SortedSessionHistory[] = Object.keys(history).map((timestamp) => ({
    timestamp,
    rounds: history[timestamp],
  }));
  return historyArray;
};

export default useGetAllHistory;
