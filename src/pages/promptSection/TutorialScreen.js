// src/pages/TutorialScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import tutorialData from './TutorialData';

const PaginationDots = ({ totalScreens, currentScreen, navigateToScreen }) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: totalScreens }, (_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dot,
            index + 1 === currentScreen && styles.activeDot,
          ]}
          onPress={() => navigateToScreen(index + 1)}
        />
      ))}
    </View>
  );
};

const TutorialScreen = ({ route, navigation }) => {
  const { screenNumber } = route.params;
  const tutorial = tutorialData[screenNumber - 1];
  const totalScreens = tutorialData.length;
  const isLastScreen = screenNumber === totalScreens;

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

  const navigateToScreen = (screen) => {
    navigation.navigate(`Tutorial${screen}`);
  };

  return (
    <View style={styles.container}>
      <Image source={tutorial.image} style={styles.image} />
      <Text style={styles.title}>{tutorial.title}</Text>
      <Text style={styles.description}>{tutorial.description}</Text>

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
            <Text style={[styles.buttonText, styles.backButtonText]}>Prev</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
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
    backgroundColor: '#ccc',
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

export default TutorialScreen;
