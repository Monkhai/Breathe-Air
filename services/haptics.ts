import * as Haptics from 'expo-haptics';

export const generateLightHaptics = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const generateMediumHaptics = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const generateHeavyHaptics = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};
