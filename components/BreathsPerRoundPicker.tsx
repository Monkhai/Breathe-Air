import colors from '@/services/colors';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';

interface Props {
  noOfBreaths: 30 | 35;
  setNoOfBreaths: React.Dispatch<React.SetStateAction<30 | 35 | undefined>>;
}

const BreathsPerRoundPicker = ({ noOfBreaths, setNoOfBreaths }: Props) => {
  const INDICATOR_POSITIONS = [5.333333333333333, 54.666666666666664];
  const colorScheme = useColorScheme();
  const containerStyle = colorScheme === 'light' ? styles.containerLight : styles.containerDark;
  const selectedIndicatorStyle =
    colorScheme === 'light' ? styles.selectedIndicatorLight : styles.selectedIndicatorDark;

  const animatedSelector = useRef(
    new Animated.Value(INDICATOR_POSITIONS[noOfBreaths === 30 ? 0 : 1])
  ).current;

  useEffect(() => {
    animatedSelector.setValue(INDICATOR_POSITIONS[noOfBreaths === 30 ? 0 : 1]);
  }, []);

  const triggerHeavyHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const triggerLightHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const trigger = () => {
    if (noOfBreaths === 35) {
      Animated.timing(animatedSelector, {
        toValue: INDICATOR_POSITIONS[0],
        useNativeDriver: false,
        duration: 300,
      }).start(() => {
        setNoOfBreaths(30);
        triggerHeavyHaptics();
      });
    }
    if (noOfBreaths == 30) {
      Animated.timing(animatedSelector, {
        toValue: INDICATOR_POSITIONS[1],
        useNativeDriver: false,
        duration: 300,
      }).start(() => {
        setNoOfBreaths(35);
        triggerHeavyHaptics();
      });
    }
  };

  return (
    <View style={[styles.container]}>
      <Animated.View style={[styles.selectedIndicator, { left: animatedSelector }]} />
      <TouchableWithoutFeedback onPressIn={triggerLightHaptics} onPress={trigger}>
        <View style={[styles.container, containerStyle]}>
          <Animated.View
            style={[styles.selectedIndicator, { left: animatedSelector }, selectedIndicatorStyle]}
          />
          <Text
            style={{
              fontSize: 18,
              color:
                noOfBreaths == 30
                  ? colorScheme === 'light'
                    ? colors.light.primary
                    : colors.light.background
                  : colorScheme === 'dark'
                  ? colors.dark.background
                  : colors.dark.primary,
            }}
          >
            30
          </Text>
          <Text
            style={{
              fontSize: 18,
              color:
                noOfBreaths == 35
                  ? colorScheme === 'light'
                    ? colors.light.primary
                    : colors.light.background
                  : colorScheme === 'dark'
                  ? colors.dark.background
                  : colors.dark.primary,
            }}
          >
            35
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default BreathsPerRoundPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 100,
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
