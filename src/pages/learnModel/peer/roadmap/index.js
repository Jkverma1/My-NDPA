import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
const peer_road = require('../../../../../assets/icons/learn/peer/peer_road.png')

const RoadMap = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles.road} source={peer_road} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PeerProcessSection', { move: false , part: 1 })}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoadMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 24,
    borderRadius: 10,
    position: 'relative',
  },
  road: {
    position: "relative",
    zIndex:-1,
    top: -70
  },
  button: {
    position: 'absolute',
    top: 105,
    backgroundColor: '#F08080',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21.79,
    textAlign: 'center',
  },
});
