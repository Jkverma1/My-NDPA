import React, {useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import Header from '../../../components/header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const lucide_scan = require('../../../../assets/icons/profile/setting/lucide_scan.png');
const passport_ico = require('../../../../assets/icons/profile/setting/passport_ico.png');

const IdVerificationPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const [click, setClick] = useState(false);

  const handleStart = () => {
    setClick(true);
  };

  const handleClickOk = () => {
    navigation.navigate('IdVerificationList');
  };

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'ID Verification'}
        color={'white'}
        editable={false}
      />
      <View style={styles.container_in}>
        {click ? (
          <>
            <Image source={success ? passport_ico : lucide_scan} />
            <Text style={styles.text}>Use your phone to scan passport</Text>
            <TouchableOpacity style={styles.button} onPress={handleClickOk}>
              <Text style={styles.b3_text}>Scan</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Image source={success ? passport_ico : lucide_scan} />
            <Text style={styles.text}>Use your phone to scan passport</Text>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.b3_text}>Start</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default IdVerificationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    height: screenHeight,
  },
  container_in: {
    width: (screenWidth * 9) / 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: -200,
  },
  text: {
    marginTop: 20,
    textAlign: 'left',
    color: '#8f8e8f',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },
  b2_text: {
    marginTop: 20,
    color: '#F08080',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  camera: {
    width: 300,
    height: 400,
    borderRadius: 20,
    overflow: 'hidden',
  },
  preview: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 286,
    height: 57,
    marginTop: 51,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
});
