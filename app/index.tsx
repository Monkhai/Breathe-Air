import { createTables } from '@/db/SQLite';
import React, { useEffect, useState } from 'react';
import HomeScreen from './HomeScreen';
import { SplashScreen } from 'expo-router';

const App = () => {
  return <HomeScreen />;
};

export default App;
