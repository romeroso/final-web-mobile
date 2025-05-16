import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';

export default function CalorieCalculator() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('1.2'); // sedentary
  const [calories, setCalories] = useState(null);
  const [goal, setGoal] = useState('maintain');

  const calculateCalories = () => {
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const activityFactor = parseFloat(activity);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum)) {
      Alert.alert('Please enter valid numbers');
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    let dailyCalories = bmr * activityFactor;

    // Adjust based on goal
    if (goal === 'lose') {
      dailyCalories -= 500; // Safe caloric deficit
    } else if (goal === 'gain') {
      dailyCalories += 500; // Safe caloric surplus
    }

    setCalories(dailyCalories.toFixed(0));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calorie Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <View style={styles.pickerWrapper}>
        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <View style={styles.pickerWrapper}>
        <Text style={styles.label}>Activity Level:</Text>
        <Picker
          selectedValue={activity}
          onValueChange={(itemValue) => setActivity(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Sedentary (little or no exercise)" value="1.2" />
          <Picker.Item label="Lightly active (1–3 days/week)" value="1.375" />
          <Picker.Item label="Moderately active (3–5 days/week)" value="1.55" />
          <Picker.Item label="Very active (6–7 days/week)" value="1.725" />
          <Picker.Item label="Super active (twice per day)" value="1.9" />
        </Picker>
      </View>
      <View style={styles.pickerWrapper}>
        <Text style={styles.label}>Goal:</Text>
        <Picker
          selectedValue={goal}
          onValueChange={(itemValue) => setGoal(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Maintain Weight" value="maintain" />
          <Picker.Item label="Lose Weight" value="lose" />
          <Picker.Item label="Gain Weight" value="gain" />
        </Picker>
      </View>

      <Button title="Calculate Calories" onPress={calculateCalories} />

      {calories && (
        <Text style={styles.result}>
          To {goal} your weight, you need about {calories} kcal per day.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  pickerWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: Platform.OS === 'ios' ? 180 : 50,
    width: '100%',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4F46E5',
  },
});
