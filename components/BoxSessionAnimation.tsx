import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { RefObject, useEffect, useRef } from 'react';
import boxSession from '../assets/animations/box-breathing-1-round.json';
import boxCountdown from '../assets/animations/box-breathing-countdown.json';
import LottieView from 'lottie-react-native';

interface Props {
  isCountdown: boolean;
  onCountdownFinish: (isCancelled: boolean) => void;
  animRef: RefObject<LottieView>;
}

const BoxSessionAnimation = ({ isCountdown, onCountdownFinish, animRef }: Props) => {
  return (
    <View>
      {isCountdown && (
        <LottieView
          source={boxCountdown}
          imageAssetsFolder="../assets/animations/box-breathing-countdown.json"
          onAnimationFinish={onCountdownFinish}
          autoPlay
          loop={false}
          ref={animRef}
          style={styles.lottie}
        />
      )}
      {!isCountdown && (
        <LottieView
          source={boxSession}
          imageAssetsFolder="../assets/animations/box-breathing-1-round.json"
          autoPlay
          loop={true}
          ref={animRef}
          style={styles.lottie}
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
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
