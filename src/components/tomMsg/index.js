import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MessageTom = ({ children, type }) => {
  const avatarSource = require('../../../assets/icons/tom_ico.png'); 

  return (
    <View style={[styles.container, type ? styles.typeTrue : styles.typeFalse]}>
      <Image source={avatarSource} style={styles.avatar} />
      <Text style={styles.message}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  typeTrue: {
    backgroundColor: '#e0f7fa',
  },
  typeFalse: {
    backgroundColor: '#ffe0b2',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
});

export default MessageTom;
