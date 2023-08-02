import useGetOneCyclicSessionHistory from '@/hooks/useGetOneCyclicSessionHistory';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import CyclicRoundFlatlist from '../components/CyclicRoundFlatlist';
import Screen from '../components/Screen';
import colors from '@/services/colors';

const CyclicSessionSummary = () => {
  const params = useLocalSearchParams();
  const { history, isLoading, error } = useGetOneCyclicSessionHistory(Number(params.sessionId));
  const colorScheme = useColorScheme();
  const containerStyle = colorScheme === 'light' ? styles.containerLight : styles.containerDark;

  if (isLoading)
    return (
      <Screen>
        <View />
      </Screen>
    );

  if (error)
    return (
      <Screen>
        <View style={[styles.container, containerStyle]}>
          <AppText>{error.message}</AppText>
        </View>
      </Screen>
    );

  return (
    <Screen>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.topControllers}></View>
        <View style={styles.midSpaceContainer}>
          <CyclicRoundFlatlist roundData={history!} />
        </View>
        <View style={styles.bottomControllers}>
          <AppButton fontSize="regular" fontWeight="regular" onPress={() => router.replace('/')}>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerLight: {
    backgroundColor: colors.light.background,
  },
  containerDark: {
    backgroundColor: colors.dark.background,
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
