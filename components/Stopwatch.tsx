import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useGetFonts } from '../services/useGetFonts';
import AppText from './AppText';

interface Props {
  isExhaleStopwatchActive: boolean;
  isInhaleStopwatchActive: boolean;
  animatedText: Animated.Value;
  exhaleSeconds: number;
  inhaleSeconds: number;
}

const Stopwatch = ({
  isExhaleStopwatchActive,
  isInhaleStopwatchActive,
  animatedText,
  exhaleSeconds,
  inhaleSeconds,
}: Props) => {
  if (isExhaleStopwatchActive)
    return (
      <Animated.View style={[styles.timeContainers, { opacity: animatedText }]}>
        <AppText fontWeight="light" fontSize="xxxl">
          {('0' + Math.floor((exhaleSeconds / 60) % 60)).slice(-2)}:
          {('0' + (exhaleSeconds % 60)).slice(-2)}
        </AppText>
      </Animated.View>
    );

  if (isInhaleStopwatchActive)
    return (
      <Animated.View style={[styles.timeContainers, { opacity: animatedText }]}>
        <AppText fontWeight="light" fontSize="xxxl">
          {('0' + Math.floor((inhaleSeconds / 60) % 60)).slice(-2)}:
          {('0' + (inhaleSeconds % 60)).slice(-2)}
        </AppText>
      </Animated.View>
    );

  return <AppText>Error</AppText>;
};

export default Stopwatch;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  timeContainers: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
