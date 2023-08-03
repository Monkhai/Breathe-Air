import colors from '@/services/colors';
import { SplashScreen, router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { RefObject, useEffect, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import AppButton from '../components/AppButton';
import BreathPicker from '../components/BreathPicker';
import HomeScreenTransitionAnimation from '../components/HomeScreenTransitionAnimation';
import Screen from '../components/Screen';
import useInitializeTables from '@/hooks/useInitializeTables';

SplashScreen.preventAutoHideAsync();

const HomeScreen = () => {
  const { isLoading, error } = useInitializeTables();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const [isBox, setIsBox] = useState(false);
  const [animRef, setAnimRef] = useState<RefObject<LottieView>>();
  const colorScheme = useColorScheme();
  const containerStyle = colorScheme === 'light' ? styles.containerLight : styles.containerDark;

  const handleStart = () => {
    if (isBox) {
      router.replace('/BoxSessionScreen');
    } else {
      router.replace('/CyclicSessionScreen');
    }
  };

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
            isLoading={isLoading}
            // cyclicAverage={cyclicAverage}
            // cyclicMax={cyclicMax}
            // isCyclicLoading={isCyclicLoading}
            // boxAverage={boxAverage}
            // boxMax={boxMax}
            // isBoxLoading={isBoxLoading}
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
