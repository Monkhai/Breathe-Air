import { Dimensions } from 'react-native';

const widthPrecent = (precent: number) => {
  const onePrecent = Dimensions.get('window').width / 100;
  return onePrecent * precent;
};

export default {
  small: 18,
  regular: widthPrecent(5.8),
  large: widthPrecent(7),
  xl: widthPrecent(8.5),
  xxl: widthPrecent(15),
  xxxl: widthPrecent(20),
  xxxxl: widthPrecent(25),
};
