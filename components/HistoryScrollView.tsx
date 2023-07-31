import useGetAllCyclicHistory from '@/hooks/useGetAllCyclicHistory';
import React, { useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import AppText from './AppText';
import BoxHistoryFlatList from './BoxHistoryFlatlist';
import CyclicHistoryFlatList from './CyclicHistoryFlatList';
import useGetAllBoxHistory from '@/hooks/useGetAllBoxHistory';

interface Props {
  onScrollEnd: () => void;
}

const HistoryScrollView = ({ onScrollEnd }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const screenWidth = Dimensions.get('screen').width;
  const {
    cyclicHistoryData,
    isLoading: isCyclicDataLoading,
    error: cyclicError,
  } = useGetAllCyclicHistory();
  const { boxHistoryData, isLoading: isBoxDataLoading, error: boxError } = useGetAllBoxHistory();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextPage = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    if (nextPage !== currentPage) {
      setCurrentPage(nextPage);
      onScrollEnd();
    }
  };

  if (isBoxDataLoading || isCyclicDataLoading) return <View />;
  if (cyclicError) return <AppText>{cyclicError.message}</AppText>;
  if (boxError) return <AppText>{boxError.message}</AppText>;

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
          {cyclicHistoryData.length > 0 ? (
            <CyclicHistoryFlatList historyData={cyclicHistoryData} />
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
          {cyclicHistoryData.length > 0 ? (
            <BoxHistoryFlatList historyData={boxHistoryData} />
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
