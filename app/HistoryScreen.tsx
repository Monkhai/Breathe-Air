import HistoryScrollView from '@/components/HistoryScrollView';
import PageIndicator from '@/components/PageIndicator';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Screen from '../components/Screen';

const HistoryScreen = () => {
  const [page, setPage] = useState<1 | 2>(1);

  const handleScrollEnd = () => {
    if (page === 1) {
      setPage(2);
    }
    if (page === 2) {
      setPage(1);
    }
  };

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
          <HistoryScrollView onScrollEnd={handleScrollEnd} />
        </View>
        <View style={styles.bottomControllers}>
          <PageIndicator page={page} />
        </View>
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
  heading: {
    flex: 2,
  },
  midControllers: {
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
