import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import close_ico from '../../../assets/icons/m_close_ico.png'; 
import { useNavigation } from '@react-navigation/native';

const RewardDialog = ({
  modalVisible,
  setModalVisible,
  handleClick,
  title,
  text,
  buttonText,
  icon,
}) => {
  const navigation = useNavigation();
  const handleClosePress = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIconContainer} onPress={handleClosePress}>
            <Image source={close_ico} style={styles.closeIcon} />
          </TouchableOpacity>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{text}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleClick();
              setModalVisible(false);
            }}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
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
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  icon: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24.51,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F08080',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 80,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default RewardDialog;
