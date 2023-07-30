import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import CyclicRoundFlatlist, { RoundData } from '../components/CyclicRoundFlatlist';
import Screen from '../components/Screen';
import useGetOnSessionHistory from '../hooks/useGetOneCyclicSessionHistory';
import AppText from '../components/AppText';

interface Props {
  sessionId: number;
}

const CyclicSessionSummary = ({ sessionId }: Props) => {
  const [roundData, setRoundData] = useState<RoundData[]>();

  useEffect(() => {
    useGetOnSessionHistory(sessionId).then((data) => setRoundData(data));
  }, []);

  if (!roundData) return <AppText>Sorry you need to wait</AppText>;
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.topControllers}></View>
        <View style={styles.midSpaceContainer}>
          <CyclicRoundFlatlist roundData={roundData} />
        </View>
        <View style={styles.bottomControllers}>
          <AppButton
            fontSize="regular"
            fontWeight="regular"
            onPress={() => console.log('I cannot do anything')}
          >
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
