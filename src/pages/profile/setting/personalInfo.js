import 'react-native-gesture-handler';

// Import React and Component
import React, { useState, useEffect, useRef } from 'react';

import { useAuth } from '../../../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import { RNCamera } from 'react-native-camera';

import Header from '../../../components/header';
import CalendarModal from '../../../components/calendaModal';

import { updateUserInfo, getUserInfo } from '../../../redux/slices/user';

const calend_ico = require('../../../../assets/icons/calend_ico.png');
const narrow_ico = require('../../../../assets/icons/narrow_ico.png');
const profileIco = require('../../../../assets/icons/profile/sample.png');
const cameraIco = require('../../../../assets/icons/profile/mdi_camera.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PersonalInfoPage = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cameraRef = useRef(null);

  const [house, setHouse] = useState('e.g, 113');
  const [zip, setZip] = useState('00000');
  const [date, setDate] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    avatarUrl: null,
    fullName: user?.fullName,
    birthday: user?.birthday?.substring(0, 10),
    individualDifferences: 'Individual Differences',
    phoneNumber: user?.phoneNumber,
    userEmail: user?.userEmail,
    parentEmail: user?.parentEmail,
    city: "city",
    street: 'street',
  });
  const [pickerVisible, setPickerVisible] = useState(false);
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { up_message, error, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoading) {
      const userData = {
        formData: formData,
        country: country,
        house: house,
        zip: zip,
      };
      dispatch(updateUserInfo(userData, user?.id));
    } else {
      dispatch(getUserInfo(user?.id));
    }
  }, [isLoading]);

  useEffect(() => {
    if (up_message?.code === 200 || error) {
      setIsLoading(false);
      setEditMode(false);
    }
  }, [up_message, error]);

  const handleSave = () => {
    setIsLoading(true);
  };

  const handleImageCapture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);

        if (data.uri) {
          setFormData({
            ...formData,
            image: data.uri,
          });
        }
      } catch (error) {
        console.error('Error capturing image: ', error);
        Alert.alert('Error', 'Failed to capture image. Please try again.');
      }
    }
  };

  const handleChange = (text, key) => {
    setFormData((prev) => ({ ...prev, [key]: text }));
  };

  const validateDate = (inputDate) => {
    const datePattern = /^(19|20)\d{2}-((0[1-9]|1[0-2]))-((0[1-9]|[12][0-9]|3[01]))$/;
    return datePattern.test(inputDate);
  };

  const handleDateChange = (inputDate) => {
    if (validateDate(inputDate)) {
      setDate(inputDate);
    } else {
      console.warn('Invalid date format');
    }
  };

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country.name);
    setPickerVisible(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderInputField = (row, isEditable) => {
    if (!isEditable) return <Text style={styles.text}>{row.value}</Text>;

    switch (row.key) {
      case 'birthday':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder={row.value}
              placeholderTextColor="#F08080"
              value={date}
              onChangeText={handleDateChange}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.calendarIcon}
              onPress={() => setOpen(true)}
            >
              <Image source={calend_ico} />
            </TouchableOpacity>
            <CalendarModal
              visible={open}
              onClose={handleClose}
              onDateSelected={handleDateChange}
            />
          </>
        );
      case 'country':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder={row.value}
              placeholderTextColor="#F08080"
              value={country}
              onChangeText={(text) => setCountry(text)}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.narrowIconContainer}
              onPress={() => setPickerVisible(true)}
            >
              <Image source={narrow_ico} />
            </TouchableOpacity>
            <Modal visible={pickerVisible} animationType="slide">
              <CountryPicker
                withFilter
                countryCode={countryCode}
                withFlag
                withCountryNameButton
                withAlphaFilter
                withCallingCode
                withEmoji
                onSelect={onSelect}
              />
              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => setPickerVisible(false)}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </Modal>
          </>
        );
      default:
        return (
          <TextInput
            style={styles.input}
            placeholder={row.value}
            placeholderTextColor="#F08080"
            value={formData[row.key]}
            onChangeText={(text) => handleChange(text, row.key)}
            autoCapitalize="none"
          />
        );
    }
  };

  const renderDataSection = (title, data) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((row, rowIndex) => (
        <View style={styles.boxBackground} key={rowIndex}>
          <View style={styles.fieldContainer}>
            <Text style={styles.title}>{row.text}</Text>
            {renderInputField(row, editMode)}
            {!editMode && <View style={styles.underline} />}
          </View>
        </View>
      ))}
    </View>
  );

  const generalData = [
    { text: 'Full Name', value: user?.fullName, key: 'fullName' },
    { text: 'Date of Birth', value: user?.birthday?.substring(0, 10), key: 'birthday' },
    { text: 'Individual Differences', value: 'Individual Differences', key: 'individualDifferences' },
  ];

  const contactData = [
    { text: 'Phone Number', value: user?.phoneNumber, key: 'phoneNumber' },
    { text: 'Email', value: user?.userEmail, key: 'userEmail' },
    { text: 'Parents Email', value: user?.parentEmail, key: 'parentEmail' },
  ];

  const addressData = [
    { text: 'Country', value: user?.country, key: 'country' },
    { text: 'City', value: 'City', key: 'city' },
    { text: 'Street', value: 'Street', key: 'street' },
  ];

  return (
  <SafeAreaView style={styles.safeArea}>
      <Header
        visible={true}
        text={'Personal Information'}
        color={'white'}
        editMode
        setEdit={setEditMode}
      />
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.centerContainer}>
          {editMode ? (
            <View style={styles.editableAvatar}>
              <Image
                source={profileIco}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraIcon} onPress={handleImageCapture}>
                <Image
                  source={cameraIco}
                  style={styles.cameraImage}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Image
              source={profileIco}
              style={styles.avatar}
            />
          )}
        </View>

        {renderDataSection('General', generalData)}
        {renderDataSection('Contacts', contactData)}
        {renderDataSection('Address', addressData)}

        {editMode && (
          <>
            <View style={styles.boxBackground}>
              <View style={styles.fieldContainer}>
                <Text style={styles.title}>House</Text>
                <TextInput
                  style={styles.input}
                  placeholder={user?.house}
                  placeholderTextColor="#F08080"
                  value={house}
                  onChangeText={(text) => setHouse(text)}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.underline} />
            </View>
            <View style={styles.boxBackground}>
              <View style={styles.fieldContainer}>
                <Text style={styles.title}>Zip</Text>
                <TextInput
                  style={styles.input}
                  placeholder={user?.zip}
                  placeholderTextColor="#F08080"
                  value={zip}
                  onChangeText={(text) => setZip(text)}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.underline} />
            </View>
          </>
        )}
      </ScrollView>
      {editMode && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.saveText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  centerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  editableAvatar: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
  },
  cameraImage: {
    width: 30,
    height: 30,
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 35,
  },
  text: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#F08080',
    fontWeight: '500',
  },
  boxBackground: {
    marginVertical: 10,
  },
  fieldContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 45,
    marginTop: 5,
    backgroundColor: 'white',
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  saveButton: {
    padding: 15,
    marginBottom: 30,
    backgroundColor: '#F08080',
    border: "1px solid #F08080",
    borderRadius: 80,
    width: "100%"
  },
  saveText: {
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calendarIcon: {
    position: 'absolute',
    top: 43,
    right: 10,
  },
  narrowIconContainer: {
    position: 'absolute',
    top: 43,
    right: 10,
  },
});

export default PersonalInfoPage;
