import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('Private');
  const dummyChats = [
    { profile: require('../../../assets/icons/dummy_profile.png'), title: 'John Doe', lastMessage: 'Hello, how are you?', time: '10:30 AM' },
    { profile: require('../../../assets/icons/dummy_profile.png'), title: 'Jane Smith', lastMessage: 'I am good, thanks!', time: '11:00 AM' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
            <Header
        visible={true}
        text={'Chats'}
        styleName={styles.headerText}
      />
      <View style={styles.searchContainer}>
        <Image source={require('../../../assets/icons/mdi_magnify.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search"
          placeholderTextColor="#1E1D2080"
        />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Private' && styles.activeTab]}
          onPress={() => setActiveTab('Private')}
        >
          <Text style={[styles.tabText, activeTab === 'Private' && styles.activeTabText]}>Private</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Communities' && styles.activeTab]}
          onPress={() => setActiveTab('Communities')}
        >
          <Text style={[styles.tabText, activeTab === 'Communities' && styles.activeTabText]}>Communities</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.chatContainer}>
        {dummyChats.map((chat, index) => (
          <View key={index} style={styles.chatBox}>
            <Image source={chat.profile} style={styles.profileImage} />
            <View style={styles.chatContent}>
              <Text style={styles.title}>{chat.title}</Text>
              <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
            </View>
            <Text style={styles.time}>{chat.time}</Text>
          </View>
        ))}
      </ScrollView>
      <Footer/>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF8', 
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E1D2080',
    height: 40,
    borderRadius: 64,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Open Sans',
    borderWidth: 0,
    outline: 'none',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    columnGap:10,
    marginTop: 10,
  },
  tab: {
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21.79,
    color: '#1E1D2080',
  },
  activeTab: {
    borderBottomColor: '#F08080',
  },
  activeTabText: {
    color: '#F08080',
  },
  chatContainer: {
    flex: 1,
    marginTop: 10,
  },
  chatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24.51,
    textAlign: 'left',
    color: 'black',
  },
  lastMessage: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 21.79,
    textAlign: 'left',
    color: '#1E1D20B2',
  },
  time: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.07,
    textAlign: 'left',
    color: '#1E1D20B2',
  },
});

export default ChatScreen;
