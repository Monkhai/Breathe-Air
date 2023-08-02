import React from 'react';
import { FlatList, StyleSheet, View, useColorScheme } from 'react-native';
import { SortedSessionHistory } from '../hooks/useGetAllCyclicHistory';
import { formatDate, formatTime } from '../services/timeFormators';
import AppText from './AppText';
import useGetTheme from '@/services/colors';
import colors from '@/services/colors';

interface Props {
  historyData: SortedSessionHistory[];
}

const CyclicHistoryFlatList = ({ historyData }: Props) => {
  const colorScheme = useColorScheme();
  const flatlistContainerStyle =
    colorScheme === 'light' ? styles.flatlistContainerLight : styles.flatlistContainerDark;

  return (
    <View>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.timestamp}
        renderItem={({ item: session }) => {
          return (
            <View style={[styles.flatlistContainer, flatlistContainerStyle]}>
              <View style={styles.headingCountainer}>
                <AppText fontSize="regular">{formatDate(session.timestamp)}</AppText>
              </View>
              {session.rounds.map((round) => {
                return (
                  <View key={round.roundNumber} style={styles.rowContainer}>
                    <AppText textColor="tertiary">Round {round.roundNumber}</AppText>
                    <AppText textColor="tertiary">{formatTime(round.holdTime)}</AppText>
                  </View>
                );
              })}
            </View>
          );
        }}
      />
    </View>
  );
};

export default CyclicHistoryFlatList;

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  flatlistContainerLight: {
    borderColor: colors.light.divider,
  },
  flatlistContainerDark: {
    borderColor: colors.dark.divider,
  },
  headingCountainer: {
    paddingBottom: 20,
    paddingTop: 10,
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
