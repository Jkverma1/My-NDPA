import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const RateModal = ({ modalVisible, setModalVisible, handleClickClose, handleClick, title, description }) => {
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
          <Button title="1" onPress={() => handleClick(1)} />
          <Button title="2" onPress={() => handleClick(2)} />
          <Button title="3" onPress={() => handleClick(3)} />
          <Button title="4" onPress={() => handleClick(4)} />
          <Button title="5" onPress={() => handleClick(5)} />
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

export default RateModal;
