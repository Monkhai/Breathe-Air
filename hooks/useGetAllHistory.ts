import { CyclicSessionHistoryDAO, CyclicSession, CyclicSessionHistory } from '../db/SQLite';

export type Round = {
  roundNumber: 1 | 2 | 3 | 4 | 5;
  holdTime: number;
};

export type SortedSessionHistory = {
  timestamp: string;
  rounds: Round[];
};

const useGetAllHistory = async () => {
  const dbHistory = new CyclicSessionHistoryDAO();
  const history: CyclicSessionHistory[] = await dbHistory.getAllCyclicHistory();
  const sortedHistory: SortedSessionHistory[] = [];
};

export default useGetAllHistory;
