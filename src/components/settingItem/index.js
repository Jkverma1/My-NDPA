import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const right_arrow_ico = require('../../../assets/icons/profile/setting/right_arrow_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SettingItem = ({ icon, text, nav }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(nav)}>
      <View style={styles.boxBackground}>
        <View style={styles.itemContent}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.text}>{text}</Text>
        </View>
        <Image source={right_arrow_ico} />
      </View>
      <View style={styles.underline} />
    </TouchableOpacity>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
  },
  icon: {
    width: 32,
    height: 32,
  },
  boxBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    height: 50,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  underline: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#1E1D2033',
    width: '100%',
  },
});