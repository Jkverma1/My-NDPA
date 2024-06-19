import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ChatBox = ({ text, handleChangeText, handleSend, messageIcon, mico }) => {
  return (
    <View style={[styles.inputContainer, mico && styles.container]}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleChangeText}
        placeholder="Write here..."
      />
      <TouchableOpacity
        style={[styles.button]}
        onPress={handleSend}
      >
          <Image source={messageIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "auto",
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F08080',
    borderRadius: 64,
    padding: 3,
  },
  container: {
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    fontSize: 16,
    fontFamily: 'Open Sans',
    borderWidth: 0,
    outline: 'none',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 64,
  },
});

export default ChatBox;
