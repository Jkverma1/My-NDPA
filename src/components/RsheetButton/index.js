import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const RsheetButton = ({ image, navigate, bgcolor, bocolor, locationaddress, text, type }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgcolor, borderColor: bocolor }]}
      onPress={() => navigate && navigation.navigate(navigate)}
    >
      <Image source={image} style={styles.image} />
      <Text style={[styles.text, { color: type ? '#FFFFFF' : '#000000' }]}>{text}</Text>
      {locationaddress && <Text style={styles.locationAddress}>{locationaddress}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationAddress: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});

export default RsheetButton;
