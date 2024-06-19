import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

// images
const teenagerImage = require('../../../assets/icons/auth/choose_role/teenager.png');
const parentImage = require('../../../assets/icons/auth/choose_role/parent.png');
const keyWorkerImage = require('../../../assets/icons/auth/choose_role/key_worker.png');

const screenHeight = Dimensions.get(`window`).height;

const roles = [
  {role: `Teenager`, image: teenagerImage, navParam: `teenager`},
  {role: `Parent`, image: parentImage, navParam: `parent`},
  {role: `Key Worker`, image: keyWorkerImage, navParam: `keyWorker`},
];

const ChooseRoleScreen = () => {
  const navigation = useNavigation();

  console.log(`screenHeight: ${screenHeight}`);

  return (
    <LinearGradient
      colors={['#F794A4', '#FDD6BD']}
      style={styles.gradientContainer}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Choose your role</Text>
        <View style={styles.roleContainer}>
          {roles.map((role, index) => {
            return (
              <TouchableOpacity
                style={[styles.roleButton]}
                key={index}
                onPress={() => navigation.navigate(`Signup`)}
              >
                <Image style={styles.roleImage} source={role.image} />
                <Text style={styles.roleText}>{role.role}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </LinearGradient>
  );
};

export default ChooseRoleScreen;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    marginTop: 33,
    marginBottom: 52,
  },
  title: {
    fontFamily: `OpenSans-Bold`,
    lineHeight: 35,
    fontSize: 26,
    marginBottom: 24,
    color: '#1E1D20',
  },
  roleContainer: {
    gap: 48,
  },
  roleButton: {
    borderRadius: 10,
    alignItems: 'center',
  },
  roleText: {
    fontSize: 20,
    lineHeight: 27,
    color: '#1E1D20',
    fontFamily: 'OpenSans-SemiBold',
  },
  roleImage: {
    width: (screenHeight - 300) / 3,
    maxWidth: 150,
    height: (screenHeight - 300) / 3,
    maxHeight: 150,
  },
});
