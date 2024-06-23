import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {saveUserProgress} from '../../utils/saveUserProgress';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import Header from '../../components/header';
import {useNavigation} from '@react-navigation/native';
import {textToSpeech} from '../../redux/slices/audio';
import {useAuth} from '../../contexts/AuthContext';
import {getUserInfo} from '../../utils/getUserInfo';

const t_icon = require('../../../assets/icons/tom_ico.png');
const me_icon = require('../../../assets/icons/me.png');
const turtle_ico = require('../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../assets/icons/charm_sound-up.png');
const message = require('../../../assets/icons/message.png');
const mechat = require('../../../assets/icons/mechat.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ReadingPage = () => {
  const dispatch = useDispatch();
  const {txtAudio} = useSelector(state => state.audio);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [results, setResults] = useState([]);

  const {user} = useAuth();
  const userInfo = getUserInfo(user);

  const conversations = [
    {
      question: 'Hi! My name is Tom.\nWhat is your name?',
      answer: `Hi! My name is ${userInfo.name}.`,
    },
    {
      question: 'Nice to meet you.\nHow old are you?',
      answer: `I'm ${userInfo.age} years old`,
    },
    {
      question: 'I have ADHD.\nWhat about you?',
      answer: `I have ${userInfo.symptom}.`,
    },
    {
      question: "What's your gender\n identity?",
      answer: `I identify as ${userInfo.gender}.`,
    },
  ];

  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [progress, setProgress] = useState(100 / conversations.length);

  useEffect(() => {
    if (results.length === conversations.length) {
      saveUserProgress(`Personal_Identity`, 'Reading', results);
      navigation.navigate('ExitCafe');
    }
  }, [results]);

  const handleChangeOfCurrentConversationIndex = async () => {
    const lastIndex = conversations.length - 1;

    const updatedResults = [
      ...results,
      {
        question: conversations[currentConversationIndex].question,
        answer: conversations[currentConversationIndex].answer,
        isCorrect: true,
      },
    ];
    setResults(updatedResults);

    if (currentConversationIndex === lastIndex) {
      console.log(`handleChangeOfCurrentConversationIndex: `, updatedResults);
    } else {
      setProgress(progress + 100 / conversations.length);
      setCurrentConversationIndex(currentConversationIndex + 1);
    }
  };

  const handleClickSound = async txt => {
    try {
      await dispatch(textToSpeech(txt));
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      playAudio(txtAudio);
    }
  }, [isLoading, playAudio, txtAudio]);

  const playAudio = async audioBase64 => {
    const audioPath = `${RNFS.TemporaryDirectoryPath}tempaudio.mp3`;

    const base64String = audioBase64.replace('data:audio/mp3;base64,', '');

    await RNFS.writeFile(audioPath, base64String, 'base64')
      .then(() => {
        console.log('File written');
      })
      .catch(error => {
        console.error('Error writing file', error);
      });

    const sound = new Sound(audioPath, '', error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      sound.play(success => {
        if (success) {
          console.log('Successfully finished playing');
          setIsLoading(false);
        } else {
          console.log('Playback failed due to audio decoding errors');
          setIsLoading(false);
        }
      });
    });
  };

  const MessageBlock = ({children}) => (
    <>
      <View style={styles.imageContainer}>
        <Image source={message} />
        <Text style={styles.title}>{children}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 9,
          position: 'absolute',
          top: 205,
          right: screenWidth / 20,
        }}
      >
        <TouchableOpacity onPress={() => handleClickSound(children)}>
          <Image source={sound_ico} />
        </TouchableOpacity>
        <Image source={turtle_ico} />
      </View>
    </>
  );

  const ProgressBar = () => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
        <Text>{progress}%</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        visible={true}
        text={'Introducing yourself'}
        color={'#FFFBF8'}
        editalbe={false}
      />

      <ProgressBar />

      <Image
        source={t_icon}
        style={{position: 'absolute', left: screenWidth / 20, top: 130}}
      />
      <Image
        source={me_icon}
        style={{position: 'absolute', right: screenWidth / 20, top: 330}}
      />

      <MessageBlock
        children={conversations[currentConversationIndex].question}
      />

      <View style={styles.me_imageContainer}>
        <Image source={mechat} style={{width: 240}} />

        <>
          <Text style={styles.m_title}>
            {conversations[currentConversationIndex].answer}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 9,
              position: 'absolute',
              top: 54,
              left: 0,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                handleClickSound(conversations[currentConversationIndex].answer)
              }
            >
              <Image source={sound_ico} />
            </TouchableOpacity>
            <Image source={turtle_ico} />
          </View>
        </>
      </View>

      <TouchableOpacity
        style={styles.continueContainer}
        onPress={() => handleChangeOfCurrentConversationIndex()}
      >
        <Text style={styles.continueButton}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReadingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
    width: screenWidth,
    position: 'relative',
  },
  overlay: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    height: 40,
    width: (screenWidth * 9) / 10,
    marginTop: -40,
    padding: 1,
    paddingLeft: 30,
    borderRadius: 40,
    fontFamily: 'OpenSans-Regular',
  },
  select: {
    borderWidth: 1,
    borderColor: '#F08080',
    height: 46,
    width: (screenWidth * 9) / 10,
    // marginTop: 5,
    borderRadius: 40,
    fontFamily: 'OpenSans-Regular',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -75,
    left: 10,
    // textAlign: 'left',
  },
  m_title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -48,
    right: 10,
    // textAlign: 'left',
  },
  text_m: {
    color: '#F08080',
    fontSize: 21,
    fontFamily: 'OpenSans-bold',
    textAlign: 'center',
    marginTop: 3,
    // alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    // textAlign: 'left',
  },
  imageContainer: {
    position: 'absolute',
    right: screenWidth / 20,
    top: 130,
    alignItems: 'center',
  },
  me_imageContainer: {
    position: 'absolute',
    left: screenWidth / 20,
    top: 320,
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center',
    width: 72,
    height: 72,
  },

  chatBackground: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 59,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: 135,
    bottom: 0,
    position: 'absolute',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 15,
  },

  selectBackground: {
    gap: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: (screenHeight * 1.25) / 3,
    bottom: 0,
    position: 'absolute',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 15,
  },

  ///// shibayon
  continueButton: {
    backgroundColor: '#F08080',
    fontSize: 21,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 28,
    paddingVertical: 12,
    color: '#FFFFFF',
    borderRadius: 80,
    width: '90%',
    textAlign: 'center',
    position: 'absolute',
  },
  continueContainer: {
    backgroundColor: '#777777',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
  },

  ///// progressBar container
  progressBarContainer: {
    width: '85%',
    height: 8,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F08080',
    borderRadius: 10,
  },
});
