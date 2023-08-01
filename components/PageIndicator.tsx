import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '@/services/colors';

interface Props {
  page: 1 | 2;
}

const PageIndicator = ({ page }: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 100,
          width: 8,
          height: 8,
          backgroundColor: page === 1 ? colors.primary : colors.white,
        }}
      />
      <View
        style={{
          borderRadius: 100,
          width: 8,
          height: 8,
          backgroundColor: page === 2 ? colors.primary : colors.white,
        }}
      />
    </View>
  );
};

export default PageIndicator;

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 24,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
