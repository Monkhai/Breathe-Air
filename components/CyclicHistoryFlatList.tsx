import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SortedSessionHistory } from '../hooks/useGetAllCyclicHistory';
import { formatDate, formatTime } from '../services/timeFormators';
import AppText from './AppText';

interface Props {
  historyData: SortedSessionHistory[];
}

const CyclicHistoryFlatList = ({ historyData }: Props) => {
  return (
    <View>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.timestamp}
        renderItem={({ item: session }) => {
          return (
            <View style={styles.FlatlistContainer}>
              <View style={styles.headingCountainer}>
                <AppText fontSize="regular">{formatDate(session.timestamp)}</AppText>
              </View>
              {session.rounds.map((round) => {
                return (
                  <View style={styles.rowContainer}>
                    <AppText textColor="black">Round {round.roundNumber}</AppText>
                    <AppText textColor="black">{formatTime(round.holdTime)}</AppText>
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
  FlatlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomColor: 'rgba(0,0,0,0.15)',
    borderBottomWidth: 1,
  },
  headingCountainer: { paddingBottom: 20, paddingTop: 10 },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
});
