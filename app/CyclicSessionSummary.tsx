import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import CyclicRoundFlatlist, { RoundData } from '../components/CyclicRoundFlatlist';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import useGetOneCyclicSessionHistory from '@/hooks/useGetOneCyclicSessionHistory';
import { router, useLocalSearchParams } from 'expo-router';
import { CyclicSessionHistoryDAO } from '@/db/SQLite';

const CyclicSessionSummary = () => {
  const params = useLocalSearchParams();
  console.log(params);
  const { history, isLoading, error } = useGetOneCyclicSessionHistory(Number(params.sessionId));

  if (isLoading)
    return (
      <Screen>
        <View />
      </Screen>
    );

  if (error)
    return (
      <Screen>
        <View style={styles.container}>
          <AppText>{error.message}</AppText>
        </View>
      </Screen>
    );

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.topControllers}></View>
        <View style={styles.midSpaceContainer}>
          <CyclicRoundFlatlist roundData={history!} />
        </View>
        <View style={styles.bottomControllers}>
          <AppButton fontSize="regular" fontWeight="regular" onPress={() => router.push('/')}>
            Finish session
          </AppButton>
        </View>
      </View>
    </Screen>
  );
};

export default CyclicSessionSummary;

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
  midSpaceContainer: {
    flex: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomControllers: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
});
