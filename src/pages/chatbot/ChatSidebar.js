import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header';
import MoveDialog from '../../components/moveDialog';

const right_arrow_ico = require('../../../assets/icons/profile/setting/right_arrow_ico.png');
const chat_ico = require('../../../assets/icons/mdi_chat-plus.png');
const topic_list = require('../../../assets/icons/mdi_format-list-text.png');
const stop_ico = require('../../../assets/icons/mdi_close-octagon-outline.png');
const out_ico = require('../../../assets/icons/profile/setting/out_ico.png');

const screenWidth = Dimensions.get('window').width;

const ChatSidebar = ({ onClose }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleClick = () => {
    setModalVisible(true);
  };

  const handleClickMove = () => {
    navigation.navigate('ChatScreen', { stop: true });
  };

  const handleClickSkip = () => {
    setModalVisible(false);
  };

  const boxData = [
    { icon: chat_ico, text: 'New Chat', nav: 'ChatScreen' },
    { icon: topic_list, text: 'List of Topics', nav: 'ChatTopics' },
  ];

  return (
    <View style={styles.container}>
      <MoveDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        handleClickSkip={handleClickSkip}
        text="Are you sure you want to stop chatbot?"
        icon={out_ico}
      />
      <Header visible={true} text="Chatbot" color="#FFF" editable={true} />
      <ScrollView style={styles.container_list}>
        <View style={styles.container_s}>
          {boxData.map((row, rowIndex) => (
            <TouchableOpacity
              key={rowIndex}
              onPress={() => navigation.navigate(row.nav)}
            >
              <View style={styles.boxBackground}>
                <View style={styles.row}>
                  <Image source={row.icon} style={styles.icon} />
                  <Text style={styles.text}>{row.text}</Text>
                </View>
                <Image source={right_arrow_ico} />
              </View>
              <View style={styles.underline} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={handleClick}>
            <View style={styles.boxBackground}>
              <View style={styles.row}>
                <Image source={stop_ico} style={styles.icon} />
                <Text style={styles.text}>Stop the Chatbot</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container_list: {
    padding: 20,
  },
  container_s: {
    marginTop: 25,
    gap: 20,
    marginBottom: 100,
  },
  boxBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
  },
  icon: {
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  underline: {
    height: 1,
    backgroundColor: '#E5E5E5',
    width: '100%',
  },
});

export default ChatSidebar;
