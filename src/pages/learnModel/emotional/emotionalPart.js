import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import {emotion_ico} from '../../../utils/image';
import {emotional_1} from '../../../utils/content';

const task_ico = require('../../../../assets/icons/infor.png');
const dash_icon = require('../../../../assets/icons/learn/emotional/emotional.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const EmotionalSection = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [move, setMove] = useState(false);
  const [progress, setProgress] = useState(1);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setMove(false);
  //     setModalVisible(false);
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const handleContinue = () => {
    setMove(true);
  };

  const handleClick = async () => {
    setModalVisible(false);
    navigation.navigate('EmotionalProcessSection', { move: true , part: 1 });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={task_ico}
        title="Step 1. Information"
        description="Let’s read the information about emotional outbursts"
      />

      <Header
        visible={true}
        text={'Emotional Outbursts'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />

      <Image source={dash_icon} style={styles.avatar} />

      <View style={[styles.input]}>
        <Text style={[styles.text, , {textAlign: 'left', fontSize: 17}]}>
          {emotional_1}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          position: 'absolute',
          bottom: 10,
          borderRadius: 45,
          backgroundColor: '#F08080',
        }}
        onPress={() => handleContinue()}>
        <Text style={styles.b3_text}>Next</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default EmotionalSection;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF8',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
    width: screenWidth,
  },
  container_s: {
    padding: 10,
    marginBottom: 100,
  },
  avatar: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: '700',
    fontFamily: 'OpenSans-Medium',
  },
  text: {
    color: 'black',
    alignItems: 'center',
    padding: 5,
    fontWeight: '600',
    fontFamily: 'OpenSans-Medium',
  },
  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  input: {
    width: (screenWidth * 9) / 10,
    margin: 12,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  boxBackground: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 20,
    borderRadius: 20,
    width: (screenWidth * 2.1) / 5,
    height: (screenWidth * 2) / 5,
  },
});
