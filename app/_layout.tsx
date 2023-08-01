import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    />
  );
}
