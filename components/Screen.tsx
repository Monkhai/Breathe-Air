import useGetTheme from '@/services/colors';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View, useColorScheme } from 'react-native';

interface Props {
  children: ReactNode;
}

const Screen = ({ children }: Props) => {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {children}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
  },
});
