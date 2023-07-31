import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppText from './AppText';
import CyclicHistoryFlatList from './CyclicHistoryFlatList';
import useGetAllHistory, { SortedSessionHistory } from '@/hooks/useGetAllHistory';

interface Props {
  onScrollEnd: () => void;
}

const HistoryScrollView = ({ onScrollEnd }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const screenWidth = Dimensions.get('screen').width;
  const { historyData, isLoading, error } = useGetAllHistory();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextPage = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    if (nextPage !== currentPage) {
      setCurrentPage(nextPage);
      onScrollEnd();
    }
  };

  if (isLoading) return <View />;
  if (error) return <AppText>{error.message}</AppText>;

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      horizontal
      snapToInterval={Dimensions.get('screen').width}
      decelerationRate={'fast'}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >
      <View
        style={{
          width: Dimensions.get('screen').width * 2,
          height: '100%',
          flexDirection: 'row',
        }}
      >
        <View style={styles.page}>
          <AppText fontSize="regular" fontWeight="bold">
            Cyclic Session Animation
          </AppText>
          {historyData.length > 0 ? (
            <CyclicHistoryFlatList historyData={historyData} />
          ) : (
            <View style={styles.noData}>
              <AppText>No data yet...</AppText>
            </View>
          )}
        </View>
        <View style={styles.page}>
          <AppText fontSize="regular" fontWeight="bold">
            Box Session Animation
          </AppText>
          {historyData.length > 0 ? (
            <CyclicHistoryFlatList historyData={historyData} />
          ) : (
            <View style={styles.noData}>
              <AppText>No data yet...</AppText>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default HistoryScrollView;

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  page: {
    width: Dimensions.get('screen').width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noData: {
    paddingTop: 20,
  },
});
