import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import { countries } from './countries'; // Assuming you have a list of countries in a separate file

const screenHeight = Dimensions.get('window').height;

const CountryPickerModal = ({ visible, onClose }) => {
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleSearch = text => {
    setSearch(text);
    const filtered = countries.filter(country =>
      country.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCountries(filtered);
  };

  const handleCountryPress = country => {
    onClose(country);
  };

  const handleDismiss = () => {
    onClose('United States');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Country</Text>
            <TouchableOpacity onPress={handleDismiss}>
              <Image
                style={styles.closeIcon}
                source={require('../../../assets/icons/close_ico.png')}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={search}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredCountries}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => handleCountryPress(item)}
              >
                <Text style={styles.countryText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.bottomHandleContainer}>
            <View style={styles.bottomHandle} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: screenHeight * 0.7,
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  handleContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  bottomHandleContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  handle: {
    width: 100,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },
  bottomHandle: {
    width: 100,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1D20',
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    height: 42,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 45,
    marginBottom: 20,
    paddingLeft: 16,
  },
  countryItem: {
    padding: 12,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  countryText: {
    fontSize: 16,
  },
});

export default CountryPickerModal;
