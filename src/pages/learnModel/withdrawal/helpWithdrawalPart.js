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
  ScrollView,
  SafeAreaView
} from 'react-native';
import {withdrawal_2} from '../../../utils/content';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import {
  reward_ico,
  emotion_ico,
  techniques_ico,
  journal_ico,
  friend_ico,
  run_ico,
  exercise_ico,
  positivity_ico,
  scream_ico,
} from '../../../utils/image';

const task_ico = require('../../../../assets/icons/help_ico.png');
const help_png = require('../../../../assets/icons/learn/withdrawal/help.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const boxData = [
  [
    {
      icon: techniques_ico,
      text: 'Relaxation Techniques',
    },
    {
      icon: exercise_ico,
      text: 'Breathing Exercises',
    },
  ],
  [
    {
      icon: journal_ico,
      text: 'Keep a Journal',
    },
    {
      icon: friend_ico,
      text: 'Make New Friends',
    },
  ],
  [
    {
      icon: positivity_ico,
      text: 'Focus on Positivity',
    },
    {
      icon: emotion_ico,
      text: 'Express Emotions',
    },
  ],
  [
    {
      icon: run_ico,
      text: 'Go for a Run',
    },
    {
      icon: scream_ico,
      text: 'Scream and Shout',
    },
  ],
];

const HelpWithdrawalSection = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [move, setMove] = useState(false);
  const [progress, setProgress] = useState(0.5);
  const [step_1, setStep_1] = useState(false);
  const [step_2, setStep_2] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       setMove(false);
  //       setModalVisible(false);
  //     });

  //     return unsubscribe;
  //   }, [navigation]);

  const handleContinue = () => {
    if (step_1) {
      setStep_1(false);
      setStep_2(true);
      setProgress(1);
      return;
    }
    if (step_2) {
      setStep_2(false);
      setMove(true);
      navigation.navigate('WithdrawalHelpSection', { move: true , setMove : setMove });
      return;
    }
  };
  const handleClick = async () => {
    console.log('-------------clicked--------------------');
    setModalVisible(false);
    setStep_1(true);
    console.log('clicked');
  };

  const handleClickItem = (rowIndex, itemIndex, itemText) => {
    const index = selectedItems.findIndex(
      item => item.row === rowIndex && item.item === itemIndex,
    );

    if (index >= 0) {
      setSelectedItems(selectedItems.filter((_, i) => i !== index));
    } else {
      setSelectedItems([
        ...selectedItems,
        {row: rowIndex, item: itemIndex, text: itemText},
      ]);
    }
  };

  const isSelected = (rowIndex, itemIndex) =>
    selectedItems.some(
      item => item.row === rowIndex && item.item === itemIndex,
    );

  const ItemBlock = ({dash_icon, datas, title, contents, type}) => (
    <>
      <Image source={dash_icon} style={styles.avatar} />

      <Text
        style={[
          styles.Titletext,
          {textAlign: 'center', fontSize: 19, marginTop: 10},
        ]}>
        {title}
      </Text>
      {type ? (
        <ScrollView style={[styles.input]}>
          {contents.map((content, index) => (
            <View key={index}>
              <Text style={[styles.text, , {textAlign: 'left', fontSize: 17}]}>
                • {content}
              </Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView>
          {datas.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  onPress={() =>
                    handleClickItem(rowIndex, itemIndex, item.text)
                  }>
                  <View
                    style={[
                      styles.boxBackground,
                      {
                        borderColor: isSelected(rowIndex, itemIndex)
                          ? '#23B80C'
                          : '#FBC4AB',
                      },
                    ]}>
                    <Image source={item.icon} />
                    <Text style={[styles.text, {fontSize: 17}]}>
                      {item.text}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.SafeAreaView}>
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={task_ico}
        title="Step 2. Help"
        description="Let’s think how we can help in this situation"
      />

      <Header
        visible={true}
        text={'Help'}
        color={'#FFFBF8'}
        goBack={"WithdrawalSection"}
        editalbe={false}
        progress={progress}
      />
      {step_1 && (
        <ItemBlock
          dash_icon={help_png}
          type={true}
          title={'What can Abdul do to cope with this situation?'}
          contents={withdrawal_2}
        />
      )}
      {step_2 && (
        <ItemBlock
          dash_icon={help_png}
          type={false}
          title={'What can Abdul do to cope with this situation?'}
          datas={boxData}
        />
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
          opacity: step_2 && selectedItems.length === 0 ? 0.5 : 1,
        }}
        onPress={() => handleContinue()}
        disabled={step_2 && selectedItems.length === 0}
        >
        <Text style={styles.b3_text}>{step_2 ? "Continue" : "Next"}</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default HelpWithdrawalSection;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor:"#FFFBF8",
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
  Titletext: {
    color: 'black',
    alignItems: 'center',
    padding: 5,
    fontWeight: '600',
    fontFamily: 'OpenSans-Medium',
  },
  text: {
    color: 'black',
    alignItems: 'center',
    padding: 5,
    fontWeight: '400',
    fontFamily: 'OpenSans-Medium',
  },
  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  input: {
    width: (screenWidth * 9) / 10,
    height: 270,
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
