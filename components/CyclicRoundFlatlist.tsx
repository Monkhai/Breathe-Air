import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from './AppText';
import { CyclicHistory } from '@/db/SQLite';
import { formatTime } from '@/services/timeFormators';

export interface RoundData {
  round: number;
  hold: number;
}

interface Props {
  roundData: CyclicHistory[];
}

const CyclicRoundFlatlist = ({ roundData }: Props) => {
  return (
    <View>
      <View style={styles.heading}>
        <AppText fontSize="large" fontWeight="bold">
          Session Summary
        </AppText>
      </View>
      <FlatList
        scrollEnabled={false}
        data={roundData}
        keyExtractor={(round) => round.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.round}>
            <AppText textColor="black">Round {item.round_number}</AppText>
            <AppText textColor="black">{formatTime(item.hold_time)}</AppText>
          </View>
        )}
      />
    </View>
  );
};

export default CyclicRoundFlatlist;

const styles = StyleSheet.create({
  heading: {
    marginBottom: 20,
  },
  round: {
    width: Dimensions.get('screen').width * 0.8,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
