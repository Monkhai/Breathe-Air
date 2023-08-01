import { BoxSessionHistoryDAO } from '@/db/SQLite';
import { formatTime } from '@/services/timeFormators';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BoxSessionAnimation from '../components/BoxSessionAnimation';
import Screen from '../components/Screen';

const BoxSessionScreen = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isCountdown, setIsCountdown] = useState(true);
  const animRef = useRef<LottieView>(null);
  const [trigger, setTrigger] = useState(false);
  const [Stopwatch, setStopwatch] = useState<number>(0);
  const dbBoxSession = new BoxSessionHistoryDAO();

  useEffect(() => {
    if (isPaused) {
      animRef?.current?.pause();
    } else {
      animRef?.current?.resume();
    }
  }, [isPaused]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isCountdown && !isPaused) {
      interval = setInterval(() => {
        setStopwatch((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(interval!);
  }, [isPaused, isCountdown]);

  //this is necessary for android animation to play when started
  useEffect(() => {
    setTrigger((a) => !a);
    animRef.current?.play();
  }, [isCountdown]);

  const handleCountdownFinish = useCallback(() => {
    setIsCountdown(false);
  }, []);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleContinue = () => {
    setIsPaused(false);
  };

  const finishSession = () => {
    dbBoxSession.createBoxSession(Stopwatch).then(() => {
      router.replace('/');
    });
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.topControllers}>
          {!isPaused ? (
            <AppButton onPress={handlePause}>Pause</AppButton>
          ) : (
            <AppButton onPress={handleContinue}>Continue</AppButton>
          )}
        </View>
        <View style={styles.lottieContainer}>
          <BoxSessionAnimation
            trigger={trigger}
            isCountdown={isCountdown}
            onCountdownFinish={handleCountdownFinish}
            animRef={animRef}
          />
        </View>
        <View style={styles.midSpaceContainer}>
          <View style={{ paddingBottom: 50, paddingTop: 30 }}>
            <AppText fontSize="xl">{formatTime(Stopwatch)}</AppText>
          </View>
          <AppText textColor="black" fontWeight="light">
            Press pause to leave the session at any time
          </AppText>
        </View>
        <View style={styles.bottomControllers}>
          {isPaused && (
            <AppButton fontSize="regular" fontWeight="regular" onPress={finishSession}>
              Finish Session
            </AppButton>
          )}
        </View>
      </View>
    </Screen>
  );
};

export default BoxSessionScreen;

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
  lottieContainer: {
    flex: 8,
  },
  midSpaceContainer: {
    flex: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
  },
  bottomControllers: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
});
