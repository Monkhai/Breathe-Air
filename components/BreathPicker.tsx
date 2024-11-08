import { generateHeavyHaptics } from '@/services/haptics';
import LottieView from 'lottie-react-native';
import React, { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

interface Props {
  animRef: RefObject<LottieView>;
  isBox: boolean;
  setIsBox: Dispatch<SetStateAction<boolean>>;
}

const BreathPicker = ({ animRef, isBox, setIsBox }: Props) => {
  const snapInterval = Dimensions.get('window').width;
  const [didVibrate, setDidVibrate] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const colorScheme = useColorScheme();

  const fadeOut = (callback: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500,
    }).start(callback);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;

    if (x > snapInterval / 2 && !isBox) {
      setDidVibrate(false);
      animRef.current?.play(0, 30);
      setIsBox((state) => !state);
      fadeOut(() => {
        fadeIn();
      });
    } else if (x < snapInterval / 2 && isBox) {
      setDidVibrate(false);
      animRef.current?.play(30, 0);
      setIsBox((state) => !state);
      fadeOut(() => {
        fadeIn();
      });
    }
  };

  const generateHapticFeedback = () => {
    if (!didVibrate) {
      generateHeavyHaptics();
      setDidVibrate(true);
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      onMomentumScrollEnd={generateHapticFeedback}
      onScrollEndDrag={handleScroll}
      scrollEventThrottle={16}
      horizontal
      contentContainerStyle={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      snapToInterval={snapInterval}
      decelerationRate={'fast'}
    >
      <View style={styles.imageContainer}>
        <View>
          <Image
            source={
              colorScheme === 'light'
                ? require('../assets/pickers/cyclic-breathing-picker.png')
                : require('../assets/pickers/dark/cyclic-breathing-picker-dark.png')
            }
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={
            colorScheme === 'light'
              ? require('../assets/pickers/box-breathing-picker.png')
              : require('../assets/pickers/dark/box-breathing-picker-dark.png')
          }
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

export default BreathPicker;

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
});
