import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BreathsPerRoundPicker from '../components/BreathsPerRoundPicker';
import RoundSelector from '../components/RoundSelector';
import Screen from '../components/Screen';
import ThemeSwitch from '../components/ThemeSwitch';
import { Settings, SettingsDAO } from '../db/SQLite';
import useGetSettings from '../hooks/useGetSettings';
import { router } from 'expo-router';

const SettingsScreen = () => {
  const dbSettings = new SettingsDAO();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [noOfRounds, setNoOfRounds] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [noOfBreaths, setNoOfBreaths] = useState<30 | 35>();
  const [OGSettings, setOGSettings] = useState<Settings>();
  const { settings, isLoading, error } = useGetSettings();
  const isSaved = useRef<Boolean>();

  useEffect(() => {
    if (settings) {
      setTheme(settings.theme);
      setNoOfRounds(settings.no_of_rounds);
      setNoOfBreaths(settings.no_of_breaths);
      setOGSettings(settings);
    }
  }, [settings]);

  const saveSettings = () => {
    dbSettings.updateSettings(theme, noOfBreaths!, noOfRounds);
    isSaved.current = true;
  };

  const handleBack = () => {
    if (
      (!isSaved.current && OGSettings?.no_of_breaths !== noOfBreaths) ||
      (!isSaved.current && OGSettings?.no_of_rounds !== noOfRounds) ||
      (!isSaved.current && OGSettings?.theme !== theme)
    ) {
      Alert.alert('Wait!', 'would you like to save the changes that you made?', [
        {
          text: 'Yes',
          onPress: () => {
            saveSettings();
            router.back();
          },
          style: 'default',
        },
        {
          text: 'No',
          onPress: () => {
            router.back();
          },
          style: 'default',
        },
      ]);
    } else {
      router.back();
    }
  };
  if (error) return <AppText>{error.message}</AppText>;

  if (isLoading)
    return (
      <Screen>
        <View style={styles.container}>
          <View style={styles.topControllers}>
            <AppButton icon="chevron-back" onPress={handleBack}>
              Home
            </AppButton>
          </View>
          <View style={styles.topSpaceContainer}>
            <AppText fontSize="xl" fontWeight="bold">
              Settings
            </AppText>
          </View>
          <View style={styles.midSpaceContainer} />
          <View style={styles.bottomControllers} />
        </View>
      </Screen>
    );

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.topControllers}>
          <AppButton icon="chevron-back" onPress={handleBack}>
            Home
          </AppButton>
        </View>
        <View style={styles.topSpaceContainer}>
          <AppText fontSize="xl" fontWeight="bold">
            Settings
          </AppText>
        </View>
        <View style={styles.midSpaceContainer}>
          <View style={styles.categoryContainer}>
            <AppText fontSize="large">Cyclic Breathing</AppText>
            <View style={styles.verticalContainer}>
              <AppText textColor="blue">Breaths per round</AppText>
              <BreathsPerRoundPicker noOfBreaths={noOfBreaths!} setNoOfBreaths={setNoOfBreaths} />
            </View>
            <View style={styles.verticalContainer}>
              <AppText textColor="blue">Rounds per session</AppText>
              <RoundSelector selectedRound={noOfRounds} setSelectedRound={setNoOfRounds} />
            </View>
          </View>
          <View style={styles.categoryContainer}>
            {/* <AppText fontSize="large">Theme</AppText>
            <View style={styles.verticalContainer}>
              <AppText textColor="blue">Color scheme</AppText>
              <ThemeSwitch setTheme={setTheme} theme={theme} />
            </View> */}
          </View>
        </View>
        <View style={styles.bottomControllers}>
          <AppButton onPress={saveSettings} fontSize="regular" fontWeight="regular">
            Save
          </AppButton>
        </View>
      </View>
    </Screen>
  );
};

export default SettingsScreen;

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
  topSpaceContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  midSpaceContainer: {
    flex: 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  categoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  verticalContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    width: '90%',
  },
  bottomControllers: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
});
