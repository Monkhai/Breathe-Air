import { Dimensions, StyleSheet, Text, View, useColorScheme } from 'react-native';
import React, { RefObject, useEffect, useRef } from 'react';
import boxSession from '@/assets/animations/box-breathing-1-round.json';
import boxSessionDark from '@/assets/animations/dark/box-breathing-1-round-dark.json';
import boxCountdown from '@/assets/animations/box-breathing-countdown.json';
import boxCountdownDark from '@/assets/animations/dark/box-breathing-countdown-dark.json';
import LottieView from 'lottie-react-native';
import colors from '@/services/colors';

interface Props {
  isCountdown: boolean;
  trigger: boolean;
  onCountdownFinish: (isCancelled: boolean) => void;
  animRef: RefObject<LottieView>;
}

const BoxSessionAnimation = ({ isCountdown, onCountdownFinish, animRef }: Props) => {
  const colorScheme = useColorScheme();
  const shadowStyle = colorScheme === 'light' ? styles.lottieLight : styles.lottieDark;

  return (
    <View>
      {isCountdown && (
        <LottieView
          source={colorScheme === 'light' ? boxCountdown : boxCountdownDark}
          onAnimationFinish={(isCancelled) => onCountdownFinish(isCancelled)}
          autoPlay
          loop={false}
          ref={animRef}
          style={styles.lottie}
        />
      )}
      {!isCountdown && (
        <LottieView
          source={colorScheme === 'light' ? boxSession : boxSessionDark}
          autoPlay
          loop={true}
          ref={animRef}
          style={[styles.lottie, shadowStyle]}
        />
      )}
    </View>
  );
};

export default React.memo(BoxSessionAnimation);

const styles = StyleSheet.create({
  lottie: {
    width: (Dimensions.get('screen').width / 100) * 90,
    height: (Dimensions.get('screen').width / 100) * 90,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  lottieLight: {
    shadowColor: 'black',
  },
  lottieDark: {
    shadowColor: colors.dark.primary,
  },
});
