import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/header';
const pageTitle = 'My NDPA Privacy Notice';
const updateTitle = 'Last updated: 16 May 2024';
const LatestUpdate =
  'Welcome to My NDPA’s Privacy Notice. This Privacy Notice tells you everything that you need to know about how we collect, use and disclose your “Personal Data” when you interact with us, whether through our website, application or otherwise. We have capitalised the first letter of certain terms and provided an explanation for them in section 2 below.';
const generalData = [
  { text: 'What information do we collect about you?', value: 'Status' },
  { text: 'How do we use your information?', value: 'How do we use your information?' },
  { text: 'To whom we disclose your information?', value: 'To whom we disclose your information?' },
  { text: 'What do we do to keep your information secure?', value: 'What do we do to keep your information secure?' },
  { text: 'Cookies and geo tracking', value: 'Cookies and geo tracking' },
];

const PrivacyPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);

  return (
    <View style={styles.safeArea}>
      <Header
        visible={true}
        text={'Privacy Policy'}
        color={'white'}
        editalbe={false} // Typo: should be editable instead of editalbe
        setEdit={setEditMode}
      />
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.pageTitle}>{pageTitle}</Text>
          <Text style={styles.updateTitle}>{updateTitle}</Text>
          <Text style={styles.text}>{LatestUpdate}</Text>
          {generalData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{row.text}</Text>
              <Text style={styles.sectionText}>{row.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    marginTop: 25,
    marginBottom: 20,
  },
  pageTitle: {
    color: '#F08080',
    fontFamily: 'OpenSans-Medium',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  updateTitle: {
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    marginBottom: 5,
  },
  sectionText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
  },
});

export default PrivacyPage;
