import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from './AppText';

export interface RoundData {
  round: number;
  hold: number;
}

interface Props {
  roundData: RoundData[];
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
        keyExtractor={(round) => round.round.toString()}
        renderItem={(item) => (
          <View style={styles.round}>
            <AppText textColor="black">Round {item.item.round}</AppText>
            <AppText textColor="black">{item.item.hold}</AppText>
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
