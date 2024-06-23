import 'react-native-gesture-handler';

// Import React and Component
import React, { useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import Header from '../../../components/header';
import DeleteModal from '../../../components/deleteModal';

const clock_outline = require('../../../../assets/icons/profile/setting/clock_outline.png');
const vector = require('../../../../assets/icons/profile/setting/vector.png');
const mdi_delete = require('../../../../assets/icons/profile/setting/mdi_delete.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const initialBoxData = [
  {
    title: 'Reminder Name 1',
    time: 'Every 20 minutes',
    day: 'Wednesday, Friday',
  },
  {
    title: 'Reminder Name 2',
    time: 'Every 20 minutes',
    day: 'Everyday',
  },
];

const TimeSupport = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [boxData, setBoxData] = useState(initialBoxData);
  const [reminderToDelete, setReminderToDelete] = useState(null);

  const isFocused = useIsFocused();

  const handlePress = () => {
    navigation.navigate('TimeSettingPage', { addReminder });
  };

  const addReminder = (newReminder) => {
    setBoxData([...boxData, newReminder]);
  };

  const handleDeletePress = (index) => {
    setReminderToDelete(index);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    const newBoxData = boxData.filter((_, index) => index !== reminderToDelete);
    setBoxData(newBoxData);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setReminderToDelete(null);
  };

  return (
    <View style={styles.container}>
      <DeleteModal
        modalVisible={showModal}
        handleClick={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
        text={`Are you sure you want to delete "${boxData[reminderToDelete]?.title}" reminder?`}
      />

      <Header
        visible={true}
        text={'Time Support'}
        color={'white'}
        editMode={editMode}
        setEdit={setEditMode}
      />
      <ScrollView>
        <View style={styles.container_s}>
          {boxData.map((row, rowIndex) => (
            <View key={rowIndex} style={{ width: (screenWidth * 9) / 10 }}>
              <Text style={styles.text}>{row.title}</Text>
              <View style={styles.boxBackground}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Image source={clock_outline} style={styles.iconClock} />
                  <Text style={styles.text}>{row.time}</Text>
                </View>
              </View>
              <View style={styles.boxBackground}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Image source={vector} style={styles.iconCal} />
                  <Text style={styles.text}>{row.day}</Text>
                </View>
              </View>
              <View style={styles.underline} />
              <TouchableOpacity
                onPress={() => handleDeletePress(rowIndex)}
                style={{ position: 'absolute', bottom: 50, right: 0 }}>
                <Image source={mdi_delete} />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.startButton} onPress={handlePress}>
            <Text style={styles.b3_text}>Add New</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TimeSupport;

const styles = StyleSheet.create({
  container_s: {
    marginTop: 25,
    gap: 20,
    marginBottom: 100,
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
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 57,
    marginTop: 20,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
  b3_text: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
  iconCal: {
    justifyContent: 'center',
    width: 18,
    height: 20,
    marginLeft: 2,
  },
  iconClock: {
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  boxBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (screenWidth * 9) / 10,
    height: 50,
  },
  underline: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#1E1D2033',
    width: '92%',
  },
});
