import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import CountryPickerModal from '../../components/countryPickerModal';
import { useAuth } from '../../contexts/AuthContext';
import { createProfile } from '../../redux/slices/user';

const calend_ico = require('../../../assets/icons/calend_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Completeprofile = () => {
  const { user, users } = useAuth();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pemail, setPemail] = useState('');
  const [date, setDate] = useState(new Date(2024, 4, 23));
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [country, setCountry] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const { message, error } = useSelector(state => state.user);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Signin');
    }
  }, [user, navigation]);

  useEffect(() => {
    async function fetchData() {
      if (isLoading) {
        const userData = {
          fullName: name,
          pEmail: pemail,
          phoneNumber: number,
          country: country,
          bday: formatDate(date),
        };

        try {
          const result = await dispatch(createProfile(userData, user.id));
          if (message.code === 200) {
            setIsLoading(false);
            navigation.navigate('Profiledone');
          }
        } catch (error) {
          console.error('Error during fetch:', error);
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, [
    isLoading,
    name,
    pemail,
    number,
    country,
    date,
    dispatch,
    message,
    navigation,
  ]);

  const handleSave = async () => {
    setIsLoading(true);
    const userData = {
      fullName: name,
      pEmail: pemail,
      phoneNumber: number,
      country: country,
      bday: formatDate(date),
    };
    const result = dispatch(createProfile(userData, user.id));
  };

  const isValidEmailT = email => /\S+@\S+\.\S+/.test(email);

  const isSaveDisabled =
    isLoading ||
    name.trim().length === 0 ||
    pemail.trim().length === 0 ||
    number.trim().length === 0 ||
    country.trim().length === 0 ||
    !isValidEmailT(pemail) ||
    !isValid;

  const closeCountryPickerModal = country => {
    setPickerVisible(false);
    setCountry(country);
  };

  const closeDatePickerModal = () => {
    setOpen(false);
  };

  const validateEmail = text => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(text);
    setIsValidEmail(isValid);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Complete Profile</Text>
        <View style={styles.container_in}>
          <Text style={styles.b0_text}>Full Name</Text>
          <TextInput
            style={[styles.input, styles.validValue]}
            placeholder="Full Name"
            placeholderTextColor="#969596"
            value={name}
            onChangeText={text => setName(text)}
            autoCapitalize="none"
          />

          <Text style={styles.b0_text}>Phone Number</Text>
          <TextInput
            style={[styles.input, styles.validValue]}
            placeholder="Phone Number"
            placeholderTextColor="#969596"
            value={number}
            keyboardType="numeric"
            onChangeText={text => setNumber(text)}
            autoCapitalize="none"
          />

          <Text style={styles.b0_text}>Parents Email</Text>
          <TextInput
            style={[
              styles.input,
              isValidEmail && pemail.length > 0 ? styles.validValue : {},
            ]}
            placeholder="Parents Email"
            placeholderTextColor="#969596"
            value={pemail}
            onChangeText={text => {
              setPemail(text);
              validateEmail(text);
            }}
            autoCapitalize="none"
          />
          {!isValidEmailT(pemail) && pemail.length > 0 && (
            <Text style={styles.errorText}>Invalid email format</Text>
          )}

          <Text style={styles.b0_text}>Date of Birth</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={[
                styles.validValue,
                {
                  borderWidth: 1,
                  borderColor: '#F08080',
                  padding: 10,
                  paddingLeft: 30,
                  marginTop: 15,
                  marginBottom: 10,
                  borderRadius: 40,
                  fontFamily: 'OpenSans-Regular',
                  width: (screenWidth * 9) / 10,
                },
              ]}
              placeholder="dd-mm-yyyy"
              placeholderTextColor="#969596"
              value={formatDate(date)}
              onFocus={() => setOpen(true)}
              editable={false}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                marginLeft: (screenWidth * 8) / 10,
                marginTop: 15,
              }}
              onPress={() => setOpen(true)}
            >
              <Image source={calend_ico} style={{ marginTop: 9 }} />
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              onConfirm={date => {
                setDate(date);
                setOpen(false);
              }}
              onCancel={closeDatePickerModal}
            />
          </View>
          <Text style={styles.b0_text}>Country</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={[
                styles.validValue,
                {
                  borderWidth: 1,
                  borderColor: '#F08080',
                  padding: 10,
                  paddingLeft: 30,
                  marginTop: 15,
                  marginBottom: 10,
                  borderRadius: 40,
                  fontFamily: 'OpenSans-Regular',
                  width: (screenWidth * 9) / 10,
                },
              ]}
              placeholder="Country"
              placeholderTextColor="#969596"
              value={country}
              onChangeText={text => setCountry(text)}
              onFocus={() => setPickerVisible(true)}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                marginLeft: (screenWidth * 8) / 10,
              }}
              onPress={() => setPickerVisible(true)}
            >
              <Image
                source={require('../../../assets/icons/narrow_ico.png')}
                style={{ marginTop: 9 }}
              />
            </TouchableOpacity>
            <View style={{ width: 0, height: 0, overflow: 'hidden' }}>
              <CountryPickerModal
                visible={pickerVisible}
                onClose={closeCountryPickerModal}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: (screenWidth * 9) / 10,
            height: 57,
            marginTop: 40,
            borderRadius: 45,
            backgroundColor: '#F08080',
            opacity: isSaveDisabled ? 0.5 : 1,
          }}
          onPress={handleSave}
          disabled={isSaveDisabled}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.b3_text}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Completeprofile;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 80,
  },
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
    letterSpacing: -2,
    marginTop: screenHeight / 20,
    fontFamily: 'OpenSans-Bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    padding: 10,
    paddingLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
  },
  validValue: {
    color: '#F08080',
  },
  b0_text: {
    marginTop: screenHeight / 30,
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
  },
  b2_text: {
    marginTop: 5,
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
  },
  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
