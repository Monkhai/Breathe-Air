import useGetSettings from '@/hooks/useGetSettings';
import colors from '@/services/colors';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, View, useColorScheme } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import CyclicSessionAnimation from '../components/CyclicSessionAnimation';
import Screen from '../components/Screen';
import Stopwatch from '../components/Stopwatch';
import { CyclicSessionHistoryDAO, CyclicSessionsDAO } from '../db/SQLite';

const INITIAL_INHALE_SECONDS = 15;
const INITIAL_EXHALE_SECONDS = 0;
const INITIAL_ROUND_INDEX = 1;
const INITIAL_ANIMATED_TEXT = 0;

const CyclicSessionScreen = () => {
  //---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO
  //---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO
  const dbSession = new CyclicSessionsDAO();
  const dbSessionHistory = new CyclicSessionHistoryDAO();

  //-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES
  //-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES
  const [isCountdown, setIsCountdown] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [exhaleSeconds, setExhaleSeconds] = useState(INITIAL_EXHALE_SECONDS);
  const [inhaleSeconds, setInhaleSeconds] = useState(INITIAL_INHALE_SECONDS);
  const [isExhaleStopwatchActive, setIsExhaleStopwatchActive] = useState(false);
  const [isInhaleStopwatchActive, setIsInhaleStopwatchActive] = useState(false);
  const [roundIndex, setRoundIndex] = useState<1 | 2 | 3 | 4 | 5>(INITIAL_ROUND_INDEX);
  const [guideText, setGuideText] = useState('Get ready...');
  const [noOfRounds, setNoOfRounds] = useState<1 | 2 | 3 | 4 | 5>();
  const [noOfBreaths, setNoOfBreaths] = useState<30 | 35>();
  const sessionId = useRef<number>();
  const animatedText = useRef(new Animated.Value(INITIAL_ANIMATED_TEXT)).current;
  const animRef = useRef<LottieView>(null);
  let CYCLIC_TIMEOUT = useRef<NodeJS.Timeout | null>(null);
  const { settings, isLoading, error } = useGetSettings();
  const colorScheme = useColorScheme();
  const containerStyle = colorScheme === 'light' ? styles.containerLight : styles.containerDark;

  //-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS
  //-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS-------USE EFFECTS
  useEffect(() => {
    if (settings) {
      setNoOfBreaths(settings.no_of_breaths);
      setNoOfRounds(settings.no_of_rounds);
      dbSession
        .createCyclicSession(settings.no_of_breaths, settings.no_of_rounds)
        .then((id: number) => {
          sessionId.current = id;
        });
    }
  }, [settings]);

  useEffect(() => {
    if (isPaused) {
      animRef?.current?.pause();
    } else {
      animRef?.current?.resume();
    }
  }, [isPaused]);

  useEffect(() => {
    if (inhaleSeconds === 0 && roundIndex === noOfRounds) {
      finishSession();
    }
  }, [inhaleSeconds, roundIndex]);

  useEffect(() => {
    return () => clearTimeout(CYCLIC_TIMEOUT.current!);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isStopwatchRunning) {
      if (isExhaleStopwatchActive) {
        if (isExhaleStopwatchActive) {
          interval = setInterval(() => {
            setExhaleSeconds((seconds) => seconds + 1);
          }, 1000);
        } else if (!isExhaleStopwatchActive && exhaleSeconds !== 0) {
          setExhaleSeconds(INITIAL_EXHALE_SECONDS);
          clearInterval(interval!);
        }
      } else if (isInhaleStopwatchActive) {
        interval = setInterval(() => {
          setInhaleSeconds((seconds) => {
            if (seconds > 0) {
              if (seconds === 2) {
                hideStopwatch();
              }
              return seconds - 1;
            } else {
              setIsInhaleStopwatchActive(false);
              setIsCountdown(false);
              animatedText.setValue(INITIAL_ANIMATED_TEXT);
              setGuideText('Take deep, coninuous breathes');
              return 0;
            }
          });
        }, 1000);
      } else if (!isInhaleStopwatchActive && inhaleSeconds == 0) {
        if (roundIndex < 5) {
          setRoundIndex((index) => {
            let newIndex = index + 1;
            if (newIndex > 5) newIndex = 5;
            return newIndex as 1 | 2 | 3 | 4 | 5;
          });
        }
        setInhaleSeconds(INITIAL_INHALE_SECONDS);
        clearInterval(interval!);
      }
    }

    return () => clearInterval(interval!);
  }, [isExhaleStopwatchActive, isInhaleStopwatchActive, isStopwatchRunning]);
  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------------------------------------------

  //-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS
  //-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS-------FUNCTIONS

  const FRAME_RATE = Math.round((5164 / 60) * 1000);

  const handlePause = () => {
    setIsPaused(true);
    setIsStopwatchRunning(false);
  };

  const handleContinue = () => {
    setIsPaused(false);
    setIsStopwatchRunning(true);
  };

  const finishSession = () => {
    router.push({ pathname: '/CyclicSessionSummary', params: { sessionId: sessionId.current! } });
  };

  const handleLeaveSession = () => {
    Alert.alert(
      'Leave session',
      'Your session is not finished. Are you sure you would like to leave?',
      [
        {
          text: 'Yes',
          onPress: () => {
            if (isCountdown || (roundIndex === 1 && exhaleSeconds === 0)) {
              router.replace('/');
              return;
            }
            Alert.alert('Save session', 'would you like to save the session before you leave?', [
              {
                text: 'Yes',
                onPress: () => router.replace('/'),
              },
              {
                text: 'No',
                onPress: () => {
                  const dbCyclicSession = new CyclicSessionsDAO();
                  dbCyclicSession
                    .deleteCyclicSession(sessionId.current!)
                    .then(() => router.replace('/'))
                    .catch((error) => console.log(error));
                },
              },
            ]);
          },
        },
        {
          text: 'No',
        },
      ]
    );
  };

  const handleCountdownFinish = useCallback((isCancelled: boolean) => {
    if (isCancelled) return;
    setGuideText('Take deep, coninuous breathes');
    setIsCountdown(false);
    clearTimeout(CYCLIC_TIMEOUT.current!);
    CYCLIC_TIMEOUT.current! = setTimeout(announceCyclicAboutToFinish, FRAME_RATE);
  }, []);

  const announceCyclicAboutToFinish = () => {
    setGuideText('Get ready to fully exhale');
  };

  const handleCyclicFinish = useCallback((isCancelled: boolean) => {
    if (isCancelled) return;
    revealStopwatch();
    setIsExhaleStopwatchActive(true);
    setIsStopwatchRunning(true);
    setGuideText('Hold your breath, fully exhaled');
  }, []);

  const startInhale = () => {
    dbSessionHistory.createCyclicHistory(sessionId.current!, roundIndex, exhaleSeconds);
    setExhaleSeconds(0);
    setInhaleSeconds(15);
    setIsExhaleStopwatchActive(false);
    setIsInhaleStopwatchActive(true);
    setGuideText('Hold your breath fully inhaled');
  };

  const revealStopwatch = () => {
    animatedText.setValue(0);
    Animated.timing(animatedText, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000, // 1s
    }).start();
  };

  const hideStopwatch = () => {
    Animated.timing(animatedText, {
      toValue: 0,
      useNativeDriver: true,
      duration: 2000, // 2s
    }).start();
  };
  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------------------------------------------

  //-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT
  //-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT-------COMPONENT
  if (isLoading) return <View style={[styles.container, containerStyle]}></View>;
  if (error)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppText>{error.message}</AppText>
      </View>
    );
  return (
    <Screen>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.topControllers}>
          {!isPaused ? (
            <AppButton onPress={handlePause}>Pause</AppButton>
          ) : (
            <AppButton onPress={handleContinue}>Continue</AppButton>
          )}
        </View>
        <View style={styles.lottieContainer}>
          {isExhaleStopwatchActive || isInhaleStopwatchActive ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Stopwatch
                animatedText={animatedText!}
                exhaleSeconds={exhaleSeconds}
                inhaleSeconds={inhaleSeconds}
                isExhaleStopwatchActive={isExhaleStopwatchActive}
                isInhaleStopwatchActive={isInhaleStopwatchActive}
              />
            </View>
          ) : (
            <CyclicSessionAnimation
              index={roundIndex}
              noOfBreaths={noOfBreaths!}
              isCountdown={isCountdown}
              onCountdownFinish={handleCountdownFinish}
              onCyclicFinish={handleCyclicFinish}
              animRef={animRef}
            />
          )}
        </View>
        <View style={styles.midSpaceContainer}>
          <AppText fontWeight="light" textColor="tertiary">
            {guideText}
          </AppText>
        </View>
        <View style={styles.bottomControllers}>
          {isExhaleStopwatchActive && !isPaused && (
            <AppButton fontSize="large" fontWeight="regular" onPress={startInhale}>
              Inhale
            </AppButton>
          )}
          {isPaused && (
            <AppButton fontSize="large" fontWeight="regular" onPress={handleLeaveSession}>
              Leave session
            </AppButton>
          )}
        </View>
      </View>
    </Screen>
  );
};

export default CyclicSessionScreen;

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
  lottieContainer: {
    flex: 10,
  },
  midSpaceContainer: {
    flex: 6,
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
