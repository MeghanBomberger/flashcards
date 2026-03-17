import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Menu from './Menu';
import NavBar from './NavBar';
import { colors } from '../../utils/colors';
import { LogoIcon } from '../icons/LogoIcon';

interface HeaderProps {
  title?: string;
  cornerIcon?: any;
}

export default function Header({ title, cornerIcon }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.cornerIcon}>
          <TouchableOpacity>
            {cornerIcon ? (
              <Image
                alt="home"
                style={styles.headerLogo}
                source={cornerIcon}
              />
            ) : (
              <LogoIcon size={40} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.headerMain}>
          <Text style={styles.headerTitle}>{title ? title : 'ERROR: Title Missing'}</Text>
        </View>
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </View>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: colors.bgPaper,
  },
  cornerIcon: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    width: 40,
    height: 40,
    transform: [{ rotate: '-5deg' }],
    marginTop: 8,
  },
  headerMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 32,
    color: colors.pencilDark,
    paddingLeft: 24,
    textAlign: 'left',
    fontWeight: 'bold',
  },
});
