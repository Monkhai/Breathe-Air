import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import AppText from './AppText';
import * as Haptics from 'expo-haptics';
import colors from '../services/colors';
import IonIcons from '@expo/vector-icons/Ionicons';

interface Props extends TouchableOpacityProps {
  fontWeight?: 'regular' | 'bold' | 'thin' | 'light';
  fontSize?: 'small' | 'regular' | 'large' | 'xl';
  children: ReactNode;
  icon?: string;
  onPress: () => void;
}

const AppButton = ({
  fontWeight = 'regular',
  fontSize = 'small',
  children,
  icon,
  onPress,
  ...otherProps
}: Props) => {
  return (
    <TouchableOpacity
      {...otherProps}
      onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={styles.container}
    >
      {icon && <IonIcons name={icon as any} color={colors.primary} size={20} />}
      <AppText fontSize={fontSize} fontWeight={fontWeight}>
        {children}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    height: 48,
    minHeight: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
