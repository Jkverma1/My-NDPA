// src/pages/CalculateMoney.js
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import tutorialData from './TutorialData';
import deleteIcon from '../../../assets/icons/mdi_delete-outline.png';
import tennis from '../../../assets/icons/prompts/tennis.png';
import bowling from '../../../assets/icons/prompts/bowling.png';
import cinema from '../../../assets/icons/prompts/cinema.png';
import swimming from '../../../assets/icons/prompts/swimming.png';

const options = [
  {id: '1', name: 'Tennis', price: 20, image: tennis},
  {id: '2', name: 'Bowling', price: 20, image: bowling},
  {id: '3', name: 'Cinema', price: 20, image: cinema},
  {id: '4', name: 'Swimming', price: 20, image: swimming},
];

const PaginationDots = ({totalScreens, currentScreen, navigateToScreen}) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({length: totalScreens}, (_, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.dot, index + 1 === currentScreen && styles.activeDot]}
          onPress={() => navigateToScreen(index + 1)}
        />
      ))}
    </View>
  );
};

const CalculateMoney = ({route, navigation}) => {
  const {screenNumber} = route.params;
  const tutorial = tutorialData[screenNumber - 1];
  const totalScreens = tutorialData.length;
  const isLastScreen = screenNumber === totalScreens;

  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const addItem = item => {
    if (!selectedItems.some(selectedItem => selectedItem.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeItem = itemId => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const totalMoney = selectedItems.reduce(
    (total, item) => total + item.price,
    0,
  );

  const goToPreviousScreen = () => {
    navigation.navigate(`Tutorial${screenNumber - 1}`);
  };

  const goToNextScreen = () => {
    if (isLastScreen) {
      navigation.navigate('Tutorial12');
    } else {
      navigation.navigate(`Tutorial${screenNumber + 1}`);
    }
  };

  const goToMainScreen = () => {
    navigation.navigate('Main');
  };

  const navigateToScreen = screen => {
    navigation.navigate(`Tutorial${screen}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={tutorial.image} style={styles.image} />
        <Text style={styles.title}>{tutorial.title}</Text>

        <FlatList
          data={options.filter(option =>
            option.name.toLowerCase().includes(search.toLowerCase()),
          )}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => addItem(item)}
            >
              <Image source={item.image} style={styles.optionImage} />
              <Text style={styles.optionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={true}
          style={styles.optionsList}
        />

        <FlatList
          data={selectedItems}
          renderItem={({item}) => (
            <View style={styles.selectedItem}>
              <Text style={styles.selectedItemText}>{item.name}</Text>
              <Text style={styles.selectedItemPrice}>${item.price}</Text>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Image source={deleteIcon} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
          style={styles.selectedList}
        />

        <Text style={styles.totalText}>Total: ${totalMoney}</Text>

        <PaginationDots
          totalScreens={totalScreens}
          currentScreen={screenNumber}
          navigateToScreen={navigateToScreen}
        />

        <View style={styles.buttonContainer}>
          {screenNumber > 1 && (
            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              onPress={goToPreviousScreen}
            >
              <Text style={[styles.buttonText, styles.backButtonText]}>
                Prev
              </Text>
            </TouchableOpacity>
          )}
          {!isLastScreen ? (
            <TouchableOpacity style={styles.button} onPress={goToNextScreen}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={goToMainScreen}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '30%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  searchContainer: {
    width: '100%',
    marginBottom: 10,
  },
  searchInputContainer: {
    backgroundColor: 'white',
  },
  optionsList: {
    width: '100%',
  },
  optionItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 100.59,
    height: 100,
    padding: 7.06,
    gap: 9.41,
    borderRadius: 8.82,
    borderWidth: 0.59,
    borderColor: '#FBC4AB',
    margin: 5,
  },
  optionImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 16,
  },
  selectedList: {
    width: '100%',
    marginTop: 20,
  },
  selectedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItemText: {
    fontSize: 16,
  },
  selectedItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F0808066',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#F08080',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    width: 110,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#F08080',
    backgroundColor: '#F08080',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  backButtonText: {
    color: '#F08080',
  },
});

export default CalculateMoney;
