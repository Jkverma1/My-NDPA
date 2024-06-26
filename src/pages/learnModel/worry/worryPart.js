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
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import {worry_1, worry_2} from '../../../utils/content';
import { SafeAreaView } from 'react-native-safe-area-context';

const task_ico = require('../../../../assets/icons/infor.png');
const thumb_icon = require('../../../../assets/icons/great_ico.png');
const dash_icon = require('../../../../assets/icons/learn/worry/worry_1.png');
const das_icon = require('../../../../assets/icons/learn/worry/worry_2.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const WorrySection = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [move, setMove] = useState(false);
  const [comment, setComment] = useState('');
  const [progress, setProgress] = useState(0.5);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMove(false);
      setShowModal(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleContinue = () => {
    if (step) {
      setMove(true);
      navigation.navigate('WorryProcessSection', { move: true, setMove: setMove, part: 1 })
    } else {
      setProgress(1);
      setStep(true);
    }
  };

  const handleClick = async () => {
    setModalVisible(false);
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
        description="Let’s read the information about worry"
      />

      <Header
        visible={true}
        text={'Worry'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />

      {!step ? (
        <>
          <Image source={dash_icon} style={styles.avatar} />
          <View style={[styles.input]}>
            <Text style={[styles.text, , {textAlign: 'left', fontSize: 17}]}>
              {worry_1}
            </Text>
          </View>
        </>
      ) : (
        <>
          <Image source={das_icon} style={styles.avatar} />
          <View style={[styles.input]}>
            <Text style={[styles.text, , {textAlign: 'left', fontSize: 17}]}>
              {worry_2}
            </Text>
          </View>
        </>
      )}

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
        onPress={() => handleContinue(step)}>
        <Text style={styles.b3_text}>Next</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default WorrySection;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFBF8"
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
