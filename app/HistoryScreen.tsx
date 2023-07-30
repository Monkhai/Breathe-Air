import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import HistoryFlatList from '../components/HistoryFlatList';
import Screen from '../components/Screen';
import useGetAllHistory, { SortedSessionHistory } from '../hooks/useGetAllHistory';
import { router } from 'expo-router';

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState<SortedSessionHistory[]>();

  useEffect(() => {
    useGetAllHistory().then((history) => setHistoryData(history));
  }, []);

  if (!historyData) return <AppText>Sorry bro</AppText>;

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.topControllers}>
          <AppButton icon="chevron-back" onPress={() => router.back()}>
            Home
          </AppButton>
        </View>
        <View style={styles.heading}>
          <AppText fontSize="xl" fontWeight="bold">
            History
          </AppText>
        </View>
        <View style={styles.midControllers}>
          {historyData.length !== 0 ? (
            <HistoryFlatList historyData={historyData} />
          ) : (
            <AppText>No history at the moment</AppText>
          )}
        </View>
        <View style={styles.bottomControllers} />
      </View>
    </Screen>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topControllers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
  },
  midControllers: {
    flex: 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    flex: 2,
  },
  bottomControllers: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
});
