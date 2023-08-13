import colors from '@/services/colors';
import LottieView from 'lottie-react-native';
import React, { RefObject, useEffect } from 'react';
import { Dimensions, StyleSheet, View, useColorScheme } from 'react-native';
import cyclic30 from '../assets/animations/cyclic-30.json';
import cyclic35 from '../assets/animations/cyclic-35.json';
import cyclicCountdown from '../assets/animations/cyclic-breathing-countdown.json';
import cyclic30Dark from '../assets/animations/dark/cyclic-30-dark.json';
import cyclic35Dark from '../assets/animations/dark/cyclic-35-dark.json';
import cyclicCountdownDark from '../assets/animations/dark/cyclic-breathing-countdown-dark.json';

interface Props {
  index: number;
  isCountdown: boolean;
  noOfBreaths: 30 | 35;
  onCountdownFinish: (isCancelled: boolean) => void;
  onCyclicFinish: (isCancelled: boolean) => void;
  animRef: RefObject<LottieView>;
}

const CyclicSessionAnimation = ({
  isCountdown = true,
  noOfBreaths,
  onCountdownFinish,
  onCyclicFinish,
  animRef,
}: Props) => {
  const colorScheme = useColorScheme();
  const shadowStyle = colorScheme === 'light' ? styles.lottieLight : styles.lottieDark;

  useEffect(() => {
    if (animRef.current) {
      animRef.current.play();
    }
  }, []);

  return (
    <View>
      {isCountdown ? (
        <LottieView
          ref={animRef}
          source={colorScheme === 'light' ? cyclicCountdown : cyclicCountdownDark}
          autoPlay
          loop={false}
          style={[styles.lottie, shadowStyle]}
          onAnimationFinish={(isCancelled) => onCountdownFinish(isCancelled)}
        />
      ) : (
        <LottieView
          ref={animRef}
          source={
            noOfBreaths === 30
              ? colorScheme === 'light'
                ? cyclic30
                : cyclic30Dark
              : colorScheme === 'light'
              ? cyclic35
              : cyclic35Dark
          }
          autoPlay
          loop={false}
          onAnimationFinish={(isCancelled) => onCyclicFinish(isCancelled)}
          style={[styles.lottie, shadowStyle]}
        />
      )}
    </View>
  );
};

export default React.memo(CyclicSessionAnimation);

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
