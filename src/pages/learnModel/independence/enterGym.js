import React, {useState, useEffect} from 'react';
import {BlurView} from '@react-native-community/blur';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';

const gymBackgroundImage = require('../../../../assets/icons/learn/independence/gym_bg.png');
const close_ico = require('../../../../assets/icons/m_close_ico.png');
const liftIconImage = require('../../../../assets/icons/learn/independence/lift.png');

const {width: screenWidth} = Dimensions.get('window');

const EnterGym = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePress = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const handleStart = () => {
    setModalVisible(false);
    navigation.navigate('IndependenceSection');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}
      >
        <Image source={gymBackgroundImage} style={styles.fullScreenImage} />
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.overlay}>
          <BlurView
            style={[
              styles.blurView,
              {backgroundColor: 'rgba(255, 218, 185, 0.3)'},
            ]}
            blurType="light"
            blurAmount={3}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={handleClosePress}
            >
              <Image source={close_ico} style={styles.closeIcon} />
            </TouchableOpacity>
            <Image source={liftIconImage} style={styles.centerImage} />
            <Text style={styles.text}>
              Imagine that you’re at the gym.{'\n'}
              Let’s define the exercises you want{'\n'}
              to do on your owns
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>Let's Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFDAB966',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(255, 218, 185, 0.4), rgba(255, 218, 185, 0.4))',
  },
  modalContainer: {
    width: screenWidth - 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
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
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: '#1E1D20',
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
    fontSize: 21,
    fontHeight: 28,
    fontFamily: 'OpenSans-SemiBold',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default EnterGym;
