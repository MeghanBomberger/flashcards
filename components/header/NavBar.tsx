import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import WriteCardIcon from '../../../assets/images/005-draw.svg';
import CardLibraryIcon from '../../assets/images/018-layers.svg';
import UserIcon from '../../assets/images/user.svg';

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
          <Image
            style={styles.navIcon}
            source={navLink.icon}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
        <Image
          style={[styles.navIcon, { marginTop: 24, tintColor: colors.pencilDark }]}
          source={UserIcon}
        />
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
