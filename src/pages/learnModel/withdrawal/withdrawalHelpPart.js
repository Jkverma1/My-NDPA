import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import RewardDialog from '../../../components/rewardModal';
import { reward_ico } from '../../../utils/image';
import { useRoute } from '@react-navigation/native';

const withdrawal_chat = require('../../../../assets/icons/learn/withdrawal/withdrawal_help_background.png');
const close_ico = require('../../../../assets/icons/m_close_ico.png');
const idea_ico = require('../../../../assets/icons/learn/idea_ico.png');

const { width: screenWidth } = Dimensions.get('window');

const WithdrawalHelpPart = ({ navigation }) => {
  const route = useRoute();
  const { move, setMove } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []); 

  const handleClosePress = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const handleStart = () => {
    setModalVisible(false);
    navigation.navigate('HelpWithdrawalSection');
  };

  const handleClickMove = async () => {
    setMove(false)
    console.log('-------------data--------------');
    navigation.navigate('WithdrawalPracticeSection');
  };

  useEffect(()=> {
    if(move)
    setModalVisible(true)
  },move)

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={() => setModalVisible(true)}>
        <Image source={withdrawal_chat} style={styles.fullScreenImage} />
      </TouchableOpacity>
      {move ?       
      <RewardDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        title="Great job!"
        text="You`ve finished second step!"
        buttonText="Go to Step 3"
        icon={reward_ico}
      />
      :
      <Modal visible={modalVisible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIconContainer} onPress={handleClosePress}>
            <Image source={close_ico} style={styles.closeIcon} />
          </TouchableOpacity>
          <Image source={idea_ico} style={styles.centerImage} />
          <Text style={styles.text}>
          Let’s think how we can help{'\n'}
          in this situation
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Let's Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDAB90D',
  },
  imageContainer: {
    flex: 1,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(255, 218, 185, 0.4), rgba(255, 218, 185, 0.4))',
  },
  modalContainer: {
    width: screenWidth - 48,
    margin: 24,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    position: 'relative',
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
  centerImage: {
    width: 72,
    height: 72,
    marginTop: 24,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24.51,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 24,
  },
  button: {
    marginTop: 24,
    width: '100%',
    backgroundColor: '#F08080',
    borderColor: '#F08080',
    borderWidth: 1,
    borderRadius: 80,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WithdrawalHelpPart;
