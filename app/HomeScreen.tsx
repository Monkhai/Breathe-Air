import LottieView from 'lottie-react-native';
import { RefObject, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import BreathPicker from '../components/BreathPicker';
import HomeScreenTransitionAnimation from '../components/HomeScreenTransitionAnimation';
import Screen from '../components/Screen';
import { router } from 'expo-router';
import useGetCyclicStats from '@/hooks/useGetCyclicStats';
import useGetBoxStats from '@/hooks/useGetBoxStats';
import AppText from '@/components/AppText';

const HomeScreen = () => {
  const [isBox, setIsBox] = useState(false);
  const [animRef, setAnimRef] = useState<RefObject<LottieView>>();
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
      router.push('/BoxSessionScreen');
    } else {
      router.push('/CyclicSessionScreen');
    }
  };

  console.log(boxMax, boxAverage, cyclicAverage, cyclicMax);

  if (boxError) return <AppText>{boxError.message}</AppText>;
  if (cyclicError) return <AppText>{cyclicError.message}</AppText>;

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.topControllers}>
          <AppButton onPress={() => router.push('/SettingsScreen')}>Settings</AppButton>
          <AppButton onPress={() => router.push('/HistoryScreen')}>History</AppButton>
        </View>
        <View style={styles.lottieContainer}>
          <HomeScreenTransitionAnimation
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
