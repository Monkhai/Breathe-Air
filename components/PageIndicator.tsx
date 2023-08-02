import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import React from 'react';
import colors from '@/services/colors';

interface Props {
  page: 1 | 2;
}

const PageIndicator = ({ page }: Props) => {
  const colorScheme = useColorScheme();
  const containerStyle = colorScheme === 'light' ? styles.containerLight : styles.containerDark;
  const selectedPageIndicatorStyle =
    colorScheme === 'light' ? styles.selectedPageIndicatorLight : styles.selectedPageIndicatorDark;
  const notSelectedPageIndicatorStyle =
    colorScheme === 'light'
      ? styles.notSelectedPageIndicatorLight
      : styles.notSelectedPageIndicatorDark;

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.pageIndicator,
          page === 1 ? selectedPageIndicatorStyle : notSelectedPageIndicatorStyle,
        ]}
      />
      <View
        style={[
          styles.pageIndicator,
          page === 2 ? selectedPageIndicatorStyle : notSelectedPageIndicatorStyle,
        ]}
      />
    </View>
  );
};

export default PageIndicator;

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 24,
    borderRadius: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerLight: {
    backgroundColor: colors.light.secondary,
  },
  containerDark: {
    backgroundColor: colors.dark.divider,
  },
  pageIndicator: {
    borderRadius: 100,
    width: 8,
    height: 8,
  },
  selectedPageIndicatorLight: {
    backgroundColor: colors.light.primary,
  },
  selectedPageIndicatorDark: {
    backgroundColor: colors.dark.primary,
  },
  notSelectedPageIndicatorLight: {
    backgroundColor: colors.light.background,
  },
  notSelectedPageIndicatorDark: {
    backgroundColor: colors.dark.background,
  },
});
