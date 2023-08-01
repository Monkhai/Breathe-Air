import { Animated, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import * as Haptics from 'expo-haptics';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../services/colors';

interface Props {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

const ThemeSwitch = ({ theme, setTheme }: Props) => {
  const INDICATOR_POSITIONS = [5.333333333333333, 54.666666666666664];
  const animatedSelector = useRef(
    new Animated.Value(INDICATOR_POSITIONS[theme == 'light' ? 0 : 1])
  ).current;

  useEffect(() => {
    animatedSelector.setValue(INDICATOR_POSITIONS[theme == 'light' ? 0 : 1]);
  }, []);

  const backgroundColor = animatedSelector.interpolate({
    inputRange: INDICATOR_POSITIONS,
    outputRange: [colors.primary, colors.darkTheme.black],
  });

  // Create opacity animations
  const lightOpacity = animatedSelector.interpolate({
    inputRange: INDICATOR_POSITIONS,
    outputRange: [1, 0],
  });

  const darkOpacity = animatedSelector.interpolate({
    inputRange: INDICATOR_POSITIONS,
    outputRange: [0, 1],
  });

  const triggerHeavyHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const triggerLightHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const trigger = (shouldSetTheme: boolean) => {
    Animated.timing(animatedSelector, {
      toValue: theme === 'dark' ? INDICATOR_POSITIONS[0] : INDICATOR_POSITIONS[1],
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      if (shouldSetTheme) setTheme(theme === 'dark' ? 'light' : 'dark');
      triggerHeavyHaptics();
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPressIn={triggerLightHaptics} onPress={() => trigger(true)}>
        <Animated.View style={[styles.container, { backgroundColor: backgroundColor }]}>
          <Animated.View style={[styles.selectedIndicator, { left: animatedSelector }]} />

          <View>
            <Animated.View style={{ opacity: lightOpacity }}>
              <Ionicons name="sunny-outline" size={30} color={colors.primary} />
            </Animated.View>
            <Animated.View style={{ opacity: darkOpacity, position: 'absolute' }}>
              <Ionicons name="sunny-outline" size={30} color={colors.darkTheme.white} />
            </Animated.View>
          </View>

          <View>
            <Animated.View style={{ opacity: lightOpacity }}>
              <Ionicons name="moon" size={30} color={colors.white} />
            </Animated.View>
            <Animated.View style={{ opacity: darkOpacity, position: 'absolute' }}>
              <Ionicons name="moon" size={30} color={colors.darkTheme.black} />
            </Animated.View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ThemeSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 100,
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
});
