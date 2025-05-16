import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Alert,
  Picker,
  Platform,
} from 'react-native';
import { Pedometer } from 'expo-sensors';

const HomeScreen = () => {
  const [stepCount, setStepCount] = useState(0);
  const [isAvailable, setIsAvailable] = useState('checking...');

  useEffect(() => {
    let subscription;

    // Check if device supports Pedometer
    Pedometer.isAvailableAsync().then(
      (result) => setIsAvailable(result ? 'Available' : 'Not available'),
      (error) => setIsAvailable('Error: ' + error)
    );

    // Start tracking steps
    subscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });

    // Stop tracking on unmount
    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Step Counter</Text>
      <Text style={styles.steps}>Steps Taken: {stepCount}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4F46E5',
  },
  steps: { fontSize: 32, fontWeight: '600', color: '#111827' },
});
export default HomeScreen;
