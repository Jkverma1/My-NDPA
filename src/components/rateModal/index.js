import React from 'react';
import {Modal, View, Text, Button, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ratingStar = require('../../../assets/icons/star.png');

const RateModal = ({
  modalVisible,
  setModalVisible,
  handleClickClose,
  handleClick,
  title,
  description,
}) => {
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
          <View style={styles.starContainer}>
            <TouchableOpacity>
              <Image source={ratingStar} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={ratingStar} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={ratingStar} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={ratingStar} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={ratingStar} />
            </TouchableOpacity>
          </View>
          <Text style={styles.content}>
            Explain your choice
          </Text>
          <TouchableOpacity style={{width: '100%'}} onPressIn={()=> {
            console.log('AAA')
          }}>
            <Text style={styles.sendButton}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  modalView: {
    margin: 20,
    width: '90%',
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
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: 15,
    color: `#1E1D20`,
  },
  description: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: `#1E1D20B2`,
  },
  sendButton: {
    backgroundColor: '#F08080',
    width: '100%',
    height: 45,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 21,
    fontFamily: 'OpenSans-SemiBold',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 100,
    marginTop: 16,
  },
  content: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#0000001A',
    width: '100%',
    height: 100,
    padding: 12,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular'
  }
});

export default RateModal;
