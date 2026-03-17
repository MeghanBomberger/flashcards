import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from './icons.type';
import { colors } from '../../utils/colors';

export function UserIcon({ size = 32 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
      <Circle cx="32" cy="24" r="12" fill={colors.icons.iconBlue} />
      <Path d="M32 40c-11.046 0-20 8.954-20 20h40c0-11.046-8.954-20-20-20z" fill={colors.icons.iconLightBlue} />
      <Path d="M32 40c-11.046 0-20 8.954-20 20h40c0-11.046-8.954-20-20-20z" fill={colors.icons.iconBlue} fill-opacity={.2} />
    </Svg>
  );
}
