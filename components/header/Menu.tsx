import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '../../utils/colors';

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {
  const handleLogout = () => {
    // Implement logout logic here
    setIsMenuOpen(false);
  };

  return (
    <Animated.View style={[styles.menuContainer, { right: isMenuOpen ? 0 : -400 }]}
      pointerEvents={isMenuOpen ? 'auto' : 'none'}>
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
    backgroundColor: colors.yellowStickyNote,
    transition: 'right 1s',
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 240,
    width: 240,
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellowStickyNote,
  },
  menuText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.pencilDark,
  },
});
