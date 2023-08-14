import React, { ReactNode } from 'react';
import { Text, TextProps, useColorScheme } from 'react-native';
import colors from '../services/colors';
import fontSizes from '../services/fontSizes';
import { useGetFonts } from '../services/useGetFonts';

interface Props extends TextProps {
  fontWeight?: 'regular' | 'bold' | 'thin' | 'light';
  fontSize?: 'small' | 'regular' | 'large' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl';
  textColor?: 'tertiary' | 'primary' | 'background';
  children?: ReactNode;
}

const AppText = ({
  textColor = 'primary',
  fontWeight = 'regular',
  children = '',
  fontSize = 'small',
  ...otherProps
}: Props) => {
  const { fonts, fontsLoaded } = useGetFonts();
  const colorScheme = useColorScheme();

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
          colorScheme === 'light'
            ? textColor === 'background'
              ? colors.light.background
              : textColor === 'tertiary'
              ? colors.light.tertiary
              : colors.light.primary
            : textColor === 'background'
            ? colors.dark.background
            : textColor === 'tertiary'
            ? colors.dark.tertiary
            : colors.dark.primary,
      }}
    >
      {children}
    </Text>
  );
};

export default AppText;
