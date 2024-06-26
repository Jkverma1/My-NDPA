import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = ({ state, style }) => {
  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{ ...styles.container, ...style }}>
      <TouchableOpacity
        style={[styles.tab]}
        onPress={() => {
          if(state ===0)
          handleNavigation('MainPage')
        else{
          handleNavigation('Main')
        }
        }}
      >
        <Image
          source={state === 0 ? require('../../../assets/icons/footer/learn_click.png') : require('../../../assets/icons/footer/learn.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, state === 2 && styles.activeTab]}
        onPress={() => handleNavigation('ChatSection')}
      >
        <Image
          source={state === 1 ? require('../../../assets/icons/footer/chat_click.png') : require('../../../assets/icons/footer/chat.png')} 
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab]}
        onPress={() => {
          if(state ===4)
          handleNavigation('MainPage')
        else{
          handleNavigation('ProfileSection')
        }}}
      >
        <Image
          source={state === 4 ? require("../../../assets/icons/footer/profile_click.png") : require('../../../assets/icons/footer/profile.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeTab: {
    backgroundColor: '#eee', 
  },
  icon: {
    width: 44, 
  },
});

export default Footer;
