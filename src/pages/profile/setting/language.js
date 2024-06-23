import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Header from '../../../components/header'; // Replace with your actual header component

const language_ico = require('../../../../assets/icons/profile/setting/language_ico.png');
const region_ico = require('../../../../assets/icons/profile/setting/region_ico.png');

const screenWidth = Dimensions.get('window').width;

const languageData = [
  {
    ico: language_ico,
    text: 'Language',
    value: 'English',
    options: ['English', 'Spanish', 'French', 'German'],
  }
];

const regionData = [{
  ico: region_ico,
  text: 'Region',
  value: 'Select',
  options: ['Select', 'USA', 'Canada', 'UK', 'Australia'],
}]

const LanguagePage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedRegion, setSelectedRegion] = useState('Select');
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [currentSelectionType, setCurrentSelectionType] = useState('');

  const handleOpenModal = (options, type) => {
    setDropdownOptions(options);
    setCurrentSelectionType(type);
    setModalVisible(true);
  };

  const handleSelectOption = (option) => {
    if (currentSelectionType === 'Language') {
      setSelectedLanguage(option);
    } else if (currentSelectionType === 'Region') {
      setSelectedRegion(option);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header
        visible={true}
        text={'Language and Country'}
        color={'white'}
        editable={false} 
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container_s}>
          <View style={styles.container_t}>
            <Image source={language_ico} style={styles.icon} />
            <Text style={styles.titleText}>Language</Text>
          </View>
          <Text style={styles.content}>Select language of the app interface</Text>
          {languageData.map((row, index) => (
            <View key={index} style={styles.boxBackground}>
              <TouchableOpacity style={styles.rowContainer} onPress={() => handleOpenModal(row.options, row.text)}>
                <Text style={styles.selectedValue}>
                  {selectedLanguage}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.container_t}>
            <Image source={region_ico} style={styles.icon} />
            <Text style={styles.titleText}>Region</Text>
          </View>
          <Text style={styles.content}>Select your region</Text>
          {regionData.map((row, index) => (
            <View key={index} style={styles.boxBackground}>
              <TouchableOpacity style={styles.rowContainer} onPress={() => handleOpenModal(row.options, row.text)}>
                <Text style={styles.selectedValue}>
                  {selectedRegion}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <ScrollView>
            {dropdownOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleSelectOption(option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  container_t: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_s: {
    marginTop: 25,
    marginBottom: 100,
  },
  scrollViewContent: {
    width: screenWidth,
    flexGrow: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  boxBackground: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F08080',
    borderRadius: 45,
    marginBottom: 20,
    padding: 10,
  },
  rowContainer: {
    width: screenWidth - 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "OpenSans-semibold",
  },
  selectedValue: {
    color: '#333',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    marginTop: 10,
    marginBottom: 16,
    fontSize: 18,
    fontFamily: "OpenSans-regular",
  },
  modalContent: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LanguagePage;
