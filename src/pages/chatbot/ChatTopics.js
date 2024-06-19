import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/header';
const chat_ico = require('../../../assets/icons/mdi_chat-plus.png');

const screenWidth = Dimensions.get('window').width;

const ChatTopics = () => {
  const navigation = useNavigation();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(
          'http://172.174.247.52:5000/chatbot/retrievetopics',
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setTopics(response.data.topics);
      } catch (error) {
        console.error('Failed to fetch topics', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header visible={true} text="Chatbot" color="#FFF" editable={true} />
      <ScrollView style={styles.container_list}>
        <View style={styles.container_s}>
          {topics.map((row, rowIndex) => (
            <TouchableOpacity
              key={rowIndex}
              onPress={() =>
                navigation.navigate('ChatScreen', { topicId: row.id, topicTitle: row.title })
              }
            >
              <View style={styles.boxBackground}>
                <View style={styles.col}>
                  <Text style={styles.text}>{row.title}</Text>
                  <Text style={styles.subText}>{row.description}</Text>
                </View>
                <Image source={chat_ico} style={styles.icon} />
              </View>
              <View style={styles.underline} />
            </TouchableOpacity>
          ))}
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
    alignItems: 'start',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    height: 'auto',
    paddingBottom: 10,
  },
  col: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 25,
    width: 300,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Medium',
  },
  subText: {
    color: 'black',
    fontSize: 16,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatTopics;
