import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/header/Header';
import { colors } from '../utils/colors';
// import AuthForm from '../components/pages/landing/AuthForm';
// import ForgottenPasswordForm from '../components/pages/landing/ForgottenPasswordForm';

export default function Landing() {
  const [isForgotten, setIsForgotten] = useState(false);

  return (
    <View style={styles.page}>
      <Header title="Welcome to FlashCourse" />
      <View style={styles.container}>
        {/* {isForgotten ? <ForgottenPasswordForm /> : <AuthForm />}
        <TouchableOpacity
          style={styles.forgot}
          onPress={() => setIsForgotten(!isForgotten)}
        >
          <Text style={isForgotten ? styles.forgotActive : styles.forgotText}>
            {isForgotten ? 'Back to login' : 'Forgot your password?'}
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgot: {
    borderWidth: 0,
    backgroundColor: colors.text.highlighterBlue,
    shadowColor: colors.text.highlighterBlue,
    shadowOffset: { width: 3, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  forgotText: {
    color: colors.text.pencilMedium,
    fontSize: 18,
  },
  forgotActive: {
    color: colors.text.penRed,
    fontSize: 18,
  },
});
