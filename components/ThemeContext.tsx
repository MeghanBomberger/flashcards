import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const defaultTheme = {
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ratio: Dimensions.get('window').width / Dimensions.get('window').height,
  },
};

const ThemeContext = createContext(defaultTheme);

export function ThemeProvider({ children }) {
  const [window, setWindow] = useState(defaultTheme.window);

  useEffect(() => {
    const updateWindow = () => {
      const { width, height } = Dimensions.get('window');
      setWindow({
        width,
        height,
        ratio: width / height,
      });
    };
    const subscription = Dimensions.addEventListener('change', updateWindow);
    return () => subscription.remove();
  }, []);

  const value = {
    ...defaultTheme,
    window,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
