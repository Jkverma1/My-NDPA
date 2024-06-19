import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DirectionBox = ({ streetName, image }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{streetName}</Text>
      <Image source={image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default DirectionBox;
