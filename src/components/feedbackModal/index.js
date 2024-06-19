import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const FeedbackModal = ({ modalVisible, setModalVisible, handleClickClose, handleRating, title, description }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={handleClickClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {/* You can replace these with custom rating buttons */}
          <Button title="Rate 1" onPress={() => handleRating(1)} />
          <Button title="Rate 2" onPress={() => handleRating(2)} />
          <Button title="Rate 3" onPress={() => handleRating(3)} />
          <Button title="Rate 4" onPress={() => handleRating(4)} />
          <Button title="Rate 5" onPress={() => handleRating(5)} />
          <Button title="Close" onPress={handleClickClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default FeedbackModal;
