import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import * as Haptics from 'expo-haptics';
import AppText from './AppText';

interface Props {
  selectedRound: 1 | 2 | 3 | 4 | 5;
  setSelectedRound: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4 | 5>>;
}

const RoundSelector = ({ selectedRound, setSelectedRound }: Props) => {
  const INDICATOR_POSITIONS = [
    5.666666666666667, 55.333333333333336, 105, 154.66666666666666, 204.33333333333334,
  ];
  const animatedSelector = useRef(
    new Animated.Value(INDICATOR_POSITIONS[selectedRound - 1])
  ).current;

  useEffect(() => {
    animatedSelector.setValue(INDICATOR_POSITIONS[selectedRound - 1]);
  }, [selectedRound]);

  const triggerHeavyHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const triggerLightHaptics = (round: number) => {
    if (round !== selectedRound) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const toggleNumber = (round: number) => {
    if (round == 1 && round !== selectedRound) {
      setSelectedRound(1);
      Animated.timing(animatedSelector, {
        toValue: INDICATOR_POSITIONS[round - 1],
        useNativeDriver: false,
        duration: 500,
      }).start(() => triggerHeavyHaptics());
    }
    if (round == 2 && round !== selectedRound) {
      setSelectedRound(2);
      Animated.timing(animatedSelector, {
        toValue: INDICATOR_POSITIONS[round - 1],
        useNativeDriver: false,
        duration: 500,
      }).start(() => triggerHeavyHaptics());
    }
    if (round == 3 && round !== selectedRound) {
      setSelectedRound(3);
      Animated.timing(animatedSelector, {
        toValue: INDICATOR_POSITIONS[round - 1],
        useNativeDriver: false,
        duration: 500,
      }).start(() => triggerHeavyHaptics());
    }
    if (round == 4 && round !== selectedRound) {
      setSelectedRound(4);
      Animated.timing(animatedSelector, {
        toValue: INDICATOR_POSITIONS[round - 1],
        useNativeDriver: false,
        duration: 500,
      }).start(() => triggerHeavyHaptics());
    }
    if (round == 5 && round !== selectedRound) {
      setSelectedRound(5);
      Animated.timing(animatedSelector, {
        toValue: INDICATOR_POSITIONS[round - 1],
        useNativeDriver: false,
        duration: 500,
      }).start(() => triggerHeavyHaptics());
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.selectedIndicator, { left: animatedSelector }]} />

      <TouchableWithoutFeedback
        onPressIn={() => triggerLightHaptics(1)}
        onPress={() => toggleNumber(1)}
      >
        <View style={styles.textContainer}>
          <AppText textColor={selectedRound == 1 ? 'blue' : 'white'}>1</AppText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPressIn={() => triggerLightHaptics(2)}
        onPress={() => toggleNumber(2)}
      >
        <View style={styles.textContainer}>
          <AppText textColor={selectedRound == 2 ? 'blue' : 'white'}>2</AppText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPressIn={() => triggerLightHaptics(3)}
        onPress={() => toggleNumber(3)}
      >
        <View style={styles.textContainer}>
          <AppText textColor={selectedRound == 3 ? 'blue' : 'white'}>3</AppText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPressIn={() => triggerLightHaptics(4)}
        onPress={() => toggleNumber(4)}
      >
        <View style={styles.textContainer}>
          <AppText textColor={selectedRound == 4 ? 'blue' : 'white'}>4</AppText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPressIn={() => triggerLightHaptics(5)}
        onPress={() => toggleNumber(5)}
      >
        <View style={styles.textContainer}>
          <AppText textColor={selectedRound == 5 ? 'blue' : 'white'}>5</AppText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default RoundSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#246BA0',
    width: 250,
    height: 48,
    borderRadius: 50,
  },
  selectedIndicator: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  textContainer: {
    minWidth: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});
