import { SettingsDAO } from '../db/SQLite';

const useGetSettings = async () => {
  const dbSettings = new SettingsDAO();
  const settings = await dbSettings.getSettings();
  return settings;
};

export default useGetSettings;
