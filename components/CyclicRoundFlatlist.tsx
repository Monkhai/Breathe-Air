import { CyclicHistory } from '@/db/SQLite';
import { formatTime } from '@/services/timeFormators';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import AppText from './AppText';

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
            <AppText textColor="tertiary">Round {item.round_number}</AppText>
            <AppText textColor="tertiary">{formatTime(item.hold_time)}</AppText>
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
