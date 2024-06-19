// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const appIcon = require('../../../assets/icons/app_logo.png');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Fpage = () => {
  const [animating, setAnimating] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.navigate('Main');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={appIcon}
        resizeMode={'contain'}
        style={{
          height: (screenWidth - 32) * 346 / 361,
          width: screenWidth - 32,
          bottom: 383,
          position: 'absolute',
          // padding: iconPadding,
        }}
      />
      <View style={styles.textBackground}>
        <Text style={styles.title}>Join us today</Text>
        <Text style={styles.text}>Enter your details to proceed further</Text>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: screenWidth - 32,
            paddingHorizontal: 24,
            paddingVertical: 12,
            height: 53,
            marginTop: 40,
            borderRadius: 80,
            backgroundColor: '#F08080',
          }}
          onPress={() => navigation.navigate('ChooseYourRole')}>
          <Text style={styles.b1_text}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: screenWidth - 32,
            height: 57,
            borderColor: '#F08080',
            borderWidth: 1,
            marginTop: 16,
            borderRadius: 45,
            backgroundColor: 'white',
          }}
          onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.b2_text}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Fpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
  },
  title: {
    color: `#1E1D20`,
    fontSize: 32,
    lineHeight: 44,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 12
  },
  text: {
    color: '#8F8E8F',
    fontSize: 18,
    lineHeight: 25,
    fontFamily: 'OpenSans-Medium',
  },
  b1_text: {
    color: 'white',
    fontSize: 21,
    lineHeight: 28,
    fontFamily: 'OpenSans-SemiBold',
  },
  b2_text: {
    color: '#F08080',
    fontSize: 21,
    lineHeight: 28,
    fontFamily: 'OpenSans-SemiBold',
  },
  textBackground: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 48,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: 383,
    bottom: 0,
    position: 'absolute',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 15,
  },
});
