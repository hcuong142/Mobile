import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the My App!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomePage;