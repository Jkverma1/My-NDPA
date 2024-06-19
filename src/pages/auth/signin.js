import 'react-native-gesture-handler';

// Import React and hooks
import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import {useAuth} from '../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { retrieveUserSettings } from '../../redux/slices/settings';
import { retrieveChatBotTopics } from '../../redux/slices/chatbot';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Signin = () => {
  const {login, isAuthenticated, user, msg} = useAuth();

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState('');

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handlePress = () => {
    console.log('Apple icon clicked!');
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setReason('');
      if (email.length === 0) {
        setIsLoading(false);
        setReason('Please enter email.');
        return;
      }
      if (password.length === 0) {
        setIsLoading(false);
        setReason('Password cannot be empty.');
        return;
      }
      await login(email, password);
      setIsLoading(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(!isAuthenticated);
    if (isAuthenticated) {
      dispatch(retrieveChatBotTopics());
      console.log(`user?.parentEmail: ${user?.parentEmail}`)
        let destination = 'Main';
        if(user?.parentEmail === null || user?.parentEmail === undefined) {
          destination = 'Cprofile';
        }
        navigation.navigate(destination);
    }
  
    //fetchData();
  }, [isAuthenticated, user, navigation]);

  const isValidEmailT = email => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateEmail = text => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(text);
    setIsValidEmail(isValid);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.text}>Enter your details to proceed further</Text>
      <View style={styles.container_in}>
        <Text style={styles.b1_text}>Email</Text>
        <TextInput
          style={[
            styles.input,
            isValidEmail && email.length > 0 ? styles.validEmail : {},
          ]}
          placeholder="Enter email"
          placeholderTextColor="#969596"
          value={email}
          onChangeText={email => {
            setEmail(email);
            validateEmail(email); // Validate email whenever the text changes
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {!isValidEmailT(email) && email.length > 0 && (
          <Text style={styles.errorText}>Invalid email format</Text>
        )}

        <Text style={styles.b1_text}>Password</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#F08080',
              paddingLeft: 18,
              borderRadius: 40,
              fontSize: 16,
              lineHeight: 22,
              fontFamily: 'OpenSans-Regular',
              width: (screenWidth * 9) / 10,
              height: 43,
              color: '#F08080'
            }}
            placeholder="Password"
            placeholderTextColor="#969596"
            value={password}
            onChangeText={password => setPassword(password)}
            secureTextEntry={!isPasswordVisible} // Toggle between true/false based on isPasswordVisible
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              marginLeft: (screenWidth * 8) / 10,
            }}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <Image
                source={require('../../../assets/icons/eye_show.png')}
                style={{justifyContent: 'center'}}
              />
            ) : (
              <Image
                source={require('../../../assets/icons/eye_off.png')}
                style={{justifyContent: 'center'}}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Resetpwd')}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Text style={styles.b2_text}>Forgot Password?</Text>
        </TouchableOpacity>
       {!isLoading && <Text style={styles.errorText}>{reason}</Text>}
       {!isAuthenticated && <Text style={styles.errorText}>{msg}</Text>} 
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: (screenWidth * 9) / 10,
          height: 53,
          marginTop: 10,
          marginBottom: 56,
          borderRadius: 45,
          backgroundColor: '#F08080',
        }}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.b3_text}>Sign In</Text>
        )}
      </TouchableOpacity>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>
      <View style={styles.social}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../../../assets/icons/google_ico.png')}
            style={{width: 56, height: 56}} // Adjust the size as needed
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../../../assets/icons/face_ico.png')}
            style={{width: 56, height: 56}} // Adjust the size as needed
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../../../assets/icons/apple_ico.png')}
            style={{width: 56, height: 56}} // Adjust the size as needed
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={styles.b4_text}>Don`t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.b5_text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    height: screenHeight,
  },
  container_in: {
    width: (screenWidth * 9) / 10,
    backgroundColor: 'white',
  },
  title: {
    color: '#F08080',
    fontSize: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 53,
    fontFamily: 'OpenSans-Bold',
  },
  text: {
    paddingTop: 10,
    color: '#8F8E8F',
    fontSize: 16,
    fontFamily: 'OpenSans-Normal',
  },
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    paddingLeft: 18,
    borderRadius: 40,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'OpenSans-Regular',
    height: 43
  },
  b1_text: {
    marginTop: 30,
    color: '#F08080',
    fontSize: 14,
    lineHeight: 19,
    paddingVertical: 3,
    fontFamily: 'OpenSans-SemiBold',
  },
  b2_text: {
    marginTop: 4,
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    textDecorationLine: 'underline',
  },
  b3_text: {
    color: 'white',
    fontSize: 21,
    lineHeight: 28,
    fontFamily: 'OpenSans-SemiBold',
  },
  b4_text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Normal',
  },
  b5_text: {
    color: '#F08080',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    textDecorationLine: 'underline',
  },
  underline: {
    height: 2,
    backgroundColor: '#F08080',
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  validEmail: {
    color: '#F08080', // Change text color to red when email is valid
  },
  dividerContainer: {
    width: (screenWidth * 9) / 10,
    justifyContent: 'space-between',
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    marginBottom: 24, // Add some vertical margin
  },
  social: {
    width: (screenWidth * 2.3) / 5,
    gap: 13,
    justifyContent: 'space-between',
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    marginBottom: 46,
  },
  dividerLine: {
    flex: 1, // Take up equal space
    height: 1, // 1 pixel high line
    backgroundColor: '#F08080', // Line color
  },
  dividerText: {
    marginHorizontal: 10, // Add horizontal margin around the text
    color: '#1E1D20',
    fontSize: 18,
    fontFamily: 'OpenSans-Normal',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    height: 18,
    marginBottom: 10,
  },
});
