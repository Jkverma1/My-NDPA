import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {BlurView} from '@react-native-community/blur';

import {useNavigation} from '@react-navigation/native';

const dismissButtonImage = require('../../../assets/icons/learn/personal_identity/dismiss_button.png');

// props.visible, props.icon, props.text
const CommunicationModal = props => {
  const [isVisible, setIsVisible] = useState(props.visible);
  const navigation = useNavigation();

  return (
    <Modal isVisible={isVisible} animationType="slide">
      <View style={styles.overlay}>
        <BlurView
          style={[
            styles.blurView,
            {backgroundColor: 'rgba(255, 218, 185, 0.4)'},
          ]}
          blurType="light"
          blurAmount={3}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.dismissButton}
            onPress={() => {
              setIsVisible(false);
              navigation.goBack();
            }}
          >
            <Image source={dismissButtonImage} />
          </TouchableOpacity>
          <Image source={props.icon} style={styles.icon} />
          <Text style={styles.text}>{props.text}</Text>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => {
              setIsVisible(false);
              if (props.action != null) props.action();
            }}
          >
            <Text style={styles.startButton}>Let's Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    width: 72,
    height: 72,
    marginTop: 4,
    marginBottom: 16,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    color: '#1E1D20',
  },
  startButton: {
    backgroundColor: '#F08080',
    color: '#FFF',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 21,
    lineHeight: 28,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 80,
    marginTop: 20,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  dismissButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 24,
    width: 24,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    backgroundColor: '#FFDAB966',
    justifyContent: 'center',
    background:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(255, 218, 185, 0.4), rgba(255, 218, 185, 0.4))',
  },
});

export default CommunicationModal;
