import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; 

import Header from '../../../components/header';

const screenWidth = Dimensions.get('window').width;

const dayData = [
  { id: 1, day: 'Mon' },
  { id: 2, day: 'Tue' },
  { id: 3, day: 'Wed' },
  { id: 4, day: 'Thu' },
  { id: 5, day: 'Fri' },
  { id: 6, day: 'Sat' },
  { id: 0, day: 'Sun' },
];

const TimeSetting = () => {
  const navigation = useNavigation();
  const [selectedDays, setSelectedDays] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState(new Date());

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePress = id => {
    if (selectedDays.includes(id)) {
      setSelectedDays(selectedDays.filter(dayId => dayId !== id));
    } else {
      setSelectedDays([...selectedDays, id]);
    }
  };

  const handleSave = () => {
    console.log('Selected Days:', selectedDays);
    console.log('Time:', time);
    console.log('Name:', name);
    navigation.goBack();
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Header visible={false} text={'Time Support'} color={'white'} editable={false} />
      <View style={styles.container_s}>
        <Text style={styles.title}>Set your time</Text>
        <Text style={styles.text}>
          Select how often you would like to receive a reminder
        </Text>
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChangeTime}
          style={{ alignSelf: 'center' }}
        />
        <Text style={styles.title}>Select Days</Text>
        <View style={styles.dayButtonContainer}>
          {dayData.map(day => (
            <TouchableOpacity
              key={day.id}
              style={[
                styles.dayButton,
                {
                  borderColor: selectedDays.includes(day.id) ? '#F08080' : '#1E1D20',
                  backgroundColor: selectedDays.includes(day.id) ? '#F08080' : 'white',
                },
              ]}
              onPress={() => handlePress(day.id)}>
              <Text
                style={[
                  styles.dayButtonText,
                  { color: selectedDays.includes(day.id) ? '#FFFFFF' : '#1E1D2080' },
                ]}>
                {day.day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.title}>Name Reminder</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#969596"
          value={name}
          onChangeText={text => setName(text)}
          autoCapitalize="none"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleBackPress}>
            <Text style={[styles.buttonText, { color: '#F08080' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default TimeSetting;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 100,
    backgroundColor: "#fff"
  },
  container_s: {
    marginTop: 25,
    marginBottom: 20,
    width: (screenWidth * 9) / 10,
    alignItems: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    padding: 10,
    paddingLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
    width: '100%', 
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'left', 
  },
  dayButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%', 
  },
  dayButton: {
    borderRadius: 5,
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 57,
    borderRadius: 45,
    backgroundColor: '#F08080',
    width: '100%',
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F08080',
    height: 57,
    borderRadius: 45,
    backgroundColor: 'white',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
});
