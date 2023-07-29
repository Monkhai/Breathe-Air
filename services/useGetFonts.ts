import { useFonts } from 'expo-font';

export const useGetFonts = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Thin': require('../assets/fonts/inter/Inter-Thin.ttf'),
    'Inter-Light': require('../assets/fonts/inter/Inter-Light.ttf'),
    'Inter-Regular': require('../assets/fonts/inter/Inter-Regular.ttf'),
    'Inter-Bold': require('../assets/fonts/inter/Inter-Bold.ttf'),
  });
  if (!fontsLoaded) return { fontsLoaded: false };
  return {
    fonts: {
      thin: 'Inter-Thin',
      regular: 'Inter-Regular',
      bold: 'Inter-Bold',
      light: 'Inter-Light',
    },
    fontsLoaded,
  };
};
