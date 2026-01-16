/**
 * Logo Component
 * App logo based on camera icon design
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Rect, Circle, Line, G} from 'react-native-svg';
import {colors} from '@theme';

interface LogoProps {
  size?: number;
  showBackground?: boolean;
}

const Logo: React.FC<LogoProps> = ({size = 100, showBackground = false}) => {
  const centerX = size / 2;
  const bodyWidth = size * 0.7;
  const bodyHeight = size * 0.5;
  const bodyX = size * 0.15;
  const bodyY = size * 0.25;
  const lensRadius = size * 0.175;
  const lensCenterY = bodyY + bodyHeight * 0.25;

  return (
    <View
      style={[
        styles.container,
        {width: size, height: size},
        showBackground && styles.background,
      ]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Camera Body - Top White */}
        <Rect
          x={bodyX}
          y={bodyY}
          width={bodyWidth}
          height={bodyHeight * 0.5}
          rx={size * 0.075}
          fill={colors.white}
          stroke={colors.text}
          strokeWidth={size * 0.04}
        />

        {/* Camera Body - Bottom Coral/Orange */}
        <Rect
          x={bodyX}
          y={bodyY + bodyHeight * 0.5}
          width={bodyWidth}
          height={bodyHeight * 0.5}
          rx={size * 0.075}
          fill="#FF6B6B"
          stroke={colors.text}
          strokeWidth={size * 0.04}
        />

        {/* Large Lens - Outer */}
        <Circle
          cx={centerX}
          cy={lensCenterY}
          r={lensRadius}
          fill={colors.white}
          stroke={colors.text}
          strokeWidth={size * 0.04}
        />

        {/* Large Lens - Middle Ring */}
        <Circle
          cx={centerX}
          cy={lensCenterY}
          r={lensRadius * 0.7}
          fill={colors.white}
          stroke={colors.text}
          strokeWidth={size * 0.03}
        />

        {/* Large Lens - Inner Circle */}
        <Circle
          cx={centerX}
          cy={lensCenterY}
          r={lensRadius * 0.4}
          fill={colors.white}
          stroke={colors.text}
          strokeWidth={size * 0.02}
        />

        {/* Lens Center Dot */}
        <Circle cx={centerX} cy={lensCenterY} r={size * 0.025} fill={colors.text} />

        {/* Viewfinder/Hot Shoe */}
        <Rect
          x={bodyX + bodyWidth * 0.15}
          y={bodyY * 0.5}
          width={bodyWidth * 0.3}
          height={bodyY * 0.3}
          rx={size * 0.025}
          fill={colors.text}
        />
        <Line
          x1={bodyX + bodyWidth * 0.2}
          y1={bodyY * 0.6}
          x2={bodyX + bodyWidth * 0.4}
          y2={bodyY * 0.6}
          stroke={colors.white}
          strokeWidth={size * 0.01}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: colors.background,
    borderRadius: 20,
  },
});

export default Logo;
