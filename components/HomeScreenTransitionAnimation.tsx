import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { RefObject, useEffect, useRef } from 'react';
import AppText from './AppText';
import LottieView from 'lottie-react-native';
import transition from '../assets/animations/transition.json';

interface Props {
  setAnimRef: (animRef: RefObject<LottieView>) => void;
  isBox: boolean;
}

const HomeScreenTransitionAnimation = ({ setAnimRef, isBox }: Props) => {
  const animRef = useRef<LottieView>(null);
  const fadeCircleText = useRef(new Animated.Value(0)).current;
  const fadeBoxText = useRef(new Animated.Value(0)).current;

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
        source={transition}
        loop={false}
        autoPlay={false}
        style={styles.lottie}
      />
      <View style={styles.textContainer}>
        {!isBox && (
          <Animated.View style={{ opacity: fadeCircleText }}>
            <AppText fontSize="large" fontWeight="bold">
              All Time Record
            </AppText>
            <AppText fontSize="regular" fontWeight="light">
              02:30
            </AppText>
            <AppText fontSize="large" fontWeight="bold">
              Average Hold Time
            </AppText>
            <AppText fontSize="regular" fontWeight="light">
              02:30
            </AppText>
          </Animated.View>
        )}
        {isBox && (
          <Animated.View style={{ opacity: fadeBoxText }}>
            <AppText fontSize="large" fontWeight="bold">
              Longest Session
            </AppText>
            <AppText fontSize="regular" fontWeight="light">
              02:30
            </AppText>
            <AppText fontSize="large" fontWeight="bold">
              Average Session
            </AppText>
            <AppText fontSize="regular" fontWeight="light">
              02:30
            </AppText>
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
