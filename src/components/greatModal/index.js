import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CustomGreatModal = ({ visible, icon, handleClick, buttonType, onRequestClose, message }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {icon && <Image source={icon} style={styles.icon} />}
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonRow}>
            {buttonType ? (
              <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleClick}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleClick}>
                <Text style={styles.submitButtonText}>Try Again</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onRequestClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
    paddingHorizontal: 24,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
  icon: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  message: {
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24.51,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 80,
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#F08080',
    borderColor: '#F08080',
    borderWidth: 1,
  },
  submitButtonText: {
    fontFamily: 'Open Sans',
    fontSize: 21,
    fontWeight: '600',
    lineHeight: 28.6,
    textAlign: 'center',
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: '#F08080',
    borderWidth: 1,
  },
  cancelButtonText: {
    fontFamily: 'Open Sans',
    fontSize: 21,
    fontWeight: '600',
    lineHeight: 28.6,
    textAlign: 'center',
    color: '#F08080',
  },
});

export default CustomGreatModal;
