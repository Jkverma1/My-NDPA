import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const DeleteModal = ({ modalVisible, handleClick, text }) => {
  const [isVisible, setIsVisible] = useState(modalVisible);

  useEffect(() => {
    setIsVisible(modalVisible);
  }, [modalVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#F08080' }]}
              onPress={handleClick}
            >
              <Text style={[styles.buttonText, { color: 'white' }]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { borderColor: '#F08080', backgroundColor: 'white' }]}
              onPress={handleClose}
            >
              <Text style={[styles.buttonText, { color: '#F08080' }]}>No</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    width: '100%',
    maxWidth: screenWidth - 64, 
    paddingHorizontal: 32, 
  },
  modalText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    gap: 10,
    marginTop: 20,
  },
  button: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 21,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '500',
  },
});

export default DeleteModal;
