import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const DatePickerModal = ({ visible, onClose }) => {
  const [date, setDate] = useState(new Date());

  const handleDismiss = () => {
    onClose(date);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleDismiss}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Date of Birth</Text>
            <TouchableOpacity onPress={handleDismiss}>
              <Image
                style={styles.closeIcon}
                source={require('../../../assets/icons/close_ico.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={day => {
                setDate(day.dateString);
              }}
              markedDates={{
                [date]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'white',
                  selectedColor: '#F08080',
                },
              }}
            />
          </View>
          <View style={styles.bottomHandleContainer}>
            <View style={styles.bottomHandle} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingBottom: 10, 
    alignItems: 'center',
  },
  handleContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10, 
  },
  handle: {
    width: 100,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },
  bottomHandleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 5, 
  },
  bottomHandle: {
    width: 100,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10, 
    marginBottom: 10, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1D20',
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  calendarContainer: {
    width: '100%', 
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default DatePickerModal;