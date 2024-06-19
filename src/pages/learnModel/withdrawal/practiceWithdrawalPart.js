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
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
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
import {withdrawal_3} from '../../../utils/content';
import { SafeAreaView } from 'react-native-safe-area-context';

const task_ico = require('../../../../assets/icons/practice_ico.png');
const avatar_ico = require('../../../../assets/icons/learn/choice/avatar_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const content =
  'Ronald’s mother and father, who have been married for over a decade, have recently decided to split up. Their decision comes after months of ongoing arguments and challenges in their relationship, which have gradually taken a toll on their family dynamics.';

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

const PracticeWithdrawalSection = () => {
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
      return;
    }
  };
  const handleClick = async () => {
    console.log('-------------clicked--------------------');
    setModalVisible(false);
    setStep_1(true);
    console.log('clicked');
  };

  const handleClickMove = async () => {
    console.log('-------------data--------------');
    navigation.navigate('PercentWithdrawalSection');
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
          styles.title,
          {textAlign: 'center', fontSize: 19, marginTop: 10},
        ]}>
        {title}
      </Text>
      {type ? (
        <View style={[styles.input]}>
          {contents.map((content, index) => (
            <Text
              style={[styles.text, , {textAlign: 'left', fontSize: 17}]}
              key={index}>
              {content}
            </Text>
          ))}
        </View>
      ) : (
        <ScrollView style={{marginTop: 100, bottom: 100}}>
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
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={task_ico}
        title="Step 3. Practice"
        description="If you were Abdul,what would you do?"
      />

      <RewardDialog
        modalVisible={move}
        setModalVisible={setMove}
        handleClick={handleClickMove}
        title="Great job!"
        text="You've finished typing level!NN  Claim your reward."
        buttonText="Finish"
        icon={reward_ico}
      />

      <Header
        visible={true}
        text={'Practice'}
        color={'#FFFBF8'}
        goBack={"HelpWithdrawalSection"}
        editalbe={false}
        progress={progress}
      />
      {step_1 && (
        <ItemBlock
          dash_icon={avatar_ico}
          type={true}
          title={'If I were Ronald, I might:'}
          contents={withdrawal_3}
        />
      )}
      {step_2 && (
        <ItemBlock
          dash_icon={avatar_ico}
          type={false}
          title={'If you were Ronald, what would you do?'}
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

export default PracticeWithdrawalSection;

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
    width: 150,
    height: 150,
  },
  title: {
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 28,
    marginTop: 10,
    fontWeight: '700',
    fontFamily: 'OpenSans-Medium',
  },
  text: {
    fontSize: 18,
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    padding: 5,
    fontWeight: '400',
    fontFamily: 'Open Sans',
    lineHeight: 28.8
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
