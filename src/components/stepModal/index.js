import React from 'react';
import { Modal, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';

const CustomStepModal = ({ visible, onRequestClose, stepText, message, handleInput, handleChangeText, text, handleSend, messageIcon, showHand, sendClick }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.stepText}>{stepText}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleChangeText}
              value={text}
            />
            <TouchableOpacity onPress={handleInput}>
              <Image source={messageIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
          {showHand && (
            <Image source={handIcon} style={styles.handIcon} />
          )}
          <Button title="Send" onPress={handleSend} />
          <Button title="Close" onPress={onRequestClose} />
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
    // backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  handIcon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
});

export default CustomStepModal;
