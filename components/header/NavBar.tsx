import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { WriteCardIcon } from '../icons/WriteCardIcon';
import { CardLibraryIcon } from '../icons/CardLibraryIcon';
import { UserIcon } from '../icons/UserIcon';

interface NavBarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const navList = [
  {
    name: 'Card Library',
    icon: CardLibraryIcon,
    path: '/user/cards',
  },
  {
    name: 'Write Card',
    icon: WriteCardIcon,
    path: '/user/cards/write',
  },
];

export default function NavBar({ isMenuOpen, setIsMenuOpen }: NavBarProps) {
  return (
    <View style={styles.navbarContainer}>
      {navList.map(navLink => (
        <TouchableOpacity key={navLink.name}>
          <navLink.icon />
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
        <UserIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 64,
    marginRight: 16,
    zIndex: 10,
  },
  navIcon: {
    width: 32,
    height: 32,
    marginHorizontal: 8,
  },
});
