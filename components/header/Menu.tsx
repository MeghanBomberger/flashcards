import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '../../utils/colors';

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {

  const rightAnim = useRef(new Animated.Value(isMenuOpen ? 0 : -400)).current;

  useEffect(() => {
    Animated.timing(rightAnim, {
      toValue: isMenuOpen ? 0 : -400,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [isMenuOpen]);

  const handleLogout = () => {
    setIsMenuOpen(false);
  };

  return (
    <Animated.View
      style={[styles.menuContainer, { right: rightAnim }]}
      pointerEvents={isMenuOpen ? 'auto' : 'none'}
    >
      <View style={[styles.menu, { transform: [{ rotate: isMenuOpen ? '-17.5deg' : '0deg' }] }]}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.menuText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    zIndex: 15,
    backgroundColor: colors.stickyNotes.yellow,
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 240,
    width: 240,
    shadowColor: colors.background.shadow,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.stickyNotes.yellow,
  },
  menuText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.pencilDark,
  },
});
