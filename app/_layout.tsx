import useInitializeTables from '@/hooks/useInitializeTables';
import colors from '@/services/colors';
import { SplashScreen } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_bottom',
        headerShown: false,
        gestureEnabled: false,
        contentStyle: {
          backgroundColor:
            colorScheme === 'light' ? colors.light.background : colors.dark.background,
        },
      }}
    />
  );
}
