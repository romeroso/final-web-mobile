import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState('');

  useEffect(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmiValue = w / (h * h);
      setBmi(bmiValue.toFixed(1));
      classifyBMI(bmiValue);
    } else {
      setBmi(null);
      setBmiStatus('');
    }
  }, [weight, height]);

  const classifyBMI = (value) => {
    if (value < 18.5) setBmiStatus('Underweight');
    else if (value < 24.9) setBmiStatus('Normal');
    else if (value < 29.9) setBmiStatus('Overweight');
    else setBmiStatus('Obese');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>BMI Calculator</Text>
        </View>
        <ProfileItem
          icon={<FontAwesome5 name="weight" size={24} />}
          value={weight}
          onChange={setWeight}
          editable={isEditing}
          keyboardType="numeric"
          placeholder="Weight (kg)"
        />
        <ProfileItem
          icon={<MaterialIcons name="height" size={24} />}
          value={height}
          onChange={setHeight}
          editable={isEditing}
          keyboardType="numeric"
          placeholder="Height (cm)"
        />
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Text style={styles.editButton}>{isEditing ? 'Done' : 'Edit'}</Text>
          </TouchableOpacity>
        {bmi && (
          <View style={styles.bmiContainer}>
            <Text style={styles.bmiText}>BMI: {bmi}</Text>
            <Text style={styles.bmiStatus}>Status: {bmiStatus}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileItem = ({
  icon,
  value,
  onChange,
  editable,
  placeholder,
  keyboardType,
}) => (
  <View style={styles.item}>
    <View style={styles.iconWrapper}>{icon}</View>
    <TextInput
      style={[styles.input, !editable && styles.disabledInput]}
      value={value}
      onChangeText={onChange}
      editable={editable}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor="#999"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  editButton: {
  fontSize: 16,
  color: '#4F46E5', // Indigo-600 from Tailwind palette
  fontWeight: '600',
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 6,
  backgroundColor: '#EEF2FF', // Light indigo background for contrast
  textAlign: 'center',
  overflow: 'hidden', // ensures the background and text don't overflow
},

  item: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 10,
  backgroundColor: '#fff',
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOpacity: 0.03,
  shadowRadius: 3,
  elevation: 1,
  width: '100%', 
  alignSelf: 'center',
},
  iconWrapper: {
    width: 30,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#555',
  },
  bmiContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  bmiText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  bmiStatus: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
});

export default ProfileScreen;
