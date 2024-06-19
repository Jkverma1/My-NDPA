import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';

const CalendarModal = ({ visible, onClose, onDateSelected }) => {
  const [date, setDate] = React.useState(new Date());

  const handleConfirm = () => {
    onDateSelected(date);
    onClose();
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="date"
        />
        <Button title="Confirm" onPress={handleConfirm} />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default CalendarModal;
