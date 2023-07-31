import LottieView from 'lottie-react-native';
import React, { RefObject, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import cyclic30 from '../assets/animations/cyclic-30.json';
import cyclic35 from '../assets/animations/cyclic-35.json';
import cyclicCountdown from '../assets/animations/cyclic-breathing-countdown.json';

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
  return (
    <View>
      {isCountdown ? (
        <LottieView
          ref={animRef}
          speed={15}
          source={cyclicCountdown}
          autoPlay
          loop={false}
          style={styles.lottie}
          onAnimationFinish={(isCancelled) => onCountdownFinish(isCancelled)}
        />
      ) : (
        <LottieView
          speed={15}
          ref={animRef}
          source={noOfBreaths === 30 ? cyclic30 : cyclic35}
          autoPlay
          loop={false}
          onAnimationFinish={(isCancelled) => onCyclicFinish(isCancelled)}
          style={styles.lottie}
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
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
