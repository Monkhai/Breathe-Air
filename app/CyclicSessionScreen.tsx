import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import CyclicSessionAnimation from '../components/CyclicSessionAnimation';
import Screen from '../components/Screen';
import Stopwatch from '../components/Stopwatch';
import { SessionHistoryDAO, SessionsDAO, SettingsDAO } from '../db/SQLite';

const INITIAL_INHALE_SECONDS = 15;
const INITIAL_EXHALE_SECONDS = 0;
const INITIAL_ROUND_INDEX = 1;
const INITIAL_ANIMATED_TEXT = 0;

const CyclicSessionScreen = () => {
  //---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO
  //---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO//---------DAO
  const dbSession = new SessionsDAO();
  const dbSessionHistory = new SessionHistoryDAO();
  const dbSettings = new SettingsDAO();

  //-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES
  //-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES-------STATES
  const [isCountdown, setIsCountdown] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [exhaleSeconds, setExhaleSeconds] = useState(INITIAL_EXHALE_SECONDS);
  const [inhaleSeconds, setInhaleSeconds] = useState(INITIAL_INHALE_SECONDS);
  const [isExhaleStopwatchActive, setIsExhaleStopwatchActive] = useState(false);
  const [isInhaleStopwatchActive, setIsInhaleStopwatchActive] = useState(false);
  const [roundIndex, setRoundIndex] = useState<1 | 2 | 3 | 4 | 5>(INITIAL_ROUND_INDEX);
  const [animRef, setAnimRef] = useState<RefObject<LottieView>>();
  const [guideText, setGuideText] = useState('Get ready...');
  const [noOfRounds, setNoOfRounds] = useState<1 | 2 | 3 | 4 | 5>();
  const [noOfBreaths, setNoOfBreaths] = useState<30 | 35>();
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [sessionId, setSessionId] = useState<number>();
  const animatedText = useRef(new Animated.Value(INITIAL_ANIMATED_TEXT)).current;
  let CYCLIC_TIMEOUT = useRef<NodeJS.Timeout | null>(null);

  const claculateFrameRate = () => {
    if (noOfBreaths === 30) {
      return 5164;
    } else return 6048;
  };
  const frameRate = claculateFrameRate();
  const CYCLIC_ANIMATION_TRIGGER_POINT = Math.round((frameRate / 60) * 1000);

  //-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT
  //-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT-------USE EFFECT

  useEffect(() => {
    if (isPaused) {
      animRef?.current?.pause();
    } else {
      animRef?.current?.play();
    }
  }, [isPaused]);

  //-------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (inhaleSeconds === 0 && roundIndex === noOfRounds) {
      resetAll();
    }
  }, [inhaleSeconds, roundIndex]);
  //-------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    dbSettings.getSettings().then((s) => {
      setNoOfRounds(s.no_of_rounds);
      setNoOfBreaths(s.no_of_breaths);
      dbSession
        .createSession(s.no_of_breaths, s.no_of_rounds)
        .then((sessionId: number) => setSessionId(sessionId));
      setSettingsLoaded(true);
    });
  }, []);
  //-------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    return () => clearTimeout(CYCLIC_TIMEOUT.current!);
  }, []);
  //-------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------

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
  const handlePause = () => {
    setIsPaused(true);
    setIsStopwatchRunning(false);
  };

  const handleContinue = () => {
    setIsPaused(false);
    setIsStopwatchRunning(true);
  };

  const resetAll = () => {
    setIsExhaleStopwatchActive(false);
    setIsInhaleStopwatchActive(false);
    setExhaleSeconds(INITIAL_EXHALE_SECONDS);
    setInhaleSeconds(INITIAL_INHALE_SECONDS);
    setRoundIndex(INITIAL_ROUND_INDEX);
    setIsPaused(true);
    setIsFinished(true);
    setGuideText('');
  };
  const handleCountdownFinish = (isCancelled: boolean) => {
    if (isCancelled) return;
    setGuideText('Take deep, coninuous breathes');
    setIsCountdown(false);
    clearTimeout(CYCLIC_TIMEOUT.current!);
    CYCLIC_TIMEOUT.current! = setTimeout(
      announceCyclicAboutToFinish,
      CYCLIC_ANIMATION_TRIGGER_POINT
    );
  };

  const announceCyclicAboutToFinish = () => {
    setGuideText('Get ready to fully exhale');
  };

  const handleCyclicFinish = (isCancelled: boolean) => {
    if (isCancelled) return;
    revealStopwatch();
    setIsExhaleStopwatchActive(true);
    setIsStopwatchRunning(true);
    setGuideText('Hold your breath, fully exhaled');
  };

  const startInhale = () => {
    dbSessionHistory.createHistory(sessionId!, roundIndex, exhaleSeconds);
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
          {isFinished ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <AppText fontSize="xxl" fontWeight="bold">
                Finished!
              </AppText>
            </View>
          ) : isExhaleStopwatchActive || isInhaleStopwatchActive ? (
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
              noOfBreaths={noOfBreaths!}
              isCountdown={isCountdown}
              onCountdownFinish={handleCountdownFinish}
              onCyclicFinish={handleCyclicFinish}
              setAnimRef={setAnimRef}
            />
          )}
        </View>
        <View style={styles.midSpaceContainer}>
          <AppText fontWeight="light" textColor="black">
            {guideText}
          </AppText>
        </View>
        <View style={styles.bottomControllers}>
          {isExhaleStopwatchActive && (
            <AppButton fontSize="large" fontWeight="regular" onPress={startInhale}>
              Inhale
            </AppButton>
          )}
          {isFinished ||
            (isPaused && (
              <AppButton
                disabled={!settingsLoaded}
                fontSize="regular"
                fontWeight="regular"
                onPress={() => router.back()}
              >
                Finish session
              </AppButton>
            ))}
        </View>
      </View>
    </Screen>
  );
};

export default CyclicSessionScreen;

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
