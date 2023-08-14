import transitionDark from '@/assets/animations/dark/Transition-dark.json';
import colors from '@/services/colors';
import { formatTime } from '@/services/timeFormators';
import LottieView from 'lottie-react-native';
import React, { RefObject, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View, useColorScheme } from 'react-native';
import transition from '../assets/animations/transition.json';
import AppText from './AppText';
import useGetBoxStats from '@/hooks/useGetBoxStats';
import useGetCyclicStats from '@/hooks/useGetCyclicStats';

interface Props {
  setAnimRef: (animRef: RefObject<LottieView>) => void;
  isBox: boolean;
  theme: 'light' | 'dark';
  isLoading: boolean;
}

const HomeScreenTransitionAnimation = ({ setAnimRef, isBox, theme, isLoading }: Props) => {
  const animRef = useRef<LottieView>(null);
  const fadeCircleText = useRef(new Animated.Value(0)).current;
  const fadeBoxText = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const shadowStyle = colorScheme === 'light' ? styles.shadowLight : styles.shadowDark;

  const {
    average: cyclicAverage,
    max: cyclicMax,
    isLoading: isCyclicLoading,
  } = useGetCyclicStats(isLoading);
  const { average: boxAverage, max: boxMax, isLoading: isBoxLoading } = useGetBoxStats(isLoading);

  const fadeIn = (text: Animated.Value) => {
    Animated.timing(text, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1250,
    }).start();
  };

  if (isBox) {
    fadeCircleText.setValue(0);
    fadeIn(fadeBoxText);
  }

  if (!isBox) {
    fadeBoxText.setValue(0);
    fadeIn(fadeCircleText);
  }

  useEffect(() => {
    setAnimRef(animRef);
  }, []);

  return (
    <View>
      <LottieView
        ref={animRef}
        source={theme === 'light' ? transition : transitionDark}
        loop={false}
        autoPlay={false}
        style={[styles.lottie, shadowStyle]}
      />
      <View style={styles.textContainer}>
        {!isBox && (
          <Animated.View style={{ opacity: fadeCircleText, gap: 10 }}>
            <AppText
              fontSize="large"
              fontWeight="bold"
              textColor={theme === 'dark' ? 'background' : 'primary'}
            >
              All Time Record
            </AppText>
            {isCyclicLoading ? (
              <AppText
                fontSize="regular"
                fontWeight="light"
                textColor={theme === 'dark' ? 'background' : 'primary'}
              >
                Loading...
              </AppText>
            ) : (
              <AppText
                fontSize="regular"
                fontWeight="light"
                textColor={theme === 'dark' ? 'background' : 'primary'}
              >
                {cyclicMax ? formatTime(cyclicMax) : 'not available'}
              </AppText>
            )}
            <AppText
              fontSize="large"
              fontWeight="bold"
              textColor={theme === 'dark' ? 'background' : 'primary'}
            >
              Average Hold Time
            </AppText>
            {isCyclicLoading ? (
              <AppText
                fontSize="regular"
                fontWeight="light"
                textColor={theme === 'dark' ? 'background' : 'primary'}
              >
                Loading...
              </AppText>
            ) : (
              <AppText
                fontSize="regular"
                fontWeight="light"
                textColor={theme === 'dark' ? 'background' : 'primary'}
              >
                {cyclicAverage ? formatTime(cyclicAverage) : 'not available'}
              </AppText>
            )}
          </Animated.View>
        )}
        {isBox && (
          <Animated.View style={{ opacity: fadeBoxText, gap: 10 }}>
            <AppText
              fontSize="large"
              fontWeight="bold"
              textColor={theme === 'dark' ? 'background' : 'primary'}
            >
              Longest Session
            </AppText>
            {isBoxLoading ? (
              <AppText
                fontSize="regular"
                fontWeight="light"
                textColor={theme === 'dark' ? 'background' : 'primary'}
              >
                Loading...
              </AppText>
            ) : (
              <AppText
                fontSize="regular"
                fontWeight="light"
                textColor={theme === 'dark' ? 'background' : 'primary'}
              >
                {boxMax ? formatTime(boxMax) : 'not available'}
              </AppText>
            )}
            <AppText
              fontSize="large"
              fontWeight="bold"
              textColor={theme === 'dark' ? 'background' : 'primary'}
            >
              Average Session
            </AppText>
            {isBoxLoading ? (
              <AppText
                fontSize="regular"
                fontWeight="light"
                textColor={theme === 'dark' ? 'background' : 'primary'}
              >
                Loading...
              </AppText>
            ) : (
              <AppText
                fontSize="regular"
                fontWeight="light"
                textColor={theme === 'dark' ? 'background' : 'primary'}
              >
                {boxAverage ? formatTime(boxAverage) : 'not available'}
              </AppText>
            )}
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default HomeScreenTransitionAnimation;

const styles = StyleSheet.create({
  lottie: {
    width: (Dimensions.get('screen').width / 100) * 90,
    height: (Dimensions.get('screen').width / 100) * 90,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  shadowLight: {
    shadowColor: 'black',
  },
  shadowDark: {
    shadowColor: colors.dark.primary,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    top: 20,
    right: 0,
    left: 0,
    gap: 10,
  },
});
