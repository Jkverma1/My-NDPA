// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAuth} from '../../contexts/AuthContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const appIcon = require('../../../assets/icons/mail_ico.png');

const Verifyemail = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const {checkCode, isCheckCode, email, resend} = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isVerifyButtonEnabled, setIsVerifyButtonEnabled] = useState(false);
  
  const route = useRoute();
  const  nextScreen  = route.params?.nextScreen;
  const navigation = useNavigation();

  
  
  const handleTextChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (newCode.every(digit => digit.length === 1)) {
      setIsVerifyButtonEnabled(true);
    } else {
      setIsVerifyButtonEnabled(false);
    }

    if (text && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
    if (!text && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleCheck = async () => {
    try {
      setIsLoading(true);
      
      setIsVerifyButtonEnabled(false);
      const codeNumber = parseInt(code.join(''), 10);
      await checkCode(email, codeNumber);
      
      setIsLoading(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      setIsLoading(false);
      setIsVerifyButtonEnabled(true);
    }
  };

  const handleResend = async () => {
    try {
      setIsLoading(true);
      await resend(email);
      setIsLoading(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isCheckCode) {
      navigation.navigate(nextScreen);
    }
  }, [isCheckCode, navigation, nextScreen]);

  return (
    <View style={styles.container}>
      <Image
        source={appIcon}
        resizeMode={'contain'}
        style={{
          height: 180,
          width: 180,
        }}
      />
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.text}>Please enter the 4-digit code sent to</Text>
      <Text style={styles.b1_text}>{email}</Text>
      <View style={styles.container_in}>
        {Array.from({length: 4}).map((_, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={text => handleTextChange(text, index)}
            value={code[index]}
          />
        ))}
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          marginTop: 51,
          borderRadius: 45,
          backgroundColor: isVerifyButtonEnabled || isLoading ? '#F08080' : "#1E1D201A",
        }}
        onPress={handleCheck}
        disabled={!isVerifyButtonEnabled || isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={[styles.b3_text, { color: isVerifyButtonEnabled || isLoading ? '#FFFFFF' : '#1E1D2080' }]}>Verify</Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Text style={styles.b4_text}>Didn`t receive a code? </Text>
        <TouchableOpacity onPress={handleResend} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.b5_text}> Resend Code</Text>
              <View style={styles.underline} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verifyemail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: screenHeight,
  },
  container_in: {
    gap: 24,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: (screenWidth * 9) / 10,
    backgroundColor: 'white',
    marginTop: 40,
  },
  title: {
    marginTop: 25,
    letterSpacing: -1,
    color: '#F08080',
    fontSize: 32,
    fontFamily: 'OpenSans-Bold',
  },
  text: {
    paddingTop: 20,
    color: '#8F8E8F',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BBBBBC',
    width: 46,
    height: 46,
    paddingLeft: 18,
    borderRadius: 5,
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
  },
  b1_text: {
    marginTop: 5,
    color: '#F08080',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },

  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b4_text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  b5_text: {
    color: '#F08080',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  underline: {
    height: 2,
    backgroundColor: '#F08080',
    width: '100%',
  },
});
