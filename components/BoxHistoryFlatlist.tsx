import { BoxSession } from '@/db/SQLite';
import React from 'react';
import { FlatList, StyleSheet, View, useColorScheme } from 'react-native';
import { formatDate, formatTime } from '../services/timeFormators';
import AppText from './AppText';
import colors from '@/services/colors';

interface Props {
  historyData: BoxSession[];
}

const BoxHistoryFlatList = ({ historyData }: Props) => {
  const colorScheme = useColorScheme();
  const flatlistContainerStyle =
    colorScheme === 'light' ? styles.flatlistContainerLight : styles.flatlistContainerDark;

  return (
    <View>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.session_id.toString()}
        renderItem={({ item: session }) => {
          return (
            <View style={[styles.flatlistContainer, flatlistContainerStyle]}>
              <View style={styles.rowContainer}>
                <AppText textColor="tertiary">{formatDate(session.created_at)}</AppText>
                <AppText textColor="tertiary">{formatTime(session.duration)}</AppText>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default BoxHistoryFlatList;

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  flatlistContainerLight: {
    borderColor: colors.light.divider,
  },
  flatlistContainerDark: {
    borderColor: colors.dark.divider,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
});
