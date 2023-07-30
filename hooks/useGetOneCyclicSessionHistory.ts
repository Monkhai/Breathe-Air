import { CyclicSessionHistoryDAO } from '../db/SQLite';

const dbHistory = new CyclicSessionHistoryDAO();
const useGetOnSessionHistory = async (sessionId: number) => {
  const data = await dbHistory.getOneCyclicSessionHistory(sessionId);
  const roundData = data.map((round) => ({
    round: round.round_number,
    hold: round.hold_time,
  }));
  return roundData;
};

export default useGetOnSessionHistory;
