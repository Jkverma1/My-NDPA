import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
const personalId_road = require('../../../../assets/icons/learn/personalId_road.png')

const RoadMap = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles.road} source={personalId_road} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EnterCafe')}>
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
