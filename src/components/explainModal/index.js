import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ExplainModal = ({ modalVisible, setModalVisible, handleClick, handleClickClose, title }) => {
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
          <Text style={styles.content}>Please explain why you made this choice:</Text>
          {/* You can add a TextInput here if needed */}
          <Button title="Submit" onPress={() => {
            handleClick();
            setModalVisible(false);
          }} />
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
  content: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ExplainModal;
