import AppText from '@/components/AppText';
import useGetBoxStats from '@/hooks/useGetBoxStats';
import useGetCyclicStats from '@/hooks/useGetCyclicStats';
import { Stack, router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { RefObject, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import AppButton from '../components/AppButton';
import BreathPicker from '../components/BreathPicker';
import HomeScreenTransitionAnimation from '../components/HomeScreenTransitionAnimation';
import Screen from '../components/Screen';
import colors from '@/services/colors';

const HomeScreen = () => {
  const [isBox, setIsBox] = useState(false);
  const [animRef, setAnimRef] = useState<RefObject<LottieView>>();
  const colorScheme = useColorScheme();

  const containerStyle = colorScheme === 'light' ? styles.containerLight : styles.containerDark;

  const {
    average: cyclicAverage,
    max: cyclicMax,
    isLoading: isCyclicLoading,
    error: cyclicError,
  } = useGetCyclicStats();
  const {
    average: boxAverage,
    max: boxMax,
    isLoading: isBoxLoading,
    error: boxError,
  } = useGetBoxStats();

  const handleStart = () => {
    if (isBox) {
      router.replace('/BoxSessionScreen');
    } else {
      router.push('/CyclicSessionScreen');
    }
  };

  if (boxError) return <AppText>{boxError.message}</AppText>;
  if (cyclicError) return <AppText>{cyclicError.message}</AppText>;

  return (
    <Screen>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.topControllers}>
          <AppButton onPress={() => router.push('/SettingsScreen')}>Settings</AppButton>
          <AppButton onPress={() => router.push('/HistoryScreen')}>History</AppButton>
        </View>
        <View style={styles.lottieContainer}>
          <HomeScreenTransitionAnimation
            theme={colorScheme!}
            setAnimRef={setAnimRef}
            isBox={isBox}
            cyclicAverage={cyclicAverage}
            cyclicMax={cyclicMax}
            isCyclicLoading={isCyclicLoading}
            boxAverage={boxAverage}
            boxMax={boxMax}
            isBoxLoading={isBoxLoading}
          />
        </View>
        <View style={styles.scrollViewContainer}>
          <BreathPicker animRef={animRef!} isBox={isBox} setIsBox={setIsBox} />
        </View>
        <View style={styles.bottomControllers}>
          <AppButton onPress={handleStart} fontSize="regular" fontWeight="regular">
            Start
          </AppButton>
        </View>
      </View>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerLight: {
    backgroundColor: colors.light.background,
  },
  containerDark: {
    backgroundColor: colors.dark.background,
  },
  topControllers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
  },
  lottieContainer: {
    flex: 10,
  },

  scrollViewContainer: {
    flex: 6,
  },

  bottomControllers: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
});
