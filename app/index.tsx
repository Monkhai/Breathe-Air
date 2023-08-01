import { createTables } from '@/db/SQLite';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';

const App = () => {
  useEffect(() => {
    createTables();
  }, []);

  return <HomeScreen />;
};

export default App;

const styles = StyleSheet.create({});
