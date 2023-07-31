import { BoxSession } from '@/db/SQLite';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { formatDate, formatTime } from '../services/timeFormators';
import AppText from './AppText';

interface Props {
  historyData: BoxSession[];
}

const BoxHistoryFlatList = ({ historyData }: Props) => {
  return (
    <View>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.session_id.toString()}
        renderItem={({ item: session }) => {
          return (
            <View style={styles.FlatlistContainer}>
              <View style={styles.rowContainer}>
                <AppText textColor="black">{formatDate(session.created_at)}</AppText>
                <AppText textColor="black">{formatTime(session.duration)}</AppText>
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
  FlatlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
    borderBottomColor: 'rgba(0,0,0,0.15)',
    borderBottomWidth: 1,
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
