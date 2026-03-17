import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './icons.type';
import { colors } from '../../utils/colors';

export function WriteCardIcon({ size = 32 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Path d="M12 52h40v4H12v-4zm36.586-29.414l-6.172-6.172a2 2 0 0 0-2.828 0l-24.172 24.172a2 2 0 0 0-.586 1.414V48a2 2 0 0 0 2 2h6.586a2 2 0 0 0 1.414-.586l24.172-24.172a2 2 0 0 0 0-2.828zM16 46v-4.586l22.586-22.586 4.586 4.586L20.586 46H16zm32.586-25.414a4 4 0 0 1 0 5.656l-24.172 24.172A4 4 0 0 1 20.586 52H12a4 4 0 0 1-4-4v-8.586a4 4 0 0 1 1.172-2.828l24.172-24.172a4 4 0 0 1 5.656 0l6.172 6.172z" fill={colors.icons.iconPrimary} />
    </Svg>
  );
}
