import { createTables } from '@/db/SQLite';
import React, { useEffect } from 'react';
import HomeScreen from './HomeScreen';

const App = () => {
  useEffect(() => {
    createTables();
  }, []);

  return <HomeScreen />;
};

export default App;
