import React, { useState } from 'react';
import { Image, View, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../../../components/header';
import MoveDialog from '../../../components/moveDialog';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import SettingItem from '../../../components/settingItem';

const boxData = [
  { icon: require('../../../../assets/icons/profile/setting/account_ico.png'), text: 'Personal Information', nav: 'PersonalInfoPage' },
  { icon: require('../../../../assets/icons/profile/setting/passport.png'), text: 'SEN Passport', nav: 'SENPassportPage' },
  { icon: require('../../../../assets/icons/profile/setting/lock_ico.png'), text: 'Change Password', nav: 'ChangePwdPage' },
  { icon: require('../../../../assets/icons/profile/setting/id_card.png'), text: 'ID Verification', nav: 'IdVerificationPage' },
  { icon: require('../../../../assets/icons/profile/setting/sand_clock.png'), text: 'Time support', nav: 'TimeSupportPage' },
  { icon: require('../../../../assets/icons/profile/setting/perimeter_ico.png'), text: 'Perimeter safety', nav: '' },
  { icon: require('../../../../assets/icons/profile/setting/card.png'), text: 'Payment details', nav: '' },
  { icon: require('../../../../assets/icons/profile/setting/notification_ico.png'), text: 'Notifications', nav: 'NotificationPage' },
  { icon: require('../../../../assets/icons/profile/setting/mdi_book-lock-outline.png'), text: 'Privacy policy', nav: 'PrivacyPage' },
  { icon: require('../../../../assets/icons/profile/setting/docum_ico.png'), text: 'Terms and Conditions', nav: 'TermsPage' },
  { icon: require('../../../../assets/icons/profile/setting/help_ico.png'), text: 'Help', nav: 'HelpPage' },
  { icon: require('../../../../assets/icons/profile/setting/mdi_web.png'), text: 'Language & Country', nav: 'LanguagePage' },
];

const SettingPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigation = useNavigation()

  const handleClick = async () => {
    try {
      setModalVisible(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleClickSkip = async () => {
    try {
      navigation.goBack();
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleClickMove = async () => {
    try {
      setModalVisible(false);
      navigation.navigate('Signin');
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MoveDialog
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleClick={handleClickMove}
          handleClickSkip={handleClickSkip}
          text="Are you sure want to log out?"
          icon={require('../../../../assets/icons/profile/setting/out_ico.png')}
          visible={false}
          type={true}
        />
        <Header
          visible={true}
          text={'Settings'}
          color={'white'}
          editable={false}
        />
        <ScrollView>
          <View style={styles.container_s}>
            {boxData.map((item, index) => (
              <SettingItem key={index} {...item} />
            ))}
            <TouchableOpacity onPress={handleClick}>
              <View style={styles.boxBackground}>
                <View style={styles.itemContent}>
                  <Image source={require('../../../../assets/icons/profile/setting/mdi_logout.png')} style={styles.icon} />
                  <Text style={styles.text}>Sign out</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container_s: {
    marginTop: 25,
    gap: 20,
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
  },
  icon: {
    width: 32,
    height: 32,
  },
  boxBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    height: 50,
    paddingHorizontal: 15,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  underline: {
    height: 1,
    backgroundColor: '#1E1D2033',
    width: screenWidth,
    marginTop: 5,
  },
});
