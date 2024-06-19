import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const me_icon = require('../../../assets/icons/me.png');

const screenWidth = Dimensions.get('window').width;

const MyMessage = ({ sendClick, text }) => {
  if (!sendClick) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={me_icon} style={styles.icon} />
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  messageBox: {
    maxWidth: screenWidth * 0.7,
    padding: 10,
    backgroundColor: '#DCF8C6',
    borderRadius: 10,
    borderTopRightRadius: 0,
  },
  messageText: {
    color: '#000',
  },
});

export default MyMessage;
