import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Footer from '../../../components/footer';
import RoadMap from './roadmap';

const intro_ico = require('../../../../assets/icons/h_icon.png');
const chatbot_ico = require('../../../../assets/icons/chatbot_ico.png');

const StartChoiceSection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      scrollEventThrottle={16} 
    >
      <View style={styles.innerContainer}>
        <View style={styles.topBox}>
          <Image source={intro_ico} />
          <Text style={styles.title}>Let’s improve your{'\n'}communication skills!</Text>
        </View>
        <View style={styles.secondBox}>
          <Image source={chatbot_ico} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.secondBoxText}>Use our Chatbot!</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ChatbotSection')}>
              <Text style={styles.buttonText}>Go!</Text>
            </TouchableOpacity>
          </View>
        </View>
        <RoadMap screen={"profile"} />
      </View>
    </ScrollView>
    <Footer state={0} />
  </View>
  );
};

export default StartChoiceSection;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#FFFBF8',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, 
  },
  innerContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 71,
  },
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFDAB980',
    borderRadius: 10,
    height: 100,
    width: '100%',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    lineHeight: 24.51,
    textAlign: 'left',
    marginLeft: 16,
  },
  secondBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8AD9D',
    columnGap: 48,
    borderRadius: 10,
    marginTop: 24,
    padding: 16,
    height: 100,
    width: '100%',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  secondBoxText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    lineHeight: 24.51,
  },
  button: {
    marginTop: 8,
    maxWidth: 152,
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#F08080',
    height: 38,
  },
  buttonText: {
    color: '#F08080',
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    lineHeight: 21.79,
    textAlign: 'center',
  },
});
