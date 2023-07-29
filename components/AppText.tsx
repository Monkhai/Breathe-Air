import { StyleSheet, Text, TextProps, View } from 'react-native';
import React, { ReactNode } from 'react';
import { useGetFonts } from '../services/useGetFonts';
import colors from '../services/colors';
import fontSizes from '../services/fontSizes';

interface Props extends TextProps {
  fontWeight?: 'regular' | 'bold' | 'thin' | 'light';
  fontSize?: 'small' | 'regular' | 'large' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl';
  textColor?: 'black' | 'white' | 'blue';
  children?: ReactNode;
}

const AppText = ({
  textColor = 'blue',
  fontWeight = 'regular',
  children = '',
  fontSize = 'small',
  ...otherProps
}: Props) => {
  const { fonts, fontsLoaded } = useGetFonts();

  const fontFamilyMap = {
    regular: fonts?.regular,
    bold: fonts?.bold,
    thin: fonts?.thin,
    light: fonts?.light,
  };

  const fontSizeMap = {
    small: fontSizes.small,
    regular: fontSizes.regular,
    large: fontSizes.large,
    xl: fontSizes.xl,
    xxl: fontSizes.xxl,
    xxxl: fontSizes.xxxl,
    xxxxl: fontSizes.xxxxl,
  };

  if (!fontsLoaded) <Text>Wait a second</Text>;

  return (
    <Text
      {...otherProps}
      style={{
        textAlign: 'center',
        fontFamily: fontFamilyMap[fontWeight],
        fontSize: fontSizeMap[fontSize],
        color:
          textColor == 'black'
            ? colors.black
            : textColor == 'white'
            ? colors.white
            : colors.primary,
      }}
    >
      {children}
    </Text>
  );
};

export default AppText;
