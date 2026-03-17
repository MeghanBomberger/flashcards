import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { colors } from '../utils/colors';

export default function AppBackground({ children }) {
  const theme = useTheme();
  const layout = {
    headerHeight: 64,
    sidebarWidth: 48,
    punchHoleSize: 24,
    punchHoleSpacing: 8,
    paddingTop: 32,
    paddingBottom: 32,
  };
  const backgroundStyles = styles(theme.window, layout);
  const defaultPaperRatio = 0.7727;
  const windowRatio = theme.window.ratio;
  const [lineCount, setLineCount] = useState(33);
  useEffect(() => {
    if (windowRatio > defaultPaperRatio) {
      setLineCount(Math.round(33 / windowRatio));
    } else {
      setLineCount(33);
    }
  }, [windowRatio]);
  const lines = Array.from({ length: lineCount }, (_, i) => (
    <View key={`blue-line-${i + 1}`} style={i === 0 ? backgroundStyles.blueLineFirst : backgroundStyles.blueLine} />
  ));

  return (
    <View style={backgroundStyles.backgroundContainer}>
      <View style={backgroundStyles.blueLinesContainer}>{lines}</View>
      <View style={backgroundStyles.holesContainer}>
        <View style={backgroundStyles.punchHole} />
        {windowRatio <= 2.05 && <View style={backgroundStyles.punchHole} />}
        {windowRatio <= 1 && <View style={backgroundStyles.punchHole} />}
      </View>
      {children}
    </View>
  );
}

const styles = (window, layout) => StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: colors.bgPaper,
  },
  holesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: layout.sidebarWidth,
    height: '100%',
    borderRightWidth: 2,
    borderRightColor: colors.borderRed,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: layout.paddingTop,
    paddingBottom: layout.paddingBottom,
    zIndex: 2,
  },
  punchHole: {
    zIndex: 1,
    height: layout.punchHoleSize,
    width: layout.punchHoleSize,
    borderRadius: layout.punchHoleSize / 2,
    backgroundColor: colors.holeBlue,
    marginVertical: layout.punchHoleSpacing,
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  blueLinesContainer: {
    position: 'absolute',
    top: layout.headerHeight,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    width: '100%',
  },
  blueLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.lineBlue,
  },
  blueLineFirst: {
    width: '100%',
    borderTopWidth: 2,
    borderTopColor: colors.lineBlue,
    borderBottomWidth: 1,
    borderBottomColor: colors.lineBlue,
  },
});
