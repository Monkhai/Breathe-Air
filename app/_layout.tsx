import colors from '@/services/colors';
import { Stack } from 'expo-router/stack';
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
