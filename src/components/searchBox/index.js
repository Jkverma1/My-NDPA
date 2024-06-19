import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SearchBox = ({ text, handleChangeText, messageIcon, bottom }) => {
  return (
    <View style={[styles.container, { marginBottom: bottom }]}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleChangeText}
        placeholder="Search..."
      />
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={messageIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default SearchBox;
