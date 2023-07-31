import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import { createTables, db } from '@/db/SQLite';
import * as SQLite from 'expo-sqlite';

const App = () => {
  useEffect(() => {
    createTables();
  }, []);

  return <HomeScreen />;
};

export default App;

const styles = StyleSheet.create({});
