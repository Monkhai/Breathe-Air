import { SessionHistoryDAO } from '../db/SQLite';

const dbHistory = new SessionHistoryDAO();
const useGetOnSessionHistory = async (sessionId: number) => {
  const data = await dbHistory.getOneSessionHistory(sessionId);
  const roundData = data.map((round) => ({
    round: round.round_number,
    hold: round.hold_time,
  }));
  return roundData;
};

export default useGetOnSessionHistory;
