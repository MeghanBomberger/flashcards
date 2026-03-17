import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { BG_PAPER, BORDER_RED, HOLE_BLUE, LINE_BLUE, SHADOW } from '../utils/colors';

export default function AppBackground({ children }) {
  const defaultPaperRatio = 0.7727;
  const [lineCount, setLineCount] = useState(33);
  const [windowRatio, setWindowRatio] = useState(defaultPaperRatio);
  const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateWindowSize = () => {
      const { height, width } = Dimensions.get('window');
      setWindowHeight(height);
      setWindowWidth(width);
      setWindowRatio(width / height);
    };
    const subscription = Dimensions.addEventListener('change', updateWindowSize);
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (windowRatio > defaultPaperRatio) {
      setLineCount(Math.round(33 / windowRatio));
    } else {
      setLineCount(33);
    }
  }, [windowRatio]);

  const lines = Array.from({ length: lineCount }, (_, i) => (
    <View key={`blue-line-${i + 1}`} style={i === 0 ? styles.blueLineFirst : styles.blueLine} />
  ));

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.blueLinesContainer}>{lines}</View>
      <View style={styles.holesContainer}>
        <View style={styles.punchHole} />
        {windowRatio <= 2.05 && <View style={styles.punchHole} />}
        {windowRatio <= 1 && <View style={styles.punchHole} />}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: BG_PAPER,
  },
  holesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 48,
    height: '100%',
    borderRightWidth: 2,
    borderRightColor: BORDER_RED,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingBottom: 32,
    zIndex: 2,
  },
  punchHole: {
    zIndex: 1,
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: HOLE_BLUE,
    marginVertical: 8,
    shadowColor: SHADOW,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  blueLinesContainer: {
    position: 'absolute',
    top: 64, // header height offset
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    width: '100%',
  },
  blueLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: LINE_BLUE,
  },
  blueLineFirst: {
    width: '100%',
    borderTopWidth: 2,
    borderTopColor: LINE_BLUE,
    borderBottomWidth: 1,
    borderBottomColor: LINE_BLUE,
  },
});
