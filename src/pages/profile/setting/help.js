import 'react-native-gesture-handler';

// Import React and Component
import React, {useState} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Linking
} from 'react-native';

import Header from '../../../components/header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const drop_arrow_ico = require('../../../../assets/icons/profile/setting/drop_arrow_ico.png');
const up_arrow_ico = require('../../../../assets/icons/profile/setting/up_arrow_ico.png');

const reviewData =
  'We are here to help you with anything and \neverything on my NDPA';
const generalData = [
  {text: 'Why is My NDPA catered towards?', value: 'My NDPA, at this stage is focused on engaging with neurodiverse individuals that are specifically ADHD or Autistic and high functioning. This will fuel app development and ensure a valued product, where we will then be able to cater towards a broader range of functionalities within neurodiversity.'},
  {
    text: 'What are the main features of My NDPA?',
    value: 'Speech and communication: focuses on key self-awareness and approaches to tackling wellbeing and crisis prevention. Creative outlet: Serves as a safe space to interact with posts that are created by like-minded individuals. This section will also allow individuals to explore their creative abilities and use AI to fuel and bring their imagination to life. Travel independence: Is cultivated with improved UI and UX design which at this stage is primarily served via google satellite images of where users are located.',
  },
  {
    text: 'Where can you access My NDPA?',
    value: 'By downloading our App on the App Store or Google Play Store from the end of June which is when our full App will become available to the public.',
  },
  {
    text: 'How does My NDPA ensure my data/personal information is protected?',
    value: <>My NDPA Abides by GDPR (Global Data Protection) by using security assured by Microsoft Azure. We do not sell data and ensure absolute privacy with this app, with high security measures in place – to cater to the needs of both parents and teens. Please see our privacy policy <TouchableOpacity onPress={()=> {Linking.openURL('https://myndpa.co.uk/privacy-policy/');}}><Text style={{color: '#F08080',fontSize: 16, textDecorationLine: "underline"}}>here</Text></TouchableOpacity></>,
  },
];

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HelpPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedIndex === index) {
      setExpandedIndex(null); 
    } else {
      setExpandedIndex(index); 
    }
  };
  return (
    <View style={styles.container}>
      <Header visible={true} text={'Help'} color={'white'} editalbe={false} />
      <ScrollView>
        <View style={styles.container_s}>
          <Text style={styles.text}>{reviewData}</Text>
          <Text style={styles.titleText}>FAQs</Text>
          {generalData.map((row, rowIndex) => (
            <View key={rowIndex}>
              <View style={styles.boxBackground}>
                <View style={{flexDirection: 'column', gap: 10}}>
                  <TouchableOpacity
                    style={[styles.row]}
                    onPress={() => toggleExpand(rowIndex)}>
                    <Text style={styles.title}>{row.text}</Text>
                    {expandedIndex === rowIndex ? (
                      <Image source={up_arrow_ico} />
                    ) : (
                      <Image source={drop_arrow_ico} />
                    )}
                  </TouchableOpacity>
                  {expandedIndex === rowIndex && (
                    <View style={styles.body}>
                      <Text style={styles.content}>{row.value}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.underline} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpPage;

const styles = StyleSheet.create({
  container_s: {
    marginTop: 25,
    gap: 20,
    marginBottom: 100,
  },

  container: {
    flex: 1,
    height: screenHeight,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  title: {
    color: '#F08080',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    paddingBottom: 14,
    maxWidth: screenWidth *8 /10
    // textAlign: 'left',
  },
  titleText:{
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
  },
  content: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '400',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '400',
    // textAlign: 'left',
  },
  icon: {
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  body: {
    padding: 10,
    paddingTop: 0,
  },
  boxBackground: {
    width: (screenWidth * 9) / 10,
    // height: 50,
    marginTop: 10,
    textAlign: 'left',
  },

  underline: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#1E1D2033',
    width: '100%',
    // marginTop: 1,
  },
});
