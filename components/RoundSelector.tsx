import colors from '@/services/colors';
import * as Haptics from 'expo-haptics';
import React, { useRef } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View, useColorScheme } from 'react-native';
import AppText from './AppText';

interface Props {
  selectedRound: 1 | 2 | 3 | 4 | 5;
  setSelectedRound: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4 | 5>>;
}

const RoundSelector = ({ selectedRound, setSelectedRound }: Props) => {
  const colorScheme = useColorScheme();
  const containerStyle = colorScheme === 'light' ? styles.containerLight : styles.containerDark;
  const selectedIndicatorStyle =
    colorScheme === 'light' ? styles.selectedIndicatorLight : styles.selectedIndicatorDark;

  const INDICATOR_POSITIONS = [
    5.666666666666667, 55.333333333333336, 105, 154.66666666666666, 204.33333333333334,
  ];
  const animatedSelector = useRef(
    new Animated.Value(INDICATOR_POSITIONS[selectedRound - 1])
  ).current;

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
        duration: 300,
      }).start(() => triggerHeavyHaptics());
    }
    if (round == 2 && round !== selectedRound) {
      setSelectedRound(2);
      Animated.timing(animatedSelector, {
        toValue: INDICATOR_POSITIONS[round - 1],
        useNativeDriver: false,
        duration: 300,
      }).start(() => triggerHeavyHaptics());
    }
    if (round == 3 && round !== selectedRound) {
      setSelectedRound(3);
      Animated.timing(animatedSelector, {
        toValue: INDICATOR_POSITIONS[round - 1],
        useNativeDriver: false,
        duration: 300,
      }).start(() => triggerHeavyHaptics());
    }
    if (round == 4 && round !== selectedRound) {
      setSelectedRound(4);
      Animated.timing(animatedSelector, {
        toValue: INDICATOR_POSITIONS[round - 1],
        useNativeDriver: false,
        duration: 300,
      }).start(() => triggerHeavyHaptics());
    }
    if (round == 5 && round !== selectedRound) {
      setSelectedRound(5);
      Animated.timing(animatedSelector, {
        toValue: INDICATOR_POSITIONS[round - 1],
        useNativeDriver: false,
        duration: 300,
      }).start(() => triggerHeavyHaptics());
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[styles.selectedIndicator, selectedIndicatorStyle, { left: animatedSelector }]}
      />

      <TouchableWithoutFeedback
        onPressIn={() => triggerLightHaptics(1)}
        onPress={() => toggleNumber(1)}
      >
        <View style={styles.textContainer}>
          <AppText textColor={selectedRound == 1 ? 'primary' : 'background'}>1</AppText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPressIn={() => triggerLightHaptics(2)}
        onPress={() => toggleNumber(2)}
      >
        <View style={styles.textContainer}>
          <AppText textColor={selectedRound == 2 ? 'primary' : 'background'}>2</AppText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPressIn={() => triggerLightHaptics(3)}
        onPress={() => toggleNumber(3)}
      >
        <View style={styles.textContainer}>
          <AppText textColor={selectedRound == 3 ? 'primary' : 'background'}>3</AppText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPressIn={() => triggerLightHaptics(4)}
        onPress={() => toggleNumber(4)}
      >
        <View style={styles.textContainer}>
          <AppText textColor={selectedRound == 4 ? 'primary' : 'background'}>4</AppText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPressIn={() => triggerLightHaptics(5)}
        onPress={() => toggleNumber(5)}
      >
        <View style={styles.textContainer}>
          <AppText textColor={selectedRound == 5 ? 'primary' : 'background'}>5</AppText>
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
    width: 250,
    height: 48,
    borderRadius: 50,
  },
  containerLight: {
    backgroundColor: colors.light.primary,
  },
  containerDark: {
    backgroundColor: colors.dark.primary,
  },
  selectedIndicator: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  selectedIndicatorLight: {
    backgroundColor: colors.light.background,
  },
  selectedIndicatorDark: {
    backgroundColor: colors.dark.background,
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
