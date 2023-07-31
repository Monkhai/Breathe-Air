import { useState, useEffect } from 'react';
import { Settings, SettingsDAO } from '../db/SQLite';

const useGetSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<Settings>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const dbSettings = new SettingsDAO();

    dbSettings
      .getSettings()
      .then((settings) => {
        setSettings(settings);
        setIsLoading(false);
      })
      .catch((error) => {
        const e = error as Error;
        setError(e);
        setIsLoading(false);
      });
  }, []);

  return { settings, isLoading, error };
};

export default useGetSettings;
